import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/marketing/cta-band";
import { BrowserFrame, PhoneFrame } from "@/components/marketing/device-mockup";
import { conceptUrl, miniSiteThemes } from "@/components/marketing/mini-site";
import { PageHero } from "@/components/marketing/page-hero";
import { Container } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { portfolioExamples } from "@/lib/portfolio";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Tradie website examples",
  description:
    "Concept website designs for electricians, plumbers, builders, and landscapers in New Zealand. These are examples, not client projects.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/portfolio") },
          ],
        }}
      />
      <PageHero
        crumbs={[{ label: "Work" }]}
        eyebrow="Work"
        title="Four trades. Four very different websites."
        description="These are concept designs, not client projects. They show how we shape structure, tone and colour around a specific trade."
      />

      <section className="py-16 sm:py-24">
        <Container className="space-y-24">
          {portfolioExamples.map((example, index) => {
            const theme = miniSiteThemes[example.slug];
            return (
              <article key={example.slug} className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
                <Link
                  href={`/portfolio/${example.slug}`}
                  className={`group relative block rounded-3xl bg-surface p-6 pb-14 sm:p-12 sm:pb-16 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <BrowserFrame
                    theme={theme}
                    url={conceptUrl(example.slug)}
                    className="w-[88%] transition-transform duration-300 group-hover:-translate-y-1"
                  />
                  <PhoneFrame
                    theme={theme}
                    className="absolute right-4 bottom-6 w-[24%] min-w-24 sm:right-8"
                  />
                </Link>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Concept · {example.trade}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{theme.business}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{example.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {theme.services.map((service) => (
                      <li key={service} className="rounded-full border border-border px-3 py-1 text-sm">
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/portfolio/${example.slug}`}
                    className="group mt-8 inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
                  >
                    See the breakdown
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </Container>
      </section>

      <CtaBand
        placement="portfolio-final"
        title="Want to see yours next?"
        description="Send your details and we'll design a personalised draft for your business within 24 hours. Free, no obligation."
      />
    </>
  );
}
