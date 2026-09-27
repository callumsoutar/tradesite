import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/marketing/motion";
import { SectionHeading } from "@/components/marketing/ui";
import { formatPostDate, getPosts } from "@/lib/blog";

export function Guides() {
  const posts = getPosts().slice(0, 4);
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-black/[0.06] bg-background py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Guides"
              title="Plain answers before you spend anything."
              description="Short notes on cost, what a trade site should include, and how customers actually find you."
            />
            <Link href="/blog" className="text-sm font-medium underline underline-offset-4">
              All guides
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-foreground/30"
            >
              <div className="flex items-center justify-between gap-4">
                <time dateTime={post.date} className="font-mono text-xs uppercase tracking-[0.14em] text-brand">
                  {formatPostDate(post.date)}
                </time>
                <ArrowUpRight
                  aria-hidden
                  className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-balance">{post.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
