export type PricingTier = {
  id: string;
  name: string;
  price: number;
  summary: string;
  includes: string[];
};

export const pricing = {
  /** Placeholder prices. Change this flag when the business is GST registered. */
  pricesIncludeGst: false,
  currency: "NZD",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      price: 999,
      summary: "A straightforward five-page site for a trade business that needs a clear online presence.",
      includes: [
        "Five-page website",
        "Mobile-responsive layout",
        "Contact form",
        "Basic SEO",
        "Domain connection",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: 1499,
      summary: "More room for the services you actually quote, with the technical setup to match.",
      includes: [
        "Up to eight pages",
        "Custom design",
        "Service-specific pages",
        "Contact form",
        "Technical SEO foundations",
        "Google Search Console setup",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 2499,
      summary: "A larger site for businesses with a wider range of work and a project gallery.",
      includes: [
        "Up to 12 pages",
        "Custom design",
        "Expanded service pages",
        "Project gallery",
        "Advanced on-page SEO",
        "Additional content",
      ],
    },
  ] satisfies PricingTier[],
  extras: [
    "Domain registration is paid to the registrar, typically a .co.nz name, and is not included in the website price.",
    "Pages beyond the tier you choose are quoted before any extra work starts.",
    "Logo design and professional photography are separate if you need them.",
    "Copy is written from the information you provide. A larger copywriting brief is quoted separately.",
    "Hosting and maintenance are not included in the one-off website price. They are quoted if you want them.",
  ],
} as const;

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
