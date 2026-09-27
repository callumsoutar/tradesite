import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", dark ? "text-white/45" : "text-muted-foreground")}>
        <li>
          <Link href="/" className={dark ? "hover:text-white" : "hover:text-foreground"}>
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className="size-3.5 opacity-60" />
            {item.href ? (
              <Link href={item.href} className={dark ? "hover:text-white" : "hover:text-foreground"}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white/80" : "text-foreground"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
