import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { CtaBand } from "@/components/marketing/cta-band";
import { DeviceShowcase } from "@/components/marketing/device-mockup";
import { FaqList } from "@/components/marketing/faq-list";
import { conceptUrl, miniSiteThemes } from "@/components/marketing/mini-site";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPrice, pricing } from "@/lib/pricing";
import { organizationId, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getTradePage, tradePages } from "@/lib/trades";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tradePages.map((trade) => ({ slug: trade.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const trade = getTradePage(slug);
  if (!trade) return {};
  return pageMetadata({
    title: trade.title,
    description: trade.description,
    path: `/trades/${trade.slug}`,
  });
}

export default async function TradePage({ params }: Props) {
  const { slug } = await params;
  const trade = getTradePage(slug);
  if (!trade) notFound();
  const theme = miniSiteThemes[trade.trade];
  const lowestPrice = Math.min(...pricing.tiers.map((tier) => tier.price));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            {
              "@type": "ListItem",
              position: 2,
              name: "Websites for tradies",
              item: absoluteUrl("/websites-for-tradies"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: trade.navLabel,
              item: absoluteUrl(`/trades/${trade.slug}`),
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: trade.title,
          serviceType: `Website design for ${trade.navLabel.toLowerCase()}`,
          description: trade.description,
          url: absoluteUrl(`/trades/${trade.slug}`),
          provider: { "@id": organizationId() },
          areaServed: { "@type": "Country", name: "New Zealand" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: trade.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      <PageHero
        crumbs={[{ href: "/websites-for-tradies", label: "Websites for tradies" }, { label: trade.navLabel }]}
        eyebrow={`For ${trade.navLabel.toLowerCase()}`}
        title={trade.h1}
        description={trade.intro}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/get-a-draft" placement={`trade-${trade.trade}-hero`} variant="brand" arrow>
            Get my free website draft
          </ButtonLink>
          <p className="text-sm text-white/50">
            Free draft in 24 hours · Websites from {formatPrice(lowestPrice)}
            {pricing.pricesIncludeGst ? "" : " + GST"}
          </p>
        </div>
      </PageHero>

      {theme ? (
        <section className="pt-16 sm:pt-24">
          <Container>
            <div className="rounded-3xl bg-surface p-6 pb-16 sm:p-14 sm:pb-20">
              <DeviceShowcase desktop={theme} mobile={theme} url={conceptUrl(trade.trade)} />
            </div>
            <p className="mt-4 font-mono text-[11px] text-muted-foreground">
              Concept design for a fictional {trade.navLabel.toLowerCase().replace(/s$/, "")} business.
              {trade.portfolioSlug ? (
                <>
                  {" "}
                  <Link href={`/portfolio/${trade.portfolioSlug}`} className="underline underline-offset-4">
                    See the breakdown
                  </Link>
                </>
              ) : null}
            </p>
          </Container>
        </section>
      ) : null}

      <section className="py-20 sm:py-28">
        <Container className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <Eyebrow>Customers</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">What they look for</h2>
            <ul className="mt-8 space-y-4">
              {trade.customersLookFor.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-ink p-8 text-white sm:p-10">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand">Your site</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">What we put on it</h2>
            <ul className="mt-8 space-y-4">
              {trade.includeOnSite.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="FAQ" title={`${trade.navLabel}, your questions.`} />
            <div className="mt-8 flex flex-wrap gap-2">
              {tradePages
                .filter((item) => item.slug !== trade.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/trades/${item.slug}`}
                    className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-foreground/30"
                  >
                    {item.navLabel}
                  </Link>
                ))}
            </div>
          </div>
          <FaqList items={trade.faqs} />
        </Container>
      </section>

      <CtaBand
        placement={`trade-${trade.trade}-final`}
        title={`See your new ${trade.navLabel.toLowerCase().replace(/s$/, "")} website tomorrow.`}
      />
    </>
  );
}
