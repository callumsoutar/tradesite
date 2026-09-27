import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("flex items-center gap-2 font-semibold tracking-tight", inverted && "text-white", className)}
    >
      <span
        aria-hidden
        className={cn(
          "relative grid size-8 place-items-center overflow-hidden rounded-[10px]",
          inverted ? "bg-white text-night" : "bg-night text-white",
        )}
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none">
          <path d="M2.5 13.5V6.2L8 2.5l5.5 3.7v7.3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6.2 13.5V9.6h3.6v3.9" fill="#ff6a2b" />
        </svg>
      </span>
      <span className="text-[17px] tracking-[-0.02em]">{site.name}</span>
    </Link>
  );
}
