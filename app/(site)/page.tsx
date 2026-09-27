import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/marketing/cta-band";
import { Compare } from "@/components/marketing/home/compare";
import { Hero } from "@/components/marketing/home/hero";
import { IncludedLedger } from "@/components/marketing/home/included-ledger";
import { ProcessRail } from "@/components/marketing/home/process-rail";
import { Guides } from "@/components/marketing/home/guides";
import { PromiseFaq } from "@/components/marketing/home/promise-faq";
import { TradesGrid } from "@/components/marketing/home/trades-grid";
import { TrustStrip } from "@/components/marketing/home/trust-strip";
import { WorkShowcase } from "@/components/marketing/home/work-showcase";
import { Reveal } from "@/components/marketing/motion";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { SectionHeading } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/faqs";
import { pricing } from "@/lib/pricing";
import { organizationId } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Website design for tradies in New Zealand | ${site.name}` },
  description:
    "Get a free, personalised website draft for your trade business within 24 hours. Mobile-friendly, and built to help local customers find you.",
  alternates: { canonical: absoluteUrl("/"), languages: { "en-NZ": absoluteUrl("/") } },
  openGraph: {
    title: "Website design for tradies in New Zealand",
    description: "Get a free, personalised website draft for your trade business within 24 hours.",
    url: absoluteUrl("/"),
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website design for tradies in New Zealand",
    description: "Get a free, personalised website draft for your trade business within 24 hours.",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": absoluteUrl("/#service"),
          name: site.name,
          url: site.url,
          image: absoluteUrl("/logo.svg"),
          serviceType: "Website design for trade businesses",
          provider: { "@id": organizationId() },
          areaServed: { "@type": "Country", name: "New Zealand" },
          description: site.description,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      <Hero />
      <TrustStrip />
      <div className="h-24 bg-background sm:h-32" />
      <WorkShowcase />
      <ProcessRail />
      <IncludedLedger />
      <Compare />
      <TradesGrid />

      <section id="pricing" className="scroll-mt-20 border-t border-black/[0.06] bg-white py-24 sm:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Pricing"
              title="Simple, published prices."
              description={`One-off pricing${pricing.pricesIncludeGst ? " including GST" : " plus GST"}. See your draft first, then choose the size that fits.`}
            />
          </Reveal>
          <div className="mt-16">
            <PricingCards placement="home-pricing" />
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Domain registration, extra pages and hosting are quoted separately.{" "}
            <Link href="/pricing" className="font-medium text-foreground underline underline-offset-4">
              See exactly what&apos;s included
            </Link>
          </p>
        </div>
      </section>

      <Guides />
      <PromiseFaq />
      <CtaBand placement="home-final" />
    </>
  );
}
