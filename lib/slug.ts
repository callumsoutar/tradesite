import { randomBytes } from "node:crypto";

export function previewSlug(businessName: string) {
  const base = businessName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  const suffix = randomBytes(3).toString("hex");
  return `${base || "draft"}-${suffix}`;
}
