import { MiniSite, type MiniSiteTheme } from "@/components/marketing/mini-site";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  theme,
  url,
  className,
}: {
  theme: MiniSiteTheme;
  url: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_30px_60px_-20px_rgba(30,20,10,0.25)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-black/5 bg-[#f6f4f0] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-black/10" />
          <span className="size-2.5 rounded-full bg-black/10" />
          <span className="size-2.5 rounded-full bg-black/10" />
        </div>
        <div className="mx-auto flex h-5 w-full max-w-60 items-center justify-center rounded-md bg-white font-mono text-[10px] text-black/45">
          {url}
        </div>
        <div className="w-10" />
      </div>
      <div className="aspect-[16/10]">
        <MiniSite theme={theme} />
      </div>
    </div>
  );
}

export function PhoneFrame({ theme, className }: { theme: MiniSiteTheme; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "rounded-[28px] border border-black/15 bg-[#161412] p-[6px] shadow-[0_30px_60px_-15px_rgba(30,20,10,0.4)]",
        className,
      )}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[22px]">
        <div className="absolute top-1.5 left-1/2 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-[#161412]" />
        <div className="h-full pt-5" style={{ backgroundColor: theme.bg }}>
          <MiniSite theme={theme} variant="mobile" />
        </div>
      </div>
    </div>
  );
}

export function DeviceShowcase({
  desktop,
  mobile,
  url,
  className,
}: {
  desktop: MiniSiteTheme;
  mobile: MiniSiteTheme;
  url: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <BrowserFrame theme={desktop} url={url} className="w-[88%]" />
      <PhoneFrame theme={mobile} className="absolute right-0 -bottom-10 w-[26%] min-w-28" />
    </div>
  );
}
