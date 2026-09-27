"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { sendDraftReadyEmail, sendFollowUpEmail } from "@/lib/emails";
import { isEnquiryStatus, type PreviewContent } from "@/lib/enquiries/types";
import { previewSlug } from "@/lib/slug";
import { createServiceClient } from "@/lib/supabase/service";
import { tradeLabel } from "@/lib/trades";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function previewFromForm(formData: FormData): PreviewContent {
  return {
    businessName: text(formData, "businessName"),
    headline: text(formData, "headline"),
    about: text(formData, "about"),
    services: text(formData, "services")
      .split("\n")
      .map((service) => service.trim())
      .filter(Boolean),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    serviceArea: text(formData, "serviceArea"),
    colour: text(formData, "colour"),
    location: text(formData, "location"),
    tradeLabel: text(formData, "tradeLabel"),
  };
}

async function persist(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceClient();
  const id = text(formData, "id");
  if (!supabase || !id) redirect("/admin/enquiries?error=config");

  const statusValue = text(formData, "status");
  const status = isEnquiryStatus(statusValue) ? statusValue : "new";
  const purchased = formData.get("purchased") === "yes" || status === "converted";
  const preview = previewFromForm(formData);

  const { data: existing, error: readError } = await supabase
    .from("enquiries")
    .select("preview_slug, trade")
    .eq("id", id)
    .single();

  if (readError || !existing) redirect("/admin/enquiries");

  const slug = existing.preview_slug || previewSlug(preview.businessName || "draft");
  if (!preview.tradeLabel) preview.tradeLabel = tradeLabel(existing.trade);

  const { error } = await supabase
    .from("enquiries")
    .update({
      status: purchased ? "converted" : status,
      internal_notes: text(formData, "internalNotes"),
      purchased,
      preview_slug: slug,
      preview_content: preview,
      template: "standard",
    })
    .eq("id", id);

  if (error) redirect(`/admin/enquiries/${id}?error=save`);

  const { data: enquiry, error: reloadError } = await supabase
    .from("enquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (reloadError || !enquiry) redirect(`/admin/enquiries/${id}?error=save`);

  return { supabase, enquiry, slug, preview };
}

export async function saveEnquiry(formData: FormData) {
  const { enquiry } = await persist(formData);
  redirect(`/admin/enquiries/${enquiry.id}?saved=1`);
}

export async function sendDraft(formData: FormData) {
  const { supabase, enquiry, slug } = await persist(formData);
  const result = await sendDraftReadyEmail({
    name: enquiry.name,
    email: enquiry.email,
    businessName: enquiry.business_name,
    slug,
  });

  if (!result.sent) redirect(`/admin/enquiries/${enquiry.id}?error=email`);

  await supabase
    .from("enquiries")
    .update({ status: "sent", draft_sent_at: new Date().toISOString() })
    .eq("id", enquiry.id);

  redirect(`/admin/enquiries/${enquiry.id}?sent=1`);
}

export async function sendFollowUp(formData: FormData) {
  const { supabase, enquiry, slug } = await persist(formData);

  if (enquiry.follow_up_sent_at) {
    redirect(`/admin/enquiries/${enquiry.id}?error=followup`);
  }

  const result = await sendFollowUpEmail({
    name: enquiry.name,
    email: enquiry.email,
    businessName: enquiry.business_name,
    slug,
  });

  if (!result.sent) redirect(`/admin/enquiries/${enquiry.id}?error=email`);

  await supabase
    .from("enquiries")
    .update({ follow_up_sent_at: new Date().toISOString() })
    .eq("id", enquiry.id);

  redirect(`/admin/enquiries/${enquiry.id}?followup=1`);
}

export async function signOut() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
