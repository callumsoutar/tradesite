import { Check } from "lucide-react";

import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink, Container } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "How the free tradie website draft works",
  description:
    "Tell us about your trade business, get a free website draft within 24 hours, and only pay if you want the finished site.",
  path: "/how-it-works",
});

const steps = [
  {
    title: "Tell us about your business",
    time: "About 5 minutes",
    body: "The form asks for your name, trade, location, services, and a short description. A logo and job photos are optional. It's designed to be finished on a phone between jobs.",
    points: ["No calls or meetings needed", "Photos and logo optional", "Works on any phone"],
  },
  {
    title: "Receive your free draft within 24 hours",
    time: "Within 24 hours",
    body: "We design a personalised preview using your details, services and colours, then email you a private link. The preview isn't listed on Google, and there's nothing to pay to see it.",
    points: ["Private, unlisted link", "Built from your real details", "No payment details asked for"],
  },
  {
    title: "Approve the design and go live",
    time: "When you're ready",
    body: "If you want to go ahead, we finish the site, make your changes, and connect your domain. We confirm anything outside your chosen price, such as hosting or extra pages, before work starts.",
    points: ["Your changes included", "Domain connected for you", "You own the finished site"],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "How it works", item: absoluteUrl("/how-it-works") },
          ],
        }}
      />
      <PageHero
        crumbs={[{ label: "How it works" }]}
        eyebrow="How it works"
        title="Three steps. You stay on the tools for most of them."
        description="The draft is free, and you don't have to buy the website. Here's exactly what happens after you hit send."
      >
        <div className="mt-10">
          <ButtonLink href="/get-a-draft" placement="how-hero" variant="brand" arrow>
            Get my free website draft
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container>
          <ol className="relative space-y-6">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-8 rounded-3xl border border-border bg-card p-8 sm:p-12 lg:grid-cols-[auto_1fr_1fr] lg:gap-14"
              >
                <span className="text-6xl font-semibold tracking-[-0.05em] text-brand sm:text-7xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{step.time}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{step.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
                <ul className="space-y-3 self-center rounded-2xl bg-surface p-6">
                  {step.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand placement="how-final" />
    </>
  );
}
