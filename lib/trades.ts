export const tradeOptions = [
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" },
  { value: "builder", label: "Builder" },
  { value: "roofer", label: "Roofer" },
  { value: "painter", label: "Painter" },
  { value: "landscaper", label: "Landscaper" },
  { value: "carpenter", label: "Carpenter" },
  { value: "concrete", label: "Concrete contractor" },
  { value: "fencing", label: "Fencing contractor" },
  { value: "hvac", label: "HVAC installer" },
  { value: "other", label: "Another trade" },
] as const;

export type TradeValue = (typeof tradeOptions)[number]["value"];

export type TradePage = {
  slug: string;
  trade: TradeValue;
  navLabel: string;
  blurb: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  customersLookFor: string[];
  includeOnSite: string[];
  portfolioSlug?: string;
  faqs: { question: string; answer: string }[];
};

export const tradePages: TradePage[] = [
  {
    slug: "electrician-websites",
    trade: "electrician",
    navLabel: "Electricians",
    blurb: "Switchboards, lighting, EV chargers and callouts.",
    title: "Electrician website design in New Zealand",
    description:
      "Websites for New Zealand electricians, with a free draft in 24 hours. Built for phone calls, service pages, and local search.",
    h1: "Websites for electricians",
    intro:
      "Homeowners searching for an electrician usually want to know what you cover, where you work, and how to call you. A useful electrician website makes those three things obvious on a phone, then gives Google a clear page for each kind of work you want.",
    customersLookFor: [
      "Whether you do fault finding, switchboards, lighting, EV chargers, or new-build wiring",
      "The suburbs or towns you actually travel to",
      "A phone number they can tap, especially when the power is out",
      "Photos of finished work rather than generic electrical stock images",
    ],
    includeOnSite: [
      "A home page that says you are an electrician and names your area",
      "Separate pages for the jobs you want more of, such as switchboard upgrades or EV charger installs",
      "Click-to-call and a short contact form",
      "Your service area, hours, and how urgent callouts are handled",
    ],
    portfolioSlug: "electrician",
    faqs: [
      {
        question: "Can you build a site for a one-person electrical business?",
        answer:
          "Yes. Most of the sites we plan are for small crews. The draft is based on your services and your area, not on a large-company template.",
      },
      {
        question: "Should every electrical service have its own page?",
        answer:
          "Give a page to the services you want to be hired for. A long list on one page is harder for a customer to scan and harder for a search engine to understand.",
      },
    ],
  },
  {
    slug: "plumber-websites",
    trade: "plumber",
    navLabel: "Plumbers",
    blurb: "Urgent leaks, hot water and bathroom renovations.",
    title: "Plumber website design in New Zealand",
    description:
      "Websites for New Zealand plumbers. Get a free, mobile-friendly draft within 24 hours, with clear services and click-to-call.",
    h1: "Websites for plumbers",
    intro:
      "Plumbing enquiries are often urgent. A leak, a failed hot water cylinder, or a blocked drain does not leave much patience for a slow or confusing site. The page should load quickly, show the work you do, and put your number where a thumb can reach it.",
    customersLookFor: [
      "Hot water, bathrooms, leaks, drainage, and maintenance, named in plain language",
      "Whether you cover their suburb",
      "A way to call immediately, plus a form for jobs that can wait",
      "Photos of bathrooms, cylinders, and other finished jobs",
    ],
    includeOnSite: [
      "Service pages for the work you quote most often",
      "A short note on emergency versus booked work, so people know what to expect",
      "Your location and the areas you service",
      "A contact path that works with one hand on a phone",
    ],
    portfolioSlug: "plumber",
    faqs: [
      {
        question: "Do you write the plumbing service descriptions?",
        answer:
          "Yes. You tell us the jobs you do and the areas you cover. We turn that into page copy for the draft. You can correct anything that does not sound like your business.",
      },
      {
        question: "Can the site replace my Facebook page?",
        answer:
          "No. Social posts are useful for recent work. A website is the page people find when they search for a plumber, and it is the address you own.",
      },
    ],
  },
  {
    slug: "builder-websites",
    trade: "builder",
    navLabel: "Builders",
    blurb: "Renovations, new builds and extensions.",
    title: "Builder website design in New Zealand",
    description:
      "Websites for New Zealand builders. See a free draft of your site within 24 hours, with project types and a clear way to request a quote.",
    h1: "Websites for builders",
    intro:
      "People hiring a builder are usually comparing trust as much as price. They want to see the kind of work you take on, whether that is new homes, renovations, extensions, or smaller jobs, and they want a simple way to start a conversation.",
    customersLookFor: [
      "The types of building work you accept",
      "Photos of real projects, with a sentence on what the job involved",
      "The region you build in",
      "A form that asks for the useful details, not a ten-field questionnaire",
    ],
    includeOnSite: [
      "Pages for renovations, new builds, or other work you want, written separately",
      "A project section, even if it starts with a handful of jobs",
      "Click-to-call and a quote enquiry form",
      "A short about section that says who is on the tools",
    ],
    portfolioSlug: "builder",
    faqs: [
      {
        question: "I only have a few project photos. Is that enough?",
        answer:
          "Yes. A small set of real photos is more useful than a large gallery of stock images. The draft can start with what you have and grow later.",
      },
      {
        question: "Can you redesign the site I already have?",
        answer:
          "Yes. Send the current address in the form. If you already own the domain, the finished site can keep it.",
      },
    ],
  },
  {
    slug: "roofer-websites",
    trade: "roofer",
    navLabel: "Roofers",
    blurb: "Repairs, re-roofs and spouting.",
    title: "Roofer website design in New Zealand",
    description:
      "Websites for New Zealand roofers. Request a free draft within 24 hours, with repair and re-roof pages built for local customers.",
    h1: "Websites for roofers",
    intro:
      "Roofing customers often arrive after a leak or a quote for a re-roof. They need to know which roof types you work on, where you work, and how to reach you before the next spell of weather.",
    customersLookFor: [
      "Repairs, re-roofs, gutters, and the materials you install",
      "Photos of completed roofs, not just a logo",
      "The towns you cover",
      "A phone number for leak calls and a form for planned work",
    ],
    includeOnSite: [
      "Separate pages for repairs and replacements if you do both",
      "A short explanation of the roof types you work with",
      "Service area copy that names real places, not 'all of New Zealand' unless that is true",
      "Fast pages, because many of these visits happen on a phone outside",
    ],
    faqs: [
      {
        question: "Will a roofing website rank on Google by itself?",
        answer:
          "A well-structured site gives you a page that can be indexed. Ranking depends on competition in your area, your Google Business Profile, and time. We set up the on-page foundations. We do not promise a position.",
      },
      {
        question: "How fast is the free draft?",
        answer:
          "We aim to send a private preview link within 24 hours of a complete enquiry. You only pay if you want the finished website.",
      },
    ],
  },
  {
    slug: "painter-websites",
    trade: "painter",
    navLabel: "Painters",
    blurb: "Interiors, exteriors and roof painting.",
    title: "Painter website design in New Zealand",
    description:
      "Websites for New Zealand painters. Get a free draft within 24 hours that shows interior and exterior work and makes it easy to request a quote.",
    h1: "Websites for painters",
    intro:
      "Painting is a visual trade. Customers want to see tidy prep and finished rooms or exteriors, and they want to know whether you do interiors, exteriors, or both. The site should read clearly on a phone and make the next step a call or a short quote request.",
    customersLookFor: [
      "Interior and exterior work described separately",
      "Before-and-after photos when you have them",
      "The suburbs you paint in",
      "A simple way to ask for a quote",
    ],
    includeOnSite: [
      "Pages that match the jobs you want, such as house exteriors or interior repaints",
      "A gallery that can start small",
      "Click-to-call plus a form",
      "A note on how quotes work, so people know you will visit or ask for photos",
    ],
    faqs: [
      {
        question: "Can the draft use my brand colours?",
        answer:
          "Yes. Add preferred colours on the form, and a logo if you have one. The preview uses those details so it does not look like a generic template with your name pasted on.",
      },
      {
        question: "Do I have to buy the draft?",
        answer:
          "No. The draft is free. If it is not right, you do not pay.",
      },
    ],
  },
  {
    slug: "landscaper-websites",
    trade: "landscaper",
    navLabel: "Landscapers",
    blurb: "Landscape builds, retaining and maintenance.",
    title: "Landscaper website design in New Zealand",
    description:
      "Websites for New Zealand landscapers. See a free draft within 24 hours, with services, project photos, and a clear quote path.",
    h1: "Websites for landscapers",
    intro:
      "Landscaping covers a wide range of work, from lawns and planting to paving, retaining, and drainage. A good site says which of those you do, shows the standard of the finish, and tells people the area you cover.",
    customersLookFor: [
      "Whether you design, build, maintain, or all three",
      "Photos of gardens, retaining, and paving you have finished",
      "The city or district you work in",
      "A form that can take a short description of the section",
    ],
    includeOnSite: [
      "Service pages for the offers you want to grow, not one page that lists everything",
      "Project photos with a line of context",
      "Service area and a contact form",
      "A home page that states the kind of landscaping you do in the first screen",
    ],
    portfolioSlug: "landscaper",
    faqs: [
      {
        question: "I do both maintenance and new landscaping. Can the site cover both?",
        answer:
          "Yes. Those are different jobs for a customer. The Professional and Premium tiers include separate service pages so each offer has room to be explained.",
      },
      {
        question: "Do you work outside the main centres?",
        answer:
          "Yes. The process is online, so we can prepare a draft for a trade business anywhere in New Zealand.",
      },
    ],
  },
];

export function getTradePage(slug: string) {
  return tradePages.find((trade) => trade.slug === slug);
}

export function tradeLabel(value: string) {
  return tradeOptions.find((trade) => trade.value === value)?.label ?? value;
}
