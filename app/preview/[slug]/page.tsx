import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TradiePreview } from "@/components/preview/tradie-preview";
import { getEnquiryBySlug } from "@/lib/enquiries/queries";
import { privateMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = privateMetadata;

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const result = await getEnquiryBySlug(slug);
  if (!result) notFound();

  return <TradiePreview enquiry={result.enquiry} assets={result.assets} />;
}
