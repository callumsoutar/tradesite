export const site = {
  name: "TradeSite",
  description:
    "Free, personalised website drafts for New Zealand trade businesses, delivered within 24 hours.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.ENQUIRY_NOTIFICATION_EMAIL ?? "hello@example.com",
  locale: "en_NZ",
} as const;

export function absoluteUrl(path: string) {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Contact address safe to publish. Placeholder inboxes stay out of public markup. */
export function publicEmail() {
  const email = site.email.trim();
  if (!email || email.endsWith("@example.com") || email.endsWith("@example.co.nz")) return undefined;
  return email;
}
