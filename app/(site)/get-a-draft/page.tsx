import Link from "next/link";
import { Check, Lock } from "lucide-react";

import { DraftEnquiryForm } from "@/components/forms/draft-enquiry-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get a free tradie website draft",
  description:
    "Request a free, personalised website draft for your New Zealand trade business. We aim to send a private preview within 24 hours.",
  path: "/get-a-draft",
});

const next = [
  { title: "We read your brief", body: "Usually the same day." },
  { title: "We design your draft", body: "Using your details, services and colours." },
  { title: "You get a private link", body: "Within 24 hours, by email." },
  { title: "You decide", body: "Go ahead, ask for changes, or walk away." },
];

export default function GetADraftPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Get a draft", item: absoluteUrl("/get-a-draft") },
          ],
        }}
      />
      <section className="relative overflow-hidden">
        <div className="bg-grid mask-fade-b absolute inset-x-0 top-0 h-[28rem]" aria-hidden />
        <Container className="relative pt-28 pb-20 sm:pt-32 sm:pb-28">
          <Breadcrumbs items={[{ label: "Get a draft" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand">Free draft</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
                Get your free website draft.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
                Tell us about the business. We&apos;ll design a personalised preview and send you a private link.
                You only pay if you want the finished website.
              </p>
              <ol className="mt-10 space-y-5 border-l border-border pl-6">
                {next.map((item, index) => (
                  <li key={item.title} className="relative">
                    <span className="absolute top-0.5 -left-[33px] grid size-4 place-items-center rounded-full bg-background ring-1 ring-border">
                      <span className={index === 0 ? "size-1.5 rounded-full bg-brand" : "size-1.5 rounded-full bg-border"} />
                    </span>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-10 space-y-2.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Check aria-hidden className="size-4 text-brand" /> No payment details asked for
                </p>
                <p className="flex items-center gap-2">
                  <Lock aria-hidden className="size-4 text-brand" /> Your details stay private.{" "}
                  <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                    Privacy
                  </Link>
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_30px_60px_-30px_rgba(30,20,10,0.18)] sm:p-10">
              <DraftEnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
