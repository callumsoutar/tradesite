import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "How a free tradie website draft works";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("See the website before you pay", "How it works");
}
