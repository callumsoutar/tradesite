import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "TradeSite, website design for New Zealand tradies";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Website design for New Zealand tradies");
}
