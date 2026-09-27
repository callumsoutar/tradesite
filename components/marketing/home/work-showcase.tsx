"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { DeviceShowcase } from "@/components/marketing/device-mockup";
import { conceptUrl, miniSiteThemes } from "@/components/marketing/mini-site";
import { EASE, Reveal } from "@/components/marketing/motion";
import { SectionHeading, TextLink } from "@/components/marketing/ui";
import { tradePages } from "@/lib/trades";
import { cn } from "@/lib/utils";

const portfolioSlugs = new Set(["electrician", "plumber", "builder", "landscaper"]);

export function WorkShowcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const trade = tradePages[active];
  const theme = miniSiteThemes[trade.trade];
  const href = portfolioSlugs.has(trade.trade) ? `/portfolio/${trade.trade}` : `/trades/${trade.slug}`;

  return (
    <section id="work" className="relative isolate scroll-mt-20 overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70rem_40rem_at_90%_0%,rgba(255,106,43,0.16),transparent_60%),radial-gradient(40rem_26rem_at_0%_100%,rgba(255,179,107,0.07),transparent_60%)]"
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            dark
            eyebrow="The work"
            title="Every trade wins work differently. So every site looks different."
            description="Concept designs for six trades. Your draft is shaped by your services, colours and photos, not a template with your name pasted on."
          />
          <TextLink href="/portfolio" dark>
            See all examples
          </TextLink>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal delay={0.1} className="order-2 lg:order-1">
            <ul role="tablist" aria-label="Trades">
              {tradePages.map((item, index) => {
                const isActive = active === index;
                const itemTheme = miniSiteThemes[item.trade];
                return (
                  <li key={item.slug} className="border-t border-white/10 last:border-b">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      className="relative grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-5 text-left sm:py-6"
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="work-highlight"
                          aria-hidden
                          className="absolute -inset-x-4 inset-y-0 -z-10 rounded-2xl bg-white/[0.06]"
                          transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        />
                      ) : null}
                      <span
                        className={cn(
                          "text-sm tabular-nums transition-colors duration-300",
                          isActive ? "text-amber" : "text-white/35",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span
                          className={cn(
                            "block text-2xl font-medium tracking-[-0.02em] transition-colors duration-300 sm:text-[1.7rem]",
                            isActive ? "text-white" : "text-white/55",
                          )}
                        >
                          {item.navLabel}
                        </span>
                        <span className="mt-0.5 block text-sm text-white/40">{itemTheme.business}</span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "size-3 rounded-full transition-all duration-300",
                          isActive ? "scale-100 opacity-100" : "scale-50 opacity-30",
                        )}
                        style={{ backgroundColor: itemTheme.accent, boxShadow: isActive ? `0 0 18px ${itemTheme.accent}` : undefined }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <div className="relative rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-5 pb-14 sm:p-10 sm:pb-16">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={trade.trade}
                    initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduce ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <DeviceShowcase desktop={theme} mobile={theme} url={conceptUrl(trade.trade)} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{theme.business}</p>
                  <p className="text-sm text-white/45">
                    Concept · {trade.navLabel.replace(/s$/, "")} · {theme.city}
                  </p>
                </div>
                <TextLink href={href} dark>
                  See the breakdown
                </TextLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
