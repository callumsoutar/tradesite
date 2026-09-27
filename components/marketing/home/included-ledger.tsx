import { Reveal, Stagger, StaggerItem } from "@/components/marketing/motion";
import { Kicker } from "@/components/marketing/ui";

const points = [
  {
    title: "Designed around your trade",
    body: "Your colours, your logo, your services. A plumber's site leads with urgency; a builder's leads with finished projects.",
    tags: ["Custom design", "Service pages"],
  },
  {
    title: "Made for the phone in their hand",
    body: "Most people find a tradie on their phone, often in a hurry. Pages load fast and your number is always one tap away.",
    tags: ["Mobile-first", "Click-to-call", "Fast loading"],
  },
  {
    title: "Set up to be found",
    body: "Clean titles, proper headings, structured data and a sitemap from day one, so Google understands what you do and where.",
    tags: ["Technical SEO", "Search Console"],
  },
  {
    title: "Enquiries that land properly",
    body: "Quote requests arrive in your inbox with the details you need to call back, not a vague 'please contact me'.",
    tags: ["Contact forms"],
  },
  {
    title: "Handled end to end",
    body: "We connect your .co.nz or keep the domain you already own. Hosting and care are available, quoted separately.",
    tags: ["Domain connection", "Hosting & care"],
  },
];

export function IncludedLedger() {
  return (
    <section className="border-t border-black/[0.06] bg-background">
      <div className="mx-auto grid w-full max-w-[1280px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <Kicker>What&apos;s included</Kicker>
            <h2 className="mt-5 max-w-md text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-5xl sm:leading-[1.04]">
              Everything a trade website needs. Nothing it doesn&apos;t.
            </h2>
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-pretty text-muted-foreground">
              A good tradie site has one job: help someone nearby understand what you do, and get in touch.
            </p>
          </div>
        </Reveal>

        <Stagger gap={0.1}>
          {points.map((point, index) => (
            <StaggerItem
              key={point.title}
              className="group border-t border-black/[0.08] py-9 first:border-t-0 first:pt-0 last:pb-0"
            >
              <div className="grid gap-4 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                <span className="text-sm font-semibold text-ember-ink tabular-nums sm:pt-1.5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.4rem] font-medium tracking-[-0.02em]">{point.title}</h3>
                  <p className="mt-2.5 max-w-xl leading-relaxed text-muted-foreground">{point.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {point.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-medium text-foreground/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
