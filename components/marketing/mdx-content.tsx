import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) =>
    href.startsWith("/") ? (
      <Link href={href} className="font-medium text-foreground underline decoration-brand underline-offset-4">
        {children}
      </Link>
    ) : (
      <a href={href} className="font-medium text-foreground underline underline-offset-4">
        {children}
      </a>
    ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-14 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-10 text-xl font-semibold tracking-tight text-foreground" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => <p className="mt-6" {...props} />,
  ul: (props: React.ComponentProps<"ul">) => <ul className="mt-6 list-disc space-y-2 pl-5 marker:text-brand" {...props} />,
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mt-6 list-decimal space-y-2 pl-5 marker:text-brand" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote className="mt-8 border-l-2 border-brand pl-5 text-foreground" {...props} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
