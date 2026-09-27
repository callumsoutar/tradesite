import Link from "next/link";
import { notFound } from "next/navigation";

import { saveEnquiry, sendDraft, sendFollowUp } from "@/app/actions/admin";
import { CopyLink } from "@/components/admin/copy-link";
import { ENQUIRY_STATUSES, previewFromEnquiry, statusLabels } from "@/lib/enquiries/types";
import { getEnquiry } from "@/lib/enquiries/queries";
import { absoluteUrl } from "@/lib/site";
import { createServiceClient } from "@/lib/supabase/service";
import { tradeLabel } from "@/lib/trades";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; sent?: string; followup?: string; error?: string }>;
};

const inputClass = "mt-1 block w-full border border-neutral-400 px-3 py-2 text-base";

export default async function EnquiryDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const query = await searchParams;
  const result = await getEnquiry(id);
  if (!result.configured) {
    return <p>Supabase is not configured.</p>;
  }
  if (!result.enquiry) notFound();

  const enquiry = result.enquiry;
  const preview = previewFromEnquiry(enquiry);
  const supabase = createServiceClient();
  const assets = supabase
    ? await Promise.all(
        result.assets.map(async (asset) => {
          const signed = await supabase.storage
            .from("enquiry-assets")
            .createSignedUrl(asset.storage_path, 60 * 60);
          return { ...asset, url: signed.data?.signedUrl ?? null };
        }),
      )
    : [];

  const previewUrl = enquiry.preview_slug ? absoluteUrl(`/preview/${enquiry.preview_slug}`) : null;

  return (
    <>
      <p>
        <Link href="/admin/enquiries">All enquiries</Link>
      </p>
      <h1 className="mt-4 text-2xl font-semibold">{enquiry.business_name}</h1>
      <p className="mt-2">
        {enquiry.name} · <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a> · {enquiry.phone}
      </p>
      <p className="mt-2">
        {tradeLabel(enquiry.trade)} in {enquiry.location}
        {enquiry.existing_website ? ` · ${enquiry.existing_website}` : ""}
      </p>
      <p className="mt-2">Received {new Date(enquiry.created_at).toLocaleString("en-NZ")}</p>

      {query.saved ? <p className="mt-4">Saved.</p> : null}
      {query.sent ? <p className="mt-4">Draft email sent.</p> : null}
      {query.followup ? <p className="mt-4">Follow-up sent.</p> : null}
      {query.error === "email" ? (
        <p className="mt-4">The email did not send. Check Resend, then try again.</p>
      ) : null}
      {query.error === "save" ? <p className="mt-4">The enquiry could not be saved.</p> : null}
      {query.error === "followup" ? <p className="mt-4">A follow-up has already been sent.</p> : null}

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Customer brief</h2>
        <p className="mt-2 whitespace-pre-wrap">{enquiry.description}</p>
        <p className="mt-2 whitespace-pre-wrap">Services: {enquiry.services}</p>
        {enquiry.preferred_colours ? <p className="mt-2">Colours: {enquiry.preferred_colours}</p> : null}
        {enquiry.additional_information ? (
          <p className="mt-2 whitespace-pre-wrap">{enquiry.additional_information}</p>
        ) : null}
      </section>

      {assets.length > 0 ? (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Files</h2>
          <ul className="mt-2 space-y-2">
            {assets.map((asset) => (
              <li key={asset.id}>
                {asset.url ? (
                  <a href={asset.url}>
                    {asset.kind} ({asset.id.slice(0, 8)})
                  </a>
                ) : (
                  asset.kind
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <form className="mt-8 space-y-4">
        <input type="hidden" name="id" value={enquiry.id} />
        <div>
          <label htmlFor="status" className="font-medium">
            Status
          </label>
          <select id="status" name="status" defaultValue={enquiry.status} className={inputClass}>
            {ENQUIRY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="purchased" value="yes" defaultChecked={enquiry.purchased} />
          Customer has purchased a website
        </label>
        <div>
          <label htmlFor="internalNotes" className="font-medium">
            Internal notes
          </label>
          <textarea
            id="internalNotes"
            name="internalNotes"
            rows={4}
            defaultValue={enquiry.internal_notes}
            className={inputClass}
          />
        </div>

        <h2 className="pt-4 text-xl font-semibold">Preview content</h2>
        <p>Fill this in, save, then email the private link. Checklist: content filled, photos placed, link sent.</p>
        <Field label="Business name" name="businessName" defaultValue={preview.businessName} />
        <Field label="Trade label" name="tradeLabel" defaultValue={preview.tradeLabel} />
        <Field label="Headline" name="headline" defaultValue={preview.headline} />
        <div>
          <label htmlFor="about" className="font-medium">
            About
          </label>
          <textarea id="about" name="about" rows={5} defaultValue={preview.about} className={inputClass} />
        </div>
        <div>
          <label htmlFor="previewServices" className="font-medium">
            Services, one per line
          </label>
          <textarea
            id="previewServices"
            name="services"
            rows={5}
            defaultValue={preview.services.join("\n")}
            className={inputClass}
          />
        </div>
        <Field label="Phone" name="phone" defaultValue={preview.phone} />
        <Field label="Email" name="email" defaultValue={preview.email} />
        <Field label="Service area" name="serviceArea" defaultValue={preview.serviceArea} />
        <Field label="Location" name="location" defaultValue={preview.location} />
        <Field label="Accent colour (#112233)" name="colour" defaultValue={preview.colour} />

        <div className="flex flex-wrap gap-3 pt-2">
          <button formAction={saveEnquiry} className="border border-neutral-950 px-3 py-2">
            Save
          </button>
          <button formAction={sendDraft} className="border border-neutral-950 bg-neutral-950 px-3 py-2 text-white">
            Email draft to customer
          </button>
          <button
            formAction={sendFollowUp}
            className="border border-neutral-950 px-3 py-2"
            disabled={Boolean(enquiry.follow_up_sent_at)}
          >
            {enquiry.follow_up_sent_at ? "Follow-up already sent" : "Send follow-up"}
          </button>
        </div>
      </form>

      {previewUrl ? (
        <div className="mt-6">
          <p>
            Preview: <a href={previewUrl}>{previewUrl}</a>
          </p>
          <CopyLink url={previewUrl} />
          {enquiry.draft_sent_at ? (
            <p>Draft emailed {new Date(enquiry.draft_sent_at).toLocaleString("en-NZ")}.</p>
          ) : null}
          {enquiry.follow_up_sent_at ? (
            <p>Follow-up emailed {new Date(enquiry.follow_up_sent_at).toLocaleString("en-NZ")}.</p>
          ) : null}
        </div>
      ) : (
        <p className="mt-6">Save the preview to create the private link.</p>
      )}
    </>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input id={name} name={name} defaultValue={defaultValue} className={inputClass} />
    </div>
  );
}
