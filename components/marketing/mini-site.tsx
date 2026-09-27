import { cn } from "@/lib/utils";

export type MiniSiteTheme = {
  business: string;
  tagline: string;
  city: string;
  phone: string;
  services: [string, string, string];
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accentFg: string;
  panel: string;
  serif?: boolean;
  layout: "split" | "center" | "stack";
  pattern: "stripes" | "dots" | "waves" | "grid";
};

export const miniSiteThemes: Record<string, MiniSiteTheme> = {
  electrician: {
    business: "Volt & Co. Electrical",
    tagline: "Switchboards, lighting and EV chargers, done properly.",
    city: "Christchurch",
    phone: "021 555 0142",
    services: ["Switchboards", "EV chargers", "Fault finding"],
    bg: "#0d1321",
    fg: "#f5f3ee",
    muted: "#9aa3b5",
    accent: "#f5c518",
    accentFg: "#0d1321",
    panel: "#1a2236",
    layout: "split",
    pattern: "stripes",
  },
  plumber: {
    business: "Harbourline Plumbing",
    tagline: "Leaks fixed fast. Bathrooms built to last.",
    city: "Wellington",
    phone: "027 555 0188",
    services: ["Hot water", "Bathrooms", "Blocked drains"],
    bg: "#f4f8fb",
    fg: "#0b2a4a",
    muted: "#5a7390",
    accent: "#1c6ef2",
    accentFg: "#ffffff",
    panel: "#dce9f5",
    layout: "center",
    pattern: "waves",
  },
  builder: {
    business: "Kauri Ridge Builders",
    tagline: "Renovations and new homes, built by a small crew.",
    city: "Hamilton",
    phone: "022 555 0107",
    services: ["Renovations", "New builds", "Extensions"],
    bg: "#f3eee6",
    fg: "#2b2520",
    muted: "#7d7166",
    accent: "#b4532a",
    accentFg: "#fdf8f2",
    panel: "#e2d8c9",
    serif: true,
    layout: "stack",
    pattern: "grid",
  },
  landscaper: {
    business: "Fernbank Landscapes",
    tagline: "Gardens, paving and retaining that stand up to the weather.",
    city: "Tauranga",
    phone: "021 555 0163",
    services: ["Landscape builds", "Retaining", "Maintenance"],
    bg: "#eef1ea",
    fg: "#1d2e22",
    muted: "#62725f",
    accent: "#2f6b3a",
    accentFg: "#f3f6ef",
    panel: "#d5dfcf",
    layout: "split",
    pattern: "dots",
  },
  roofer: {
    business: "Southerly Roofing",
    tagline: "Leaks found, roofs replaced, gutters sorted.",
    city: "Dunedin",
    phone: "027 555 0121",
    services: ["Roof repairs", "Re-roofing", "Spouting"],
    bg: "#1f2326",
    fg: "#eef0f1",
    muted: "#9aa3a8",
    accent: "#e4572e",
    accentFg: "#ffffff",
    panel: "#2c3236",
    layout: "stack",
    pattern: "stripes",
  },
  painter: {
    business: "Clearcoat Painters",
    tagline: "Interiors and exteriors, prepped properly.",
    city: "Nelson",
    phone: "022 555 0176",
    services: ["Exteriors", "Interiors", "Roof painting"],
    bg: "#fbf7f2",
    fg: "#2a2230",
    muted: "#7a6f80",
    accent: "#7b4fd1",
    accentFg: "#ffffff",
    panel: "#efe7f7",
    serif: true,
    layout: "center",
    pattern: "dots",
  },
};

export function conceptUrl(slug: string) {
  return `${miniSiteThemes[slug].business.toLowerCase().replace(/[^a-z]+/g, "")}.co.nz`;
}

function patternStyle(theme: MiniSiteTheme): React.CSSProperties {
  const line = `${theme.fg}14`;
  switch (theme.pattern) {
    case "stripes":
      return {
        backgroundColor: theme.panel,
        backgroundImage: `repeating-linear-gradient(135deg, ${theme.accent}22 0 2px, transparent 2px 14px)`,
      };
    case "dots":
      return {
        backgroundColor: theme.panel,
        backgroundImage: `radial-gradient(${theme.accent}40 1.2px, transparent 1.2px)`,
        backgroundSize: "12px 12px",
      };
    case "waves":
      return {
        backgroundColor: theme.panel,
        backgroundImage: `repeating-radial-gradient(circle at 100% 100%, transparent 0 10px, ${theme.accent}1f 10px 11px)`,
      };
    case "grid":
      return {
        backgroundColor: theme.panel,
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      };
  }
}

function PhotoBlock({ theme, className }: { theme: MiniSiteTheme; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[0.6em]", className)} style={patternStyle(theme)}>
      <div
        className="absolute bottom-[0.8em] left-[0.8em] rounded-[0.3em] px-[0.6em] py-[0.25em] text-[0.7em] font-medium"
        style={{ backgroundColor: theme.bg, color: theme.fg }}
      >
        Recent job · {theme.city}
      </div>
    </div>
  );
}

function Pill({
  theme,
  solid = true,
  square = false,
  children,
}: {
  theme: MiniSiteTheme;
  solid?: boolean;
  square?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-block px-[1.2em] py-[0.6em] text-[0.8em] leading-none font-semibold whitespace-nowrap",
        square ? "rounded-[0.4em]" : "rounded-full",
        !solid && "border font-normal",
      )}
      style={
        solid
          ? { backgroundColor: theme.accent, color: theme.accentFg }
          : { borderColor: `${theme.fg}33` }
      }
    >
      {children}
    </span>
  );
}

/**
 * Sizes are in em, and the root font size is set from the frame width with container query
 * units, so the design scales like a screenshot instead of reflowing.
 */
export function MiniSite({
  theme,
  variant = "desktop",
  className,
}: {
  theme: MiniSiteTheme;
  variant?: "desktop" | "mobile";
  className?: string;
}) {
  const headingFont = theme.serif ? "font-serif" : "font-sans";
  const mobile = variant === "mobile";

  return (
    <div aria-hidden className={cn("@container h-full w-full select-none", className)}>
      <div
        className="flex h-full w-full flex-col overflow-hidden text-left leading-snug"
        style={{
          backgroundColor: theme.bg,
          color: theme.fg,
          fontSize: mobile ? "5cqw" : "1.5625cqw",
        }}
      >
        <div className="flex items-center justify-between px-[2em] py-[1.3em]">
          <div className="flex items-center gap-[0.6em]">
            <span className="size-[1.2em] rounded-[0.3em]" style={{ backgroundColor: theme.accent }} />
            <span className={cn("text-[1em] font-semibold tracking-tight", headingFont)}>{theme.business}</span>
          </div>
          {mobile ? (
            <span className="flex flex-col gap-[0.25em]">
              <span className="h-[0.15em] w-[1.3em]" style={{ backgroundColor: theme.fg }} />
              <span className="h-[0.15em] w-[1.3em]" style={{ backgroundColor: theme.fg }} />
            </span>
          ) : (
            <div className="flex items-center gap-[1.6em]">
              <span className="text-[0.8em]" style={{ color: theme.muted }}>
                Services
              </span>
              <span className="text-[0.8em]" style={{ color: theme.muted }}>
                Our work
              </span>
              <span className="text-[0.8em]" style={{ color: theme.muted }}>
                About
              </span>
              <Pill theme={theme}>{theme.phone}</Pill>
            </div>
          )}
        </div>

        {mobile ? (
          <div className="flex flex-1 flex-col gap-[1em] px-[2em] pb-[2em]">
            <PhotoBlock theme={theme} className="h-[11em] shrink-0" />
            <p className="text-[0.75em] font-medium tracking-wider uppercase" style={{ color: theme.muted }}>
              {theme.city}
            </p>
            <p className={cn("text-[1.55em] leading-[1.12] font-semibold tracking-tight", headingFont)}>
              {theme.tagline}
            </p>
            <span
              className="rounded-full py-[0.8em] text-center text-[0.85em] font-semibold"
              style={{ backgroundColor: theme.accent, color: theme.accentFg }}
            >
              Call {theme.phone}
            </span>
            <div className="space-y-[0.6em]">
              {theme.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center justify-between rounded-[0.5em] px-[1em] py-[0.8em]"
                  style={{ backgroundColor: theme.panel }}
                >
                  <span className="text-[0.85em]">{service}</span>
                  <span className="text-[0.85em]" style={{ color: theme.accent }}>
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col px-[2em] pb-[2em]">
            {theme.layout === "center" ? (
              <div className="flex flex-1 flex-col items-center pt-[1.5em] text-center">
                <p className="text-[0.8em] font-medium tracking-wider uppercase" style={{ color: theme.muted }}>
                  {theme.city}
                </p>
                <p
                  className={cn(
                    "mt-[0.4em] max-w-[62%] text-[2.6em] leading-[1.04] font-semibold tracking-tight text-balance",
                    headingFont,
                  )}
                >
                  {theme.tagline}
                </p>
                <div className="mt-[1.4em] flex gap-[0.8em]">
                  <Pill theme={theme}>Call now</Pill>
                  <Pill theme={theme} solid={false}>
                    Book a job
                  </Pill>
                </div>
                <PhotoBlock theme={theme} className="mt-[1.8em] w-full flex-1" />
              </div>
            ) : theme.layout === "stack" ? (
              <div className="flex flex-1 flex-col pt-[1em]">
                <PhotoBlock theme={theme} className="w-full flex-1" />
                <div className="mt-[1.4em] flex items-end justify-between gap-[2em]">
                  <p className={cn("max-w-[65%] text-[2.4em] leading-[1.04] font-semibold", headingFont)}>
                    {theme.tagline}
                  </p>
                  <Pill theme={theme} square>
                    Request a quote
                  </Pill>
                </div>
              </div>
            ) : (
              <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-[2em] pt-[1em]">
                <div className="flex flex-col justify-center">
                  <p className="text-[0.8em] font-medium tracking-wider uppercase" style={{ color: theme.accent }}>
                    {theme.city}
                  </p>
                  <p className={cn("mt-[0.4em] text-[2.6em] leading-[1.04] font-semibold tracking-tight", headingFont)}>
                    {theme.tagline}
                  </p>
                  <p className="mt-[1em] max-w-[90%] text-[0.95em]" style={{ color: theme.muted }}>
                    Local crew, upfront pricing, and we turn up when we say we will.
                  </p>
                  <div className="mt-[1.5em] flex gap-[0.8em]">
                    <Pill theme={theme}>Get a quote</Pill>
                    <Pill theme={theme} solid={false}>
                      Our work
                    </Pill>
                  </div>
                </div>
                <PhotoBlock theme={theme} />
              </div>
            )}

            <div className="mt-[1.8em] grid grid-cols-3 gap-[1em]">
              {theme.services.map((service) => (
                <div key={service} className="rounded-[0.6em] p-[1.1em]" style={{ backgroundColor: theme.panel }}>
                  <span className="block size-[1.1em] rounded-[0.25em]" style={{ backgroundColor: theme.accent }} />
                  <p className="mt-[0.9em] text-[0.9em] font-semibold">{service}</p>
                  <span className="mt-[0.6em] block h-[0.3em] w-4/5 rounded" style={{ backgroundColor: `${theme.fg}1a` }} />
                  <span className="mt-[0.35em] block h-[0.3em] w-3/5 rounded" style={{ backgroundColor: `${theme.fg}1a` }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
