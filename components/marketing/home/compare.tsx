import { Check, X } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/marketing/motion";
import { Kicker } from "@/components/marketing/ui";
import { site } from "@/lib/site";

const rows = [
  { usual: "Discovery calls before you see a single design", ours: "A personalised draft in your inbox within 24 hours" },
  { usual: "A deposit up front, before you know if you like it", ours: "Nothing to pay unless you want the finished site" },
  { usual: "Weeks of back-and-forth emails", ours: "One short form, filled in from your phone" },
  { usual: "A price that only appears after a quote", ours: "Three fixed prices, published right here" },
];

export function Compare() {
  return (
    <section className="bg-background px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-night-2 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(40rem_24rem_at_100%_0%,rgba(255,106,43,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-[1280px] px-6 py-20 sm:px-12 sm:py-24">
          <Reveal className="max-w-2xl">
            <Kicker dark>Why it&apos;s different</Kicker>
            <h2 className="mt-5 text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-5xl sm:leading-[1.04]">
              See the website first. Then decide.
            </h2>
          </Reveal>

          <div className="mt-14 hidden grid-cols-2 gap-8 border-b border-white/10 pb-4 text-xs font-semibold tracking-[0.12em] uppercase sm:grid">
            <p className="text-white/35">The usual way</p>
            <p className="text-amber">With {site.name}</p>
          </div>
          <Stagger gap={0.08} className="mt-4 sm:mt-0">
            {rows.map((row) => (
              <StaggerItem
                key={row.usual}
                className="grid gap-3 border-b border-white/10 py-6 sm:grid-cols-2 sm:gap-8"
              >
                <p className="flex gap-3 text-white/40">
                  <X aria-hidden className="mt-0.5 size-4 shrink-0" />
                  <span className="line-through decoration-white/20">{row.usual}</span>
                </p>
                <p className="flex gap-3 text-[17px] font-medium">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-amber" />
                  {row.ours}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
