import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getTradePage } from "@/lib/trades";

type Props = { params: Promise<{ slug: string }> };

export async function generateImageMetadata({ params }: Props) {
  const { slug } = await params;
  const trade = getTradePage(slug);

  return [
    {
      id: slug,
      alt: trade?.title ?? "Tradie website design",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const trade = getTradePage(slug);
  return ogImage(trade?.h1 ?? "Websites for tradies", "New Zealand");
}
