"use client";

import { motion, useReducedMotion } from "motion/react";

import { Reveal, Stagger, StaggerItem } from "@/components/marketing/motion";
import { ButtonLink, SectionHeading } from "@/components/marketing/ui";

const steps = [
  {
    title: "Tell us about your business",
    time: "5 minutes",
    body: "Your trade, your area and the jobs you want more of. Add a logo and a few photos if you have them. It works fine from a phone on site.",
  },
  {
    title: "We draft your website",
    time: "Within 24 hours",
    body: "We design a personalised preview from your details and email you a private link. It isn't listed on Google, and there's nothing to pay.",
  },
  {
    title: "Approve it and go live",
    time: "When you're ready",
    body: "Love it? We finish the details and connect your domain. Not for you? You walk away. No invoice, no awkward follow-up.",
  },
];

const NODES: [number, number][] = [
  [165, 40],
  [500, 100],
  [835, 46],
];
const RAIL = "M0 70 C 60 70, 100 40, 165 40 S 400 100, 500 100 S 760 46, 835 46 C 900 46, 950 70, 1000 70";

export function ProcessRail() {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden bg-white">
      <div aria-hidden className="bg-dots absolute inset-0 [mask-image:radial-gradient(70rem_45rem_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="From a five-minute form to a website you've already seen."
            description="No discovery calls. No deposit. No guessing what you're paying for."
          />
        </Reveal>

        <div className="mt-20 hidden lg:block">
          <div className="relative h-[140px]">
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 1000 140" preserveAspectRatio="none" fill="none">
              <path d={RAIL} stroke="#d9d3cc" strokeWidth="1.5" strokeDasharray="6 6" />
              {!reduce ? (
                <motion.path
                  d={RAIL}
                  stroke="#ff8a46"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 6px rgba(255,138,70,0.9))" }}
                  initial={{ pathLength: 0.08, pathOffset: 0, opacity: 0 }}
                  animate={{ pathOffset: [0, 0.92], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 0.8, ease: "linear", times: [0, 0.08, 0.9, 1] }}
                />
              ) : null}
            </svg>
            {NODES.map(([x, y], index) => (
              <div
                key={x}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x / 10}%`, top: `${(y / 140) * 100}%` }}
              >
                <span className="relative flex size-14 items-center justify-center rounded-full bg-night text-base font-semibold text-white shadow-[0_12px_28px_rgba(20,14,10,0.3)] ring-[6px] ring-white">
                  {index + 1}
                  <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-ember/50" />
                </span>
              </div>
            ))}
          </div>

          <Stagger gap={0.12} className="mt-8 grid grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <StaggerItem
                key={step.title}
                className={
                  "rounded-[1.75rem] border border-black/[0.06] bg-white/80 p-8 backdrop-blur transition-all duration-300 hover:shadow-[0_30px_60px_-12px_rgba(20,14,10,0.14)] motion-safe:hover:-translate-y-1" +
                  (index === 1 ? " mt-10" : "")
                }
              >
                <p className="font-mono text-xs tracking-wider text-ember-ink uppercase">{step.time}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Stagger gap={0.1} className="relative mt-14 lg:hidden">
          <div aria-hidden className="absolute top-7 bottom-7 left-7 border-l-[1.5px] border-dashed border-[#d9d3cc]" />
          {steps.map((step, index) => (
            <StaggerItem key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-night font-semibold text-white ring-[6px] ring-white">
                {index + 1}
              </span>
              <div className="pt-1">
                <p className="font-mono text-xs tracking-wider text-ember-ink uppercase">{step.time}</p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 max-w-md leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-16 flex justify-center">
          <ButtonLink href="/get-a-draft" placement="home-process" arrow>
            Start my free draft
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
