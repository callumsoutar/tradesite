"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

import { EASE } from "@/components/marketing/motion";
import { cn } from "@/lib/utils";

export function FaqList({
  items,
  dark = false,
}: {
  items: readonly { question: string; answer: string }[];
  dark?: boolean;
}) {
  return (
    <div>
      {items.map((item, index) => (
        <FaqItem key={item.question} {...item} dark={dark} defaultOpen={index === 0} />
      ))}
    </div>
  );
}

function FaqItem({
  question,
  answer,
  dark,
  defaultOpen,
}: {
  question: string;
  answer: string;
  dark: boolean;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div className={cn("border-t last:border-b", dark ? "border-white/10" : "border-black/[0.08]")}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className={cn("text-[17px] font-medium tracking-tight", dark ? "text-white" : "text-foreground")}>
          {question}
        </span>
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
            open
              ? "rotate-45 border-ember bg-ember text-night"
              : dark
                ? "border-white/15 text-white/60"
                : "border-black/10 text-muted-foreground",
          )}
        >
          <Plus aria-hidden className="size-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p
              className={cn(
                "max-w-2xl pr-12 pb-7 leading-relaxed text-pretty",
                dark ? "text-white/55" : "text-muted-foreground",
              )}
            >
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
