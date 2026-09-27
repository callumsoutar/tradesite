"use client";

import Link from "next/link";

import { track } from "@/components/analytics/track";

export function TrackLink({
  href,
  placement,
  className,
  children,
}: {
  href: string;
  placement: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => track("cta_click", { placement })}>
      {children}
    </Link>
  );
}
