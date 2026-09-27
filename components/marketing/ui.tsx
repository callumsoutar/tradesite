import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TrackLink } from "@/components/analytics/track-link";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-24 sm:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Kicker({ className, dark, children }: { className?: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase",
        dark ? "text-amber" : "text-ember-ink",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-6", dark ? "bg-amber/60" : "bg-ember/60")} />
      {children}
    </p>
  );
}

/** Retained for older pages; renders as a Kicker. */
export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <Kicker className={className}>{children}</Kicker>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Kicker dark={dark} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Kicker>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-5xl sm:leading-[1.04]",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-[17px] leading-relaxed text-pretty",
            dark ? "text-white/55" : "text-muted-foreground",
            align === "center" && "mx-auto max-w-xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring motion-safe:hover:-translate-y-0.5";

const buttonVariants = {
  primary: "bg-night text-white hover:bg-night-2 h-13 px-7 text-[15px] shadow-[0_10px_30px_rgba(20,14,10,0.2)]",
  brand: "bg-ember-button text-night h-13 px-7 text-[15px]",
  secondary: "border border-black/10 bg-white text-foreground hover:border-black/25 h-13 px-7 text-[15px]",
  ghostDark:
    "border border-white/20 bg-white/[0.06] text-white/90 backdrop-blur hover:border-white/40 hover:text-white h-13 px-7 text-[15px] font-medium",
  small: "bg-night text-white hover:bg-night-2 h-10 px-5 text-sm",
} as const;

export function buttonClass(variant: keyof typeof buttonVariants = "primary", className?: string) {
  return cn(buttonBase, buttonVariants[variant], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  placement,
  arrow = false,
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof buttonVariants;
  placement?: string;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );
  const classes = buttonClass(variant, className);

  if (placement) {
    return (
      <TrackLink href={href} placement={placement} className={classes}>
        {content}
      </TrackLink>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function TextLink({ href, dark, children }: { href: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-[15px] font-medium",
        dark ? "text-white" : "text-foreground",
      )}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}
