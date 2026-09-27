import "server-only";

import { createServiceClient } from "@/lib/supabase/service";
import type { EnquiryAsset, EnquiryRow } from "@/lib/enquiries/types";

export async function listEnquiries() {
  const supabase = createServiceClient();
  if (!supabase) return { configured: false as const, enquiries: [] };

  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return { configured: true as const, enquiries: (data ?? []) as EnquiryRow[] };
}

export async function getEnquiry(id: string) {
  const supabase = createServiceClient();
  if (!supabase) return { configured: false as const, enquiry: null, assets: [] };

  const { data, error } = await supabase.from("enquiries").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return { configured: true as const, enquiry: null, assets: [] };

  const assetsResult = await supabase
    .from("enquiry_assets")
    .select("*")
    .eq("enquiry_id", id)
    .order("created_at", { ascending: true });

  if (assetsResult.error) throw new Error(assetsResult.error.message);

  return {
    configured: true as const,
    enquiry: data as EnquiryRow,
    assets: (assetsResult.data ?? []) as EnquiryAsset[],
  };
}

export async function getEnquiryBySlug(slug: string) {
  const supabase = createServiceClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .eq("preview_slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  const enquiry = data as EnquiryRow;
  const assetsResult = await supabase
    .from("enquiry_assets")
    .select("*")
    .eq("enquiry_id", enquiry.id);

  if (assetsResult.error) throw new Error(assetsResult.error.message);
  const assets = (assetsResult.data ?? []) as EnquiryAsset[];

  const signed = await Promise.all(
    assets.map(async (asset) => {
      const { data: file } = await supabase.storage
        .from("enquiry-assets")
        .createSignedUrl(asset.storage_path, 60 * 60);
      return { ...asset, url: file?.signedUrl ?? null };
    }),
  );

  return { enquiry, assets: signed };
}

export async function recentEnquiryCount(email: string) {
  const supabase = createServiceClient();
  if (!supabase) return 0;
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", since);

  if (error) throw new Error(error.message);
  return count ?? 0;
}
