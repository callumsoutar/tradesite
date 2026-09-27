import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Get a free website draft for your trade business";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Get a free website draft in 24 hours", "Free draft");
}
