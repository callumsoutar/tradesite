export type PortfolioExample = {
  slug: string;
  trade: string;
  title: string;
  description: string;
  summary: string;
  emphasis: string[];
  tradeSlug?: string;
};

export const portfolioExamples: PortfolioExample[] = [
  {
    slug: "electrician",
    trade: "Electrician",
    title: "Electrician website example",
    description:
      "A concept website for a New Zealand electrician, focused on service pages, a service area, and click-to-call.",
    summary:
      "This example is a concept, not a client project. It shows the structure we would use for an electrical business: a direct home page, separate pages for the jobs they want, and a phone number that stays easy to find.",
    emphasis: [
      "Home page that names the trade and the city",
      "Pages for switchboards, lighting, and EV chargers",
      "A short service-area section",
      "Click-to-call on mobile",
    ],
    tradeSlug: "electrician-websites",
  },
  {
    slug: "plumber",
    trade: "Plumber",
    title: "Plumber website example",
    description:
      "A concept website for a New Zealand plumber, organised around urgent calls and planned bathroom or hot water work.",
    summary:
      "This example is a concept, not a client project. It separates urgent plumbing from booked work, so a person with a leak can call and a person planning a bathroom can send details.",
    emphasis: [
      "Emergency contact above the list of services",
      "Pages for hot water, bathrooms, and drainage",
      "Photos of finished jobs when the business has them",
      "A short form for non-urgent quotes",
    ],
    tradeSlug: "plumber-websites",
  },
  {
    slug: "builder",
    trade: "Builder",
    title: "Builder website example",
    description:
      "A concept website for a New Zealand builder, with project types and a simple quote request.",
    summary:
      "This example is a concept, not a client project. It leads with the kinds of building work on offer and a small project list, instead of a generic construction homepage.",
    emphasis: [
      "Renovations and new builds as separate pages",
      "A project list with a sentence per job",
      "A quote form that asks for the type of work and the suburb",
      "An about section that names who does the work",
    ],
    tradeSlug: "builder-websites",
  },
  {
    slug: "landscaper",
    trade: "Landscaper",
    title: "Landscaper website example",
    description:
      "A concept website for a New Zealand landscaper, with distinct pages for building and maintaining gardens.",
    summary:
      "This example is a concept, not a client project. It treats new landscaping and regular maintenance as different services, and leaves room for photos of paving, planting, and retaining.",
    emphasis: [
      "Separate pages for landscaping builds and maintenance",
      "A photo section that can start with a few jobs",
      "Service area written as real towns",
      "A quote form with space to describe the section",
    ],
    tradeSlug: "landscaper-websites",
  },
];

export function getPortfolioExample(slug: string) {
  return portfolioExamples.find((example) => example.slug === slug);
}
