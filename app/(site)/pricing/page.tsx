import { Info } from "lucide-react";

import { CtaBand } from "@/components/marketing/cta-band";
import { FaqList } from "@/components/marketing/faq-list";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { Container, SectionHeading } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/faqs";
import { pricing } from "@/lib/pricing";
import { organizationId, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Tradie website pricing in New Zealand",
  description:
    "Published prices for New Zealand tradie websites: Starter $999, Professional $1,499, and Premium $2,499, plus GST. See a free draft first.",
  path: "/pricing",
});

const pricingFaqs = faqs.filter((faq) =>
  ["Is the draft really free?", "Do I own my website?", "Do you provide hosting?", "How long does it take to build?"].includes(
    faq.question,
  ),
);

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Tradie website packages",
          url: absoluteUrl("/pricing"),
          itemListElement: pricing.tiers.map((tier) => ({
            "@type": "Offer",
            name: `${tier.name} website`,
            description: tier.summary,
            url: absoluteUrl("/pricing"),
            priceCurrency: pricing.currency,
            price: tier.price,
            availability: "https://schema.org/InStock",
            seller: { "@id": organizationId() },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: tier.price,
              priceCurrency: pricing.currency,
              valueAddedTaxIncluded: pricing.pricesIncludeGst,
            },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Pricing", item: absoluteUrl("/pricing") },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pricingFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <PageHero
        crumbs={[{ label: "Pricing" }]}
        eyebrow="Pricing"
        title="Know the price before you pick up the phone."
        description={`Three one-off prices${pricing.pricesIncludeGst ? ", including GST" : ", plus GST"}. See your free draft first, then choose the size that fits your business.`}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <PricingCards placement="pricing-page" />
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-10 rounded-3xl border border-border bg-surface p-8 sm:p-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <Info aria-hidden className="size-5 text-brand" />
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">What can cost extra</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                No surprises later. If something isn&apos;t in your tier, we tell you the price before any work
                starts.
              </p>
            </div>
            <ul className="divide-y divide-border">
              {pricing.extras.map((extra) => (
                <li key={extra} className="py-4 leading-relaxed first:pt-0 last:pb-0">
                  {extra}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title="Pricing questions." />
          <FaqList items={pricingFaqs} />
        </Container>
      </section>

      <CtaBand placement="pricing-final" />
    </>
  );
}
