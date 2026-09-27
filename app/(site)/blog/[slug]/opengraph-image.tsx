import { getPost } from "@/lib/blog";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

type Props = { params: Promise<{ slug: string }> };

export async function generateImageMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  return [
    {
      id: slug,
      alt: post?.title ?? "Guide",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage(post?.title ?? "Guides for tradie websites", "Guide");
}
