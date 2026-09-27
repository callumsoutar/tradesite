import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getPortfolioExample } from "@/lib/portfolio";

type Props = { params: Promise<{ slug: string }> };

export const alt = "Concept website design for a New Zealand trade business";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const example = getPortfolioExample(slug);
  return ogImage(example?.title ?? "Tradie website example", "Concept");
}
