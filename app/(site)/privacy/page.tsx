import { PageHero } from "@/components/marketing/page-hero";
import { Container } from "@/components/marketing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `How ${site.name} collects and uses business details sent with a website draft request.`,
  path: "/privacy",
});

const sections = [
  {
    title: "What we collect",
    body: `${site.name} collects the details you submit so we can prepare a website draft and contact you about it. That includes your name, business name, email, phone, trade, location, and the description you write. A logo and photographs are optional and are used only to prepare the draft.`,
  },
  {
    title: "How it is stored",
    body: "Enquiry records and files are stored in a private database and file bucket. They are not published. A draft link is unlisted and marked so search engines should not index it. Access to the admin area is limited to the business operator.",
  },
  {
    title: "Analytics",
    body: "We do not sell this information. Analytics, if enabled, records page events such as a button click. It is not sent the contents of the form.",
  },
  {
    title: "Your rights",
    body: `To ask for a copy of your details, or to ask us to delete them, email ${site.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Privacy", item: absoluteUrl("/privacy") },
          ],
        }}
      />
      <PageHero crumbs={[{ label: "Privacy" }]} eyebrow="Privacy" title="How we handle your details." />
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
