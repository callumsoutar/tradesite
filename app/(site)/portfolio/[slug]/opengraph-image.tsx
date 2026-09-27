import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getPortfolioExample } from "@/lib/portfolio";

type Props = { params: Promise<{ slug: string }> };

export async function generateImageMetadata({ params }: Props) {
  const { slug } = await params;
  const example = getPortfolioExample(slug);

  return [
    {
      id: slug,
      alt: example?.title ?? "Website example",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const example = getPortfolioExample(slug);
  return ogImage(example?.title ?? "Tradie website example", "Concept");
}
