import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Concept website designs for New Zealand tradies";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Concept designs for trade websites", "Work");
}
