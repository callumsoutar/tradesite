import { getPost } from "@/lib/blog";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

type Props = { params: Promise<{ slug: string }> };

export const alt = "Guide for tradie websites in New Zealand";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage(post?.title ?? "Guides for tradie websites", "Guide");
}
