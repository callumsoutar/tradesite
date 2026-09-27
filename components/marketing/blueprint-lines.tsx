"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const PATHS = [
  {
    d: "M-40 330 H 300 q 20 0 20 -20 V 210 q 0 -20 20 -20 H 700 q 20 0 20 20 v 190 q 0 20 20 20 H 1480",
    duration: 7,
    delay: 0,
  },
  {
    d: "M-40 540 H 460 q 20 0 20 20 v 80 q 0 20 20 20 h 400 q 20 0 20 -20 V 420 q 0 -20 20 -20 H 1480",
    duration: 9,
    delay: 2.4,
  },
  {
    d: "M-40 150 H 580 q 20 0 20 20 v 70 q 0 20 20 20 h 500 q 20 0 20 -20 V 90 q 0 -20 20 -20 H 1480",
    duration: 8,
    delay: 4.2,
  },
];

const NODES: [number, number][] = [
  [320, 190],
  [720, 440],
  [480, 560],
  [900, 660],
  [600, 240],
  [1140, 70],
];

/** Drafting guide lines with a travelling ember pulse. Static when reduced motion is set. */
export function BlueprintLines({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1440 720"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="ember-pulse" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6a2b" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffb36b" />
          <stop offset="1" stopColor="#ffe3c4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {PATHS.map((p) => (
        <path key={p.d} d={p.d} stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeDasharray="4 6" />
      ))}

      {!reduce &&
        PATHS.map((p) => (
          <motion.path
            key={`pulse-${p.d}`}
            d={p.d}
            stroke="url(#ember-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,138,70,0.8))" }}
            initial={{ pathLength: 0.12, pathOffset: 0, opacity: 0 }}
            animate={{ pathOffset: [0, 0.88], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: "linear",
              times: [0, 0.12, 0.85, 1],
            }}
          />
        ))}

      {NODES.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.12)" />
          <path d={`M${x - 9} ${y}h18M${x} ${y - 9}v18`} stroke="rgba(255,255,255,0.08)" />
        </g>
      ))}
    </svg>
  );
}
