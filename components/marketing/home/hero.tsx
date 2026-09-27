"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

import { BlueprintLines } from "@/components/marketing/blueprint-lines";
import { DraftBuilder } from "@/components/marketing/draft-builder";
import { EASE } from "@/components/marketing/motion";
import { ButtonLink } from "@/components/marketing/ui";

function entrance(reduce: boolean | null, delay: number) {
  return {
    initial: reduce ? false : ({ opacity: 0, y: 24 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  };
}

const trust = ["No payment to see your draft", "Built for NZ trades", "You own the finished site"];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(80rem_45rem_at_85%_-15%,rgba(255,138,70,0.22),transparent_55%),radial-gradient(60rem_40rem_at_-10%_115%,rgba(255,106,43,0.18),transparent_55%)]"
      />
      <div
        aria-hidden
        className="bg-grid-night absolute inset-0 opacity-60 [mask-image:radial-gradient(80rem_50rem_at_60%_10%,black,transparent)]"
      />
      <BlueprintLines className="opacity-80" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-20 px-5 pt-32 pb-24 sm:px-8 sm:pt-36 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pb-28">
        <div>
          <motion.p
            {...entrance(reduce, 0)}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pr-4 pl-1.5 text-xs font-medium text-white/85 backdrop-blur"
          >
            <span className="rounded-full bg-ember px-2 py-0.5 text-[10px] font-bold tracking-wider text-night uppercase">
              Free
            </span>
            Custom website drafts for NZ tradies
          </motion.p>

          <motion.h1
            {...entrance(reduce, 0.06)}
            className="max-w-[14ch] text-[2.9rem] leading-[1.0] font-bold tracking-[-0.05em] text-balance sm:text-7xl lg:text-[5.1rem] lg:leading-[0.98]"
          >
            Your new tradie website,{" "}
            <span className="relative inline-block">
              <span className="text-ember-gradient">designed in 24&nbsp;hours.</span>
              <span
                aria-hidden
                className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[radial-gradient(closest-side,rgba(255,138,70,0.28),transparent)] blur-xl"
              />
            </span>
          </motion.h1>

          <motion.p
            {...entrance(reduce, 0.18)}
            className="mt-7 max-w-lg text-lg leading-relaxed text-pretty text-white/60"
          >
            Get a free, personalised website draft for your business. Professionally designed, mobile-friendly and
            built to help local customers find you on Google.
          </motion.p>

          <motion.div {...entrance(reduce, 0.3)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/get-a-draft" placement="home-hero" variant="brand" arrow className="h-14 px-8 text-base">
              Get my free website draft
            </ButtonLink>
            <ButtonLink href="/portfolio" placement="home-hero-secondary" variant="ghostDark" className="h-14">
              View our work
            </ButtonLink>
          </motion.div>

          <motion.ul
            {...entrance(reduce, 0.42)}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/45"
          >
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden className="size-3.5 text-amber" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
        >
          <DraftBuilder />
        </motion.div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
}
