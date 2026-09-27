import "server-only";

import { Resend } from "resend";

import { absoluteUrl, site } from "@/lib/site";
import type { EnquiryInput } from "@/lib/validators/enquiry";
import { tradeLabel } from "@/lib/trades";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function fromAddress() {
  return process.env.RESEND_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`;
}

async function send(to: string, subject: string, text: string, html: string) {
  const resend = client();
  if (!resend) return { sent: false as const, reason: "Resend is not configured." };

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to,
    subject,
    text,
    html,
  });

  if (error) return { sent: false as const, reason: error.message };
  return { sent: true as const };
}

export async function sendEnquiryEmails(input: EnquiryInput) {
  const notify = process.env.ENQUIRY_NOTIFICATION_EMAIL;
  const results = [];

  if (notify) {
    const text = [
      `New website draft request for ${input.businessName}.`,
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      `Trade: ${tradeLabel(input.trade)}`,
      `Location: ${input.location}`,
      `Existing website: ${input.existingWebsite || "None"}`,
      "",
      input.description,
      "",
      `Services: ${input.services}`,
    ].join("\n");

    results.push(
      await send(
        notify,
        `New draft request: ${input.businessName}`,
        text,
        `<p>New website draft request for <strong>${escapeHtml(input.businessName)}</strong>.</p>
         <p>${escapeHtml(input.name)} · ${escapeHtml(input.email)} · ${escapeHtml(input.phone)}</p>
         <p>${escapeHtml(tradeLabel(input.trade))} in ${escapeHtml(input.location)}</p>
         <p><a href="${escapeHtml(absoluteUrl("/admin/enquiries"))}">Open the enquiry list</a></p>`,
      ),
    );
  }

  const customerText = [
    `Thanks ${input.name}, we have your request for ${input.businessName}.`,
    "",
    "We will prepare a free website draft and email you a private link. The aim is within 24 hours.",
    "There is nothing to pay unless you decide to go ahead with the finished website.",
    "",
    site.name,
  ].join("\n");

  results.push(
    await send(
      input.email,
      `We have your website draft request`,
      customerText,
      `<p>Thanks ${escapeHtml(input.name)}, we have your request for ${escapeHtml(input.businessName)}.</p>
       <p>We will prepare a free website draft and email you a private link. The aim is within 24 hours.</p>
       <p>There is nothing to pay unless you decide to go ahead with the finished website.</p>
       <p>${escapeHtml(site.name)}</p>`,
    ),
  );

  return results;
}

export async function sendDraftReadyEmail(input: {
  name: string;
  email: string;
  businessName: string;
  slug: string;
}) {
  const link = absoluteUrl(`/preview/${input.slug}`);
  const text = [
    `Hi ${input.name}, your website draft for ${input.businessName} is ready.`,
    "",
    link,
    "",
    "This is a private preview. If you want to proceed, reply to this email. If not, there is nothing to pay.",
    "",
    site.name,
  ].join("\n");

  return send(
    input.email,
    `Your website draft is ready`,
    text,
    `<p>Hi ${escapeHtml(input.name)}, your website draft for ${escapeHtml(input.businessName)} is ready.</p>
     <p><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p>
     <p>This is a private preview. If you want to proceed, reply to this email. If not, there is nothing to pay.</p>
     <p>${escapeHtml(site.name)}</p>`,
  );
}

export async function sendFollowUpEmail(input: {
  name: string;
  email: string;
  businessName: string;
  slug: string;
}) {
  const link = absoluteUrl(`/preview/${input.slug}`);
  const text = [
    `Hi ${input.name}, a quick note about the website draft for ${input.businessName}.`,
    "",
    `The preview is still here: ${link}`,
    "",
    "Reply if you want changes, or if you would like to go ahead. If you would rather not continue, you can ignore this email.",
    "",
    site.name,
  ].join("\n");

  return send(
    input.email,
    `Your website draft for ${input.businessName}`,
    text,
    `<p>Hi ${escapeHtml(input.name)}, a quick note about the website draft for ${escapeHtml(input.businessName)}.</p>
     <p>The preview is still here: <a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p>
     <p>Reply if you want changes, or if you would like to go ahead. If you would rather not continue, you can ignore this email.</p>
     <p>${escapeHtml(site.name)}</p>`,
  );
}
