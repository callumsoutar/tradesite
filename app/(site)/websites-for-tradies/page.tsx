import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/marketing/cta-band";
import { miniSiteThemes } from "@/components/marketing/mini-site";
import { PageHero } from "@/components/marketing/page-hero";
import { Container, SectionHeading } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { tradePages } from "@/lib/trades";

export const metadata = pageMetadata({
  title: "Websites for tradies in New Zealand",
  description:
    "What a useful website includes for New Zealand trade businesses, and the trades we build for first.",
  path: "/websites-for-tradies",
});

const principles = [
  {
    title: "Fast on a phone",
    body: "Most people searching for a tradie are on their phone, often in a hurry. Pages need to load quickly and put your number within thumb's reach.",
  },
  {
    title: "Clear about the work",
    body: "Name the services you want to be hired for, and give the important ones their own page. Customers skim; search engines need clarity.",
  },
  {
    title: "Proof over promises",
    body: "Real photos of real jobs beat stock images every time. A small gallery of your own work builds more trust than a big generic one.",
  },
  {
    title: "Honest about the area",
    body: "Say where you actually work. Homeowners want to know you'll come to their suburb before they pick up the phone.",
  },
];

export default function TradiesPage() {
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
          ],
        }}
      />
      <PageHero
        crumbs={[{ label: "Websites for tradies" }]}
        eyebrow="Websites for tradies"
        title="A trade website has one job: get you the call."
        description="The useful version is fast on a phone, names the services you want to be hired for, and shows real work. We start with a free draft so you can see that before you pay."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Principles" title="What makes a tradie website work." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {principles.map((principle, index) => (
              <div key={principle.title} className="bg-card p-8 sm:p-10">
                <p className="font-mono text-xs text-brand">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{principle.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{principle.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Trades"
            title="Pick your trade."
            description="Carpenters, concrete contractors, fencers and HVAC installers can request a draft too."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tradePages.map((trade) => {
              const theme = miniSiteThemes[trade.trade];
              return (
                <Link
                  key={trade.slug}
                  href={`/trades/${trade.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-colors hover:border-foreground/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="size-3 rounded-sm" style={{ backgroundColor: theme?.accent }} />
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                    />
                  </div>
                  <div className="mt-12">
                    <h3 className="text-2xl font-semibold tracking-tight">{trade.h1}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{trade.blurb}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand placement="tradies-final" />
    </>
  );
}
