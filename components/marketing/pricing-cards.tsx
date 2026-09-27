import { Check } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/marketing/motion";
import { ButtonLink } from "@/components/marketing/ui";
import { formatPrice, pricing } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const featured = "professional";

export function PricingCards({ placement }: { placement: string }) {
  return (
    <Stagger gap={0.1} className="grid items-stretch gap-5 lg:grid-cols-3">
      {pricing.tiers.map((tier) => {
        const isFeatured = tier.id === featured;
        const card = (
          <div
            className={cn(
              "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-8 sm:p-9",
              isFeatured ? "bg-night text-white" : "border border-black/[0.07] bg-white",
            )}
          >
            {isFeatured ? (
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(30rem_18rem_at_100%_0%,rgba(255,138,70,0.22),transparent_60%)]"
              />
            ) : null}
            <div className="relative flex items-center justify-between">
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              {isFeatured ? (
                <span className="rounded-full bg-ember/15 px-2.5 py-1 text-[11px] font-semibold text-amber ring-1 ring-ember/30">
                  Recommended
                </span>
              ) : null}
            </div>
            <p className="relative mt-8 flex items-baseline gap-2">
              <span className="text-[3.4rem] leading-none font-semibold tracking-[-0.05em]">{formatPrice(tier.price)}</span>
              <span className={cn("text-sm", isFeatured ? "text-white/50" : "text-muted-foreground")}>
                {pricing.pricesIncludeGst ? "incl. GST" : "+ GST"}
              </span>
            </p>
            <p className={cn("relative mt-5 leading-relaxed", isFeatured ? "text-white/60" : "text-muted-foreground")}>
              {tier.summary}
            </p>
            <div className={cn("relative my-8 h-px", isFeatured ? "bg-white/10" : "bg-black/[0.07]")} />
            <ul className="relative space-y-3.5 text-[15px]">
              {tier.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                      isFeatured ? "bg-ember/20 text-amber" : "bg-black/[0.05] text-foreground",
                    )}
                  >
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative mt-auto pt-10">
              <ButtonLink
                href="/get-a-draft"
                placement={`${placement}-${tier.id}`}
                variant={isFeatured ? "brand" : "secondary"}
                className="w-full"
              >
                Start with a free draft
              </ButtonLink>
            </div>
          </div>
        );

        return (
          <StaggerItem key={tier.id} className={cn("h-full", isFeatured && "lg:-my-4")}>
            {isFeatured ? (
              <div className="h-full rounded-[1.8rem] bg-gradient-to-b from-amber/70 via-white/10 to-ember/40 p-px shadow-[0_40px_90px_-20px_rgba(20,14,10,0.5)]">
                {card}
              </div>
            ) : (
              card
            )}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
