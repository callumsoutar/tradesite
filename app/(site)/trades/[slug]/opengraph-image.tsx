import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getTradePage } from "@/lib/trades";

type Props = { params: Promise<{ slug: string }> };

export const alt = "Website design for a New Zealand trade";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const trade = getTradePage(slug);
  return ogImage(trade?.h1 ?? "Websites for tradies", "New Zealand");
}
