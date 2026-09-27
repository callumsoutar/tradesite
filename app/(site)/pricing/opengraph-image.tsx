import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Tradie website pricing in New Zealand";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Published prices for tradie websites", "Pricing");
}
