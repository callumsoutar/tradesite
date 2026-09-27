import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Websites for tradies in New Zealand";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Websites for tradies in New Zealand", "For trade businesses");
}
