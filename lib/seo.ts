import type { Metadata } from "next";

import { absoluteUrl, publicEmail, site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Link the RSS feed. Use on the guides index and each article. */
  feed?: boolean;
  published?: string;
  modified?: string;
};

export function pageMetadata({ title, description, path, feed, published, modified }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const article = Boolean(published);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "en-NZ": url },
      ...(feed ? { types: { "application/rss+xml": absoluteUrl("/feed.xml") } } : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: article ? "article" : "website",
      ...(published ? { publishedTime: published, modifiedTime: modified ?? published } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const privateMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export function organizationId() {
  return absoluteUrl("/#organization");
}

export function organizationGraph() {
  const email = publicEmail();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId(),
        name: site.name,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.svg"),
        },
        description: site.description,
        areaServed: { "@type": "Country", name: "New Zealand" },
        ...(email ? { email } : {}),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: site.name,
        url: site.url,
        inLanguage: "en-NZ",
        publisher: { "@id": organizationId() },
      },
    ],
  };
}
