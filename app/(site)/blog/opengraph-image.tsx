import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Guides for tradie websites in New Zealand";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Straight answers about tradie websites", "Guides");
}
