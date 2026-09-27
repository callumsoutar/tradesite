"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Lock, Sparkles } from "lucide-react";

import { conceptUrl, MiniSite, miniSiteThemes } from "@/components/marketing/mini-site";
import { cn } from "@/lib/utils";

const ORDER = ["electrician", "plumber", "builder", "landscaper", "painter", "roofer"] as const;
const DRAFT_MS = 1700;
const SHOW_MS = 3800;
const WIPE_MS = 1100;

function Wireframe() {
  return (
    <div
      className="@container h-full w-full"
      style={{
        backgroundColor: "#15253f",
        backgroundImage:
          "linear-gradient(rgba(170,205,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(170,205,255,0.09) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="flex h-full flex-col gap-[1.6em] p-[2em]" style={{ fontSize: "1.5625cqw" }}>
        <div className="flex items-center justify-between">
          <span className="h-[1.2em] w-[12em] rounded-[0.2em] border border-dashed border-sky-200/40" />
          <span className="h-[2em] w-[8em] rounded-full border border-dashed border-sky-200/40" />
        </div>
        <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-[2em]">
          <div className="flex flex-col justify-center gap-[0.9em]">
            <span className="h-[0.8em] w-[6em] bg-sky-200/25" />
            <span className="h-[2.2em] w-full border border-dashed border-sky-200/40" />
            <span className="h-[2.2em] w-4/5 border border-dashed border-sky-200/40" />
            <span className="mt-[0.6em] h-[2.4em] w-[9em] rounded-full border border-dashed border-sky-200/40" />
          </div>
          <div className="relative border border-dashed border-sky-200/40">
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 0L100 100M100 0L0 100" stroke="rgba(186,220,255,0.18)" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[1em]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[5.5em] border border-dashed border-sky-200/40" />
          ))}
        </div>
      </div>
      <div className="absolute right-[3%] bottom-[4%] font-mono text-[9px] tracking-widest text-sky-200/40 uppercase">
        Draft · rev 1
      </div>
    </div>
  );
}

/**
 * Hero visual: a blueprint wireframe that wipes away to reveal a finished concept site,
 * cycling through trades. Layers are always mounted and driven by CSS transitions so an
 * interrupted cycle can never stack stale frames.
 */
export function DraftBuilder() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"draft" | "done" | "cover">("draft");

  useEffect(() => {
    if (reduce) return;
    const durations = { draft: DRAFT_MS, done: SHOW_MS, cover: 380 };
    const timer = setTimeout(() => {
      if (phase === "draft") setPhase("done");
      else if (phase === "done") setPhase("cover");
      else {
        setIndex((current) => (current + 1) % ORDER.length);
        setPhase("draft");
      }
    }, durations[phase]);
    return () => clearTimeout(timer);
  }, [phase, reduce]);

  const key = ORDER[index];
  const theme = miniSiteThemes[key];
  const showDone = Boolean(reduce) || phase === "done";
  const wipe = showDone ? `${WIPE_MS}ms` : "350ms";

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[640px]">
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-[1.1rem] bg-gradient-to-b from-amber/60 via-white/15 to-ember/30 p-px shadow-[0_60px_120px_-20px_rgba(0,0,0,0.85),0_0_80px_rgba(255,120,50,0.15)]">
          <div className="overflow-hidden rounded-[1.05rem] bg-[#141110]">
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
              </div>
              <div className="relative mx-auto flex h-6 w-full max-w-72 items-center justify-center gap-1.5 overflow-hidden rounded-md bg-white/[0.06] font-mono text-[10px] text-white/55">
                <Lock className="size-2.5" />
                {conceptUrl(key)}
                <span
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber to-ember"
                  style={{
                    width: phase === "draft" ? "100%" : "0%",
                    opacity: phase === "draft" ? 1 : 0,
                    transition: phase === "draft" ? `width ${DRAFT_MS}ms ease-in-out` : "opacity 300ms",
                  }}
                />
              </div>
              <div className="w-10" />
            </div>

            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0">
                <MiniSite theme={theme} />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  clipPath: showDone ? "inset(100% 0 0 0)" : "inset(0 0 0 0)",
                  transition: `clip-path ${wipe} cubic-bezier(0.65, 0, 0.35, 1)`,
                }}
              >
                <Wireframe />
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent shadow-[0_0_24px_4px_rgba(255,140,70,0.7)]"
                style={{
                  top: showDone ? "100%" : "0%",
                  opacity: showDone ? 0 : 1,
                  transition: showDone
                    ? `top ${WIPE_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity 200ms ${WIPE_MS - 150}ms`
                    : "top 0ms, opacity 200ms",
                }}
              />
              {phase === "draft" && !reduce ? (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="animate-[scan_1.7s_ease-in-out_infinite] absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-sky-200/10 to-transparent" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute -top-4 right-4 sm:-right-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#141110]/90 py-1.5 pr-3.5 pl-2 text-[11px] font-medium text-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <span className="relative flex size-5 items-center justify-center rounded-full bg-ember/15">
            {showDone ? <Check className="size-3 text-amber" /> : <Sparkles className="size-3 animate-pulse text-amber" />}
          </span>
          <span className="w-[6.5rem]">{showDone ? "Draft complete" : "Drafting layout…"}</span>
        </div>
      </div>

      <div
        className={cn(
          "absolute -bottom-10 -left-2 transition-all duration-500 sm:-bottom-12 sm:-left-10",
          showDone ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0",
        )}
        style={{ transitionDelay: showDone ? `${WIPE_MS - 300}ms` : "0ms" }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#141110]/90 py-3 pr-5 pl-3 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        >
          <span
            className="grid size-9 place-items-center rounded-xl text-[13px] font-bold"
            style={{ backgroundColor: theme.accent, color: theme.accentFg }}
          >
            {theme.business.charAt(0)}
          </span>
          <span className="flex flex-col">
            <span className="text-[12px] font-semibold text-white">Your draft is ready</span>
            <span className="text-[11px] text-white/60">
              {theme.business} · {theme.city}
            </span>
          </span>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="absolute -inset-12 -z-10 rounded-[3rem] bg-[radial-gradient(28rem_20rem_at_50%_45%,rgba(255,130,60,0.22),transparent_70%)]"
      />
    </div>
  );
}