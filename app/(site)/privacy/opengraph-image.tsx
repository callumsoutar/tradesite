import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "TradeSite privacy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("How draft requests are handled", "Privacy");
}
