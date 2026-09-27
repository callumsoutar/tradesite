import { BlueprintLines } from "@/components/marketing/blueprint-lines";
import { Reveal } from "@/components/marketing/motion";
import { ButtonLink } from "@/components/marketing/ui";

export function CtaBand({
  placement,
  title = "See your new website before you spend a cent.",
  description = "Tell us about your business. We'll send a private link to a personalised draft within 24 hours. No obligation.",
}: {
  placement: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(50rem_28rem_at_50%_120%,rgba(255,138,70,0.28),transparent_60%),radial-gradient(60rem_30rem_at_50%_-30%,rgba(255,106,43,0.14),transparent_60%)]"
      />
      <BlueprintLines className="opacity-70" />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-32 text-center sm:py-40">
        <Reveal>
          <h2 className="text-[2.6rem] leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-7xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/55">{description}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-11 flex flex-col items-center gap-3 sm:flex-row">
          <ButtonLink href="/get-a-draft" placement={placement} variant="brand" arrow className="h-14 px-8 text-base">
            Get my free website draft
          </ButtonLink>
          <ButtonLink href="/pricing" variant="ghostDark" className="h-14">
            See pricing
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
