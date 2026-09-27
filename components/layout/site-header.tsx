"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { primaryLinks } from "@/components/layout/nav-links";
import { track } from "@/components/analytics/track";
import { EASE } from "@/components/marketing/motion";
import { tradePages } from "@/lib/trades";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        aria-label="Primary"
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-full border border-black/[0.07] bg-white/75 pr-2 pl-4 shadow-[0_8px_32px_rgba(20,14,10,0.1)] backdrop-blur-2xl sm:pl-5"
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          <li className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className={cn(
                "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors hover:text-foreground",
                pathname.startsWith("/trades") ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              Trades
              <ChevronDown aria-hidden className="size-3.5 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180" />
            </button>
            <div className="invisible absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="rounded-3xl border border-black/[0.07] bg-white/95 p-2 shadow-[0_24px_60px_-12px_rgba(20,14,10,0.25)] backdrop-blur-2xl">
                {tradePages.map((trade) => (
                  <Link
                    key={trade.slug}
                    href={`/trades/${trade.slug}`}
                    className="flex flex-col rounded-2xl px-4 py-2.5 transition-colors hover:bg-black/[0.04] focus-visible:bg-black/[0.04]"
                  >
                    <span className="text-sm font-medium text-foreground">{trade.navLabel}</span>
                    <span className="text-xs text-muted-foreground">{trade.blurb}</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors hover:text-foreground",
                  isActive(link.href) ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <Link
            href="/get-a-draft"
            onClick={() => track("cta_click", { placement: "header" })}
            className="hidden h-10 items-center gap-1.5 rounded-full bg-night px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-night-2 motion-safe:hover:-translate-y-px sm:inline-flex"
          >
            Get a free draft
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpenAt(open ? null : pathname)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] w-full max-w-5xl overflow-y-auto rounded-3xl border border-black/[0.07] bg-white/95 p-3 shadow-[0_16px_48px_rgba(20,14,10,0.15)] backdrop-blur-2xl md:hidden"
          >
            <ul>
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpenAt(null)}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-[15px]",
                      isActive(link.href) ? "bg-black/[0.04] font-medium" : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Trades</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5 px-1">
              {tradePages.map((trade) => (
                <Link
                  key={trade.slug}
                  href={`/trades/${trade.slug}`}
                  onClick={() => setOpenAt(null)}
                  className="rounded-2xl bg-black/[0.03] px-3 py-3 text-sm font-medium"
                >
                  {trade.navLabel}
                </Link>
              ))}
            </div>
            <Link
              href="/get-a-draft"
              onClick={() => {
                setOpenAt(null);
                track("cta_click", { placement: "mobile-menu" });
              }}
              className="bg-ember-button mt-3 flex h-12 items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-night"
            >
              Get my free website draft
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
