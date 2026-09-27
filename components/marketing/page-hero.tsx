import { BlueprintLines } from "@/components/marketing/blueprint-lines";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/marketing/motion";
import { Container, Kicker } from "@/components/marketing/ui";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60rem_34rem_at_85%_-20%,rgba(255,138,70,0.2),transparent_55%),radial-gradient(40rem_28rem_at_-10%_120%,rgba(255,106,43,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="bg-grid-night absolute inset-0 opacity-50 [mask-image:radial-gradient(60rem_36rem_at_60%_0%,black,transparent)]"
      />
      <BlueprintLines className="opacity-50" />
      <Container className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Reveal>
          <Breadcrumbs items={crumbs} dark />
          {eyebrow ? (
            <Kicker dark className="mt-12">
              {eyebrow}
            </Kicker>
          ) : null}
          <h1 className="mt-5 max-w-4xl text-[2.6rem] leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-7xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-white/55 sm:text-xl">{description}</p>
          ) : null}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
