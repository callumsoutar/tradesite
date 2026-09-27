import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { FaqList } from "@/components/marketing/faq-list";
import { Reveal } from "@/components/marketing/motion";
import { Kicker } from "@/components/marketing/ui";
import { faqs } from "@/lib/faqs";

const promises = [
  "The draft is free. No card, no deposit.",
  "You only pay if you want the finished site.",
  "Prices are fixed and on the page.",
  "You own the website once it's paid for.",
];

export function PromiseFaq() {
  return (
    <section className="border-t border-black/[0.06] bg-background">
      <div className="mx-auto grid w-full max-w-[1280px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <span className="grid size-14 place-items-center rounded-2xl bg-ember/12 ring-1 ring-ember/30">
              <ShieldCheck aria-hidden className="size-7 text-ember" />
            </span>
            <h2 className="mt-7 max-w-sm text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-5xl sm:leading-[1.04]">
              The no-risk promise.
            </h2>
            <ul className="mt-7 space-y-3">
              {promises.map((promise) => (
                <li key={promise} className="flex gap-3 text-[15px] leading-relaxed text-foreground/80">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-ember" />
                  {promise}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Something else on your mind?{" "}
              <Link href="/get-a-draft" className="font-medium text-foreground underline underline-offset-4">
                Ask on the draft form
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Kicker>Common questions</Kicker>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
