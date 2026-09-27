import { previewFromEnquiry, safeAccent, type EnquiryRow } from "@/lib/enquiries/types";
import { tradeLabel } from "@/lib/trades";

type Asset = { kind: "logo" | "photo"; url: string | null };

export function TradiePreview({
  enquiry,
  assets,
}: {
  enquiry: EnquiryRow;
  assets: Asset[];
}) {
  const content = previewFromEnquiry(enquiry);
  const accent = safeAccent(content.colour);
  const logo = assets.find((asset) => asset.kind === "logo" && asset.url);
  const photos = assets.filter((asset) => asset.kind === "photo" && asset.url);

  return (
    <article style={{ borderTop: `8px solid ${accent}` }}>
      <p className="bg-neutral-100 px-4 py-2 text-sm">Website draft. This page is not the finished site.</p>
      <header className="mx-auto max-w-3xl px-4 py-8">
        {logo?.url ? (
          // Signed URLs expire, so the image is not run through the optimiser cache.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo.url} alt={`${content.businessName} logo`} className="mb-4 h-16 w-auto" />
        ) : null}
        <p>{content.tradeLabel || tradeLabel(enquiry.trade)}</p>
        <h1 className="mt-2 text-3xl font-semibold">{content.businessName}</h1>
        <p className="mt-4 text-lg">{content.headline}</p>
        <p className="mt-4">
          <a href={`tel:${content.phone.replace(/\s/g, "")}`}>{content.phone}</a>
          {" · "}
          <a href={`mailto:${content.email}`}>{content.email}</a>
        </p>
        <p className="mt-2">{content.serviceArea}</p>
      </header>
      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-2xl font-semibold">About</h2>
        <p className="mt-3 whitespace-pre-wrap">{content.about}</p>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-2xl font-semibold">Services</h2>
        {content.services.length > 0 ? (
          <ul className="mt-3 list-disc pl-5">
            {content.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3">Services will be added to this draft.</p>
        )}
      </section>
      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-2xl font-semibold">Work</h2>
        {photos.length > 0 ? (
          <ul className="mt-3 space-y-4">
            {photos.map((photo) => (
              <li key={photo.url}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url ?? ""}
                  alt={`Work by ${content.businessName}`}
                  className="max-w-full"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3">Photos will appear here when they are added to the draft.</p>
        )}
      </section>
      <section className="mx-auto max-w-3xl px-4 py-8">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-3">{content.location}</p>
        <p className="mt-2">
          <a href={`tel:${content.phone.replace(/\s/g, "")}`}>Call {content.phone}</a>
        </p>
        <p className="mt-2">
          <a href={`mailto:${content.email}`}>Email {content.email}</a>
        </p>
      </section>
    </article>
  );
}
