import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { miniSiteThemes } from "@/components/marketing/mini-site";
import { Reveal, Stagger, StaggerItem } from "@/components/marketing/motion";
import { SectionHeading, TextLink } from "@/components/marketing/ui";
import { tradePages } from "@/lib/trades";

export function TradesGrid() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Trades"
            title="Built for the way your trade actually wins work."
            description="Each trade has its own customers, urgency and proof points. We plan the site around yours."
          />
          <TextLink href="/websites-for-tradies">Websites for tradies</TextLink>
        </Reveal>
        <Stagger gap={0.06} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tradePages.map((trade) => {
            const theme = miniSiteThemes[trade.trade];
            return (
              <StaggerItem key={trade.slug}>
                <Link
                  href={`/trades/${trade.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white p-7 transition-all duration-300 hover:border-black/15 hover:shadow-[0_30px_60px_-20px_rgba(20,14,10,0.2)] motion-safe:hover:-translate-y-1"
                >
                  <div
                    aria-hidden
                    className="absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="flex gap-1">
                      {[theme.bg, theme.accent, theme.panel].map((colour) => (
                        <span key={colour} className="size-3.5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: colour }} />
                      ))}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-night group-hover:bg-night group-hover:text-white">
                      <ArrowUpRight aria-hidden className="size-4" />
                    </span>
                  </div>
                  <h3 className="relative mt-14 text-2xl font-semibold tracking-[-0.025em]">{trade.navLabel}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{trade.blurb}</p>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Carpenter, concreter, fencer or HVAC installer?{" "}
          <Link href="/get-a-draft" className="font-medium text-foreground underline underline-offset-4">
            We build for you too.
          </Link>
        </p>
      </div>
    </section>
  );
}
