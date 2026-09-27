import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/blog";
import { portfolioExamples } from "@/lib/portfolio";
import { absoluteUrl } from "@/lib/site";
import { tradePages } from "@/lib/trades";

const priorityByPath: Record<string, number> = {
  "/": 1,
  "/websites-for-tradies": 0.9,
  "/pricing": 0.9,
  "/get-a-draft": 0.9,
  "/blog": 0.8,
  "/how-it-works": 0.7,
  "/portfolio": 0.6,
  "/privacy": 0.2,
};

function entry(path: string, lastModified?: Date): MetadataRoute.Sitemap[number] {
  const priority = path.startsWith("/trades/")
    ? 0.8
    : path.startsWith("/blog/")
      ? 0.7
      : path.startsWith("/portfolio/")
        ? 0.5
        : (priorityByPath[path] ?? 0.6);

  const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
    path === "/" ? "weekly" : path === "/privacy" ? "yearly" : "monthly";

  return {
    url: absoluteUrl(path),
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified } : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  return [
    ...["/", "/pricing", "/how-it-works", "/portfolio", "/websites-for-tradies", "/get-a-draft", "/blog", "/privacy"].map(
      (path) => entry(path),
    ),
    ...portfolioExamples.map((example) => entry(`/portfolio/${example.slug}`)),
    ...tradePages.map((trade) => entry(`/trades/${trade.slug}`)),
    ...posts.map((post) => entry(`/blog/${post.slug}`, new Date(`${post.updated || post.date}T12:00:00+12:00`))),
  ];
}
