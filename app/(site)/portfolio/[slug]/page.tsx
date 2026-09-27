import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { CtaBand } from "@/components/marketing/cta-band";
import { DeviceShowcase } from "@/components/marketing/device-mockup";
import { conceptUrl, miniSiteThemes } from "@/components/marketing/mini-site";
import { PageHero } from "@/components/marketing/page-hero";
import { Container, TextLink } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { getPortfolioExample, portfolioExamples } from "@/lib/portfolio";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolioExamples.map((example) => ({ slug: example.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const example = getPortfolioExample(slug);
  if (!example) return {};
  return pageMetadata({
    title: example.title,
    description: example.description,
    path: `/portfolio/${example.slug}`,
  });
}

export default async function PortfolioExamplePage({ params }: Props) {
  const { slug } = await params;
  const example = getPortfolioExample(slug);
  if (!example) notFound();
  const theme = miniSiteThemes[example.slug];
  const others = portfolioExamples.filter((item) => item.slug !== example.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/portfolio") },
            {
              "@type": "ListItem",
              position: 3,
              name: example.trade,
              item: absoluteUrl(`/portfolio/${example.slug}`),
            },
          ],
        }}
      />
      <PageHero
        crumbs={[{ href: "/portfolio", label: "Work" }, { label: example.trade }]}
        eyebrow={`Concept · ${example.trade}`}
        title={example.title}
        description={example.summary}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="rounded-3xl bg-surface p-6 pb-16 sm:p-14 sm:pb-20">
            <DeviceShowcase desktop={theme} mobile={theme} url={conceptUrl(example.slug)} />
          </div>
          <p className="mt-4 font-mono text-[11px] text-muted-foreground">
            Concept design. {theme.business} is a fictional business used to illustrate the approach.
          </p>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What this design emphasises</h2>
              <ul className="mt-6 space-y-4">
                {example.emphasis.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border p-8">
              <h2 className="text-lg font-semibold">Design notes</h2>
              <dl className="mt-6 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <dt className="text-muted-foreground">Palette</dt>
                  <dd className="mt-2 flex gap-1.5">
                    {[theme.bg, theme.fg, theme.accent, theme.panel].map((colour) => (
                      <span
                        key={colour}
                        className="size-7 rounded-md border border-black/10"
                        style={{ backgroundColor: colour }}
                        title={colour}
                      />
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Typography</dt>
                  <dd className="mt-2 font-medium">{theme.serif ? "Serif headings" : "Sans headings"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Primary action</dt>
                  <dd className="mt-2 font-medium">Call or quote request</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Key services</dt>
                  <dd className="mt-2 font-medium">{theme.services.join(", ")}</dd>
                </div>
              </dl>
              {example.tradeSlug ? (
                <div className="mt-8">
                  <TextLink href={`/trades/${example.tradeSlug}`}>
                    More on {example.trade.toLowerCase()} websites
                  </TextLink>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-20 border-t border-border pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">More examples</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/portfolio/${item.slug}`}
                  className="rounded-2xl border border-border p-5 transition-colors hover:border-foreground/30"
                >
                  <span
                    className="block size-3 rounded-sm"
                    style={{ backgroundColor: miniSiteThemes[item.slug].accent }}
                  />
                  <p className="mt-4 font-semibold">{miniSiteThemes[item.slug].business}</p>
                  <p className="text-sm text-muted-foreground">{item.trade}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand placement={`portfolio-${example.slug}`} title="Want a draft like this for your business?" />
    </>
  );
}
