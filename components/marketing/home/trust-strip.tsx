import { CountUp, Stagger, StaggerItem } from "@/components/marketing/motion";
import { tradeOptions } from "@/lib/trades";

const stats = [
  { value: 24, suffix: "h", label: "From brief to your private draft link" },
  { value: 0, prefix: "$", label: "To see it. No card, no deposit" },
  { value: 3, label: "Fixed prices, published upfront" },
  { value: 100, suffix: "%", label: "Yours once you decide to go ahead" },
];

export function TrustStrip() {
  const trades = tradeOptions.filter((trade) => trade.value !== "other").map((trade) => trade.label);

  return (
    <section aria-label="The offer" className="bg-background">
      <div className="relative overflow-hidden border-b border-black/[0.06] bg-white py-5">
        <div className="flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="animate-marquee flex shrink-0 items-center">
              {trades.map((trade) => (
                <li key={trade} className="flex items-center gap-10 pr-10 text-lg font-medium tracking-tight text-foreground/70">
                  {trade}
                  <svg aria-hidden viewBox="0 0 10 10" className="size-2.5 text-ember">
                    <path d="M5 0l1.4 3.6L10 5 6.4 6.4 5 10 3.6 6.4 0 5l3.6-1.4z" fill="currentColor" />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
      </div>

      <Stagger
        gap={0.08}
        className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-y-12 px-5 pt-20 pb-6 sm:px-8 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <StaggerItem key={stat.label} className={index > 0 ? "lg:border-l lg:border-black/[0.08] lg:pl-10" : undefined}>
            <p className="text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
