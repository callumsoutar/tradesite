import { getPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET() {
  const posts = getPosts();
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const published = new Date(`${post.date}T12:00:00+12:00`).toUTCString();
      return `<item>
        <title>${escapeXml(post.title)}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${published}</pubDate>
        <description>${escapeXml(post.description)}</description>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${site.name} guides`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml("Practical guides about websites for New Zealand trade businesses.")}</description>
    <language>en-NZ</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
