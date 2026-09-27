import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { site } from "@/lib/site";
import { tradePages } from "@/lib/trades";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/portfolio", label: "Work" },
      { href: "/pricing", label: "Pricing" },
      { href: "/blog", label: "Guides" },
    ],
  },
  {
    title: "Trades",
    links: tradePages.map((trade) => ({ href: `/trades/${trade.slug}`, label: trade.navLabel })),
  },
  {
    title: "Start",
    links: [
      { href: "/get-a-draft", label: "Get a free draft" },
      { href: "/websites-for-tradies", label: "Websites for tradies" },
      { href: "/blog/tradie-website-cost-nz", label: "Website costs in NZ" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/[0.07] bg-night text-white">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 pt-20 pb-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
            Websites for New Zealand trade businesses. See a free, personalised draft before you spend a cent.
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="text-sm font-medium text-white">{column.title}</h3>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 transition-colors duration-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none mx-auto max-w-[1280px] px-5 text-[21vw] leading-[0.8] font-bold tracking-[-0.06em] text-transparent select-none sm:px-8 lg:text-[16rem]"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.09)" }}
      >
        {site.name}
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 px-5 py-6 text-xs text-white/40 sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. Made for tradies across Aotearoa.
          </p>
          <p>Prices in NZD</p>
        </div>
      </div>
    </footer>
  );
}
