import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { Container } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPostDate, getPosts } from "@/lib/blog";
import { organizationId, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Guides for tradie websites",
  description:
    "Practical guides on tradie website costs, what to include, and whether a New Zealand trade business needs a site.",
  path: "/blog",
  feed: true,
});

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Guides for tradie websites",
          description: "Practical guides for New Zealand trade businesses deciding on a website.",
          url: absoluteUrl("/blog"),
          inLanguage: "en-NZ",
          publisher: { "@id": organizationId() },
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated,
            url: absoluteUrl(`/blog/${post.slug}`),
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/blog") },
          ],
        }}
      />
      <PageHero
        crumbs={[{ label: "Guides" }]}
        eyebrow="Guides"
        title="Straight answers about tradie websites."
        description="Costs, what to put on the site, and how a website fits next to the other ways customers find a trade business."
      />
      <section className="py-16 sm:py-24">
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">Guides are on the way.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-colors hover:border-foreground/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <time dateTime={post.date} className="font-mono text-xs uppercase tracking-[0.14em] text-brand">
                      {formatPostDate(post.date)}
                    </time>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <div className="mt-16">
                    <h2 className="text-2xl font-semibold tracking-tight text-balance">{post.title}</h2>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{post.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
      <CtaBand placement="blog-index" />
    </>
  );
}
