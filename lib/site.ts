function isAbsoluteHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function hostUrl(host: string | undefined) {
  const value = host?.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  return value ? `https://${value}` : undefined;
}

/** Canonical origin. A blank NEXT_PUBLIC_SITE_URL must not reach `new URL()`. */
function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (isAbsoluteHttpUrl(configured)) return configured.replace(/\/$/, "");

  return (
    hostUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    hostUrl(process.env.VERCEL_URL) ??
    "http://localhost:3000"
  );
}

export const site = {
  name: "TradeSite",
  description:
    "Free, personalised website drafts for New Zealand trade businesses, delivered within 24 hours.",
  url: resolveSiteUrl(),
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
