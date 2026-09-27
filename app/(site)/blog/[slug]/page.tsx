import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBand } from "@/components/marketing/cta-band";
import { FaqList } from "@/components/marketing/faq-list";
import { MdxContent } from "@/components/marketing/mdx-content";
import { Container } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPostDate, getPost, getPosts, relatedPosts } from "@/lib/blog";
import { organizationId, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    feed: true,
    published: post.date,
    modified: post.updated,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug);
  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated,
          inLanguage: "en-NZ",
          image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@id": organizationId() },
          mainEntityOfPage: url,
          url,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/blog") },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }}
      />
      {post.faqs.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
      ) : null}
      <article className="pt-28 pb-16 sm:pt-32 sm:pb-24">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ href: "/blog", label: "Guides" }, { label: post.title }]} />
          <p className="mt-12 font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand">Guide</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-pretty text-muted-foreground">{post.description}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.updated && post.updated !== post.date ? (
              <>
                {" "}
                · Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
              </>
            ) : null}
          </p>
          <div className="mt-12 border-t border-border pt-4 text-[17px] leading-[1.75] text-foreground/85">
            <MdxContent source={post.content} />
          </div>
          {post.faqs.length > 0 ? (
            <div className="mt-16 border-t border-border pt-12">
              <h2 className="text-2xl font-semibold tracking-tight">Common questions</h2>
              <div className="mt-6">
                <FaqList items={post.faqs} />
              </div>
            </div>
          ) : null}
        </Container>
      </article>
      {related.length > 0 ? (
        <section className="border-t border-border py-16 sm:py-20">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight">More guides</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/30"
                >
                  <time dateTime={item.date} className="font-mono text-xs uppercase tracking-[0.14em] text-brand">
                    {formatPostDate(item.date)}
                  </time>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-balance">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      <CtaBand placement={`blog-${post.slug}`} />
    </>
  );
}
