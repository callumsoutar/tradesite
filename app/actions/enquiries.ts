"use server";

import { randomUUID } from "node:crypto";

import { sendEnquiryEmails } from "@/lib/emails";
import { recentEnquiryCount } from "@/lib/enquiries/queries";
import { createServiceClient } from "@/lib/supabase/service";
import { parseEnquiryInput, type FieldErrors } from "@/lib/validators/enquiry";

const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export type EnquiryActionResult = {
  ok: boolean;
  message?: string;
  fieldErrors?: FieldErrors;
};

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function extension(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

export async function submitEnquiry(formData: FormData): Promise<EnquiryActionResult> {
  if (text(formData, "company_fax").trim() !== "") {
    return { ok: true, message: "Thanks. We have your request and will email you a draft link." };
  }

  const parsed = parseEnquiryInput({
    name: text(formData, "name"),
    businessName: text(formData, "businessName"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    trade: text(formData, "trade"),
    location: text(formData, "location"),
    existingWebsite: text(formData, "existingWebsite"),
    description: text(formData, "description"),
    services: text(formData, "services"),
    preferredColours: text(formData, "preferredColours"),
    additionalInformation: text(formData, "additionalInformation"),
  });

  if (!parsed.data) return { ok: false, fieldErrors: parsed.fieldErrors };

  const logo = formData.get("logo");
  const photos = formData.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (logo instanceof File && logo.size > 0) {
    if (!imageTypes.has(logo.type) || logo.size > 2 * 1024 * 1024) {
      return {
        ok: false,
        fieldErrors: { ...parsed.fieldErrors },
        message: "The logo must be a JPG, PNG, or WebP under 2 MB.",
      };
    }
  }

  if (photos.length > 6) {
    return { ok: false, message: "You can attach up to 6 photos." };
  }

  for (const photo of photos) {
    if (!imageTypes.has(photo.type) || photo.size > 5 * 1024 * 1024) {
      return { ok: false, message: "Each photo must be a JPG, PNG, or WebP under 5 MB." };
    }
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return {
      ok: false,
      message: "The enquiry form is not connected to storage yet. Please email us and we will take the brief directly.",
    };
  }

  const recent = await recentEnquiryCount(parsed.data.email);
  if (recent >= 3) {
    return {
      ok: false,
      message: "We already have a few recent requests from this email. We will be in touch shortly.",
    };
  }

  const { data: inserted, error } = await supabase
    .from("enquiries")
    .insert({
      name: parsed.data.name,
      business_name: parsed.data.businessName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      trade: parsed.data.trade,
      location: parsed.data.location,
      existing_website: parsed.data.existingWebsite || null,
      description: parsed.data.description,
      services: parsed.data.services,
      preferred_colours: parsed.data.preferredColours || null,
      additional_information: parsed.data.additionalInformation || null,
    })
    .select("id")
    .single();

  if (error || !inserted) {
    return { ok: false, message: "We could not save your request. Please try again." };
  }

  const uploads: { kind: "logo" | "photo"; file: File }[] = [];
  if (logo instanceof File && logo.size > 0) uploads.push({ kind: "logo", file: logo });
  photos.forEach((file) => uploads.push({ kind: "photo", file }));

  for (const upload of uploads) {
    const path = `${inserted.id}/${upload.kind}/${randomUUID()}.${extension(upload.file.type)}`;
    const buffer = Buffer.from(await upload.file.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("enquiry-assets")
      .upload(path, buffer, { contentType: upload.file.type, upsert: false });

    if (uploadError) continue;

    await supabase.from("enquiry_assets").insert({
      enquiry_id: inserted.id,
      storage_path: path,
      kind: upload.kind,
    });
  }

  await sendEnquiryEmails(parsed.data).catch(() => undefined);

  return {
    ok: true,
    message: "Thanks. We have your request and will email you a draft link.",
  };
}
