import Link from "next/link";

import { listEnquiries } from "@/lib/enquiries/queries";
import { statusLabels } from "@/lib/enquiries/types";
import { tradeLabel } from "@/lib/trades";

export default async function EnquiriesPage() {
  const { configured, enquiries } = await listEnquiries();

  return (
    <>
      <h1 className="text-2xl font-semibold">Enquiries</h1>
      {!configured ? (
        <p className="mt-4">
          Supabase is not configured. Add the URL and secret key, then apply the migration in
          supabase/migrations.
        </p>
      ) : null}
      {configured && enquiries.length === 0 ? <p className="mt-4">No enquiries yet.</p> : null}
      {enquiries.length > 0 ? (
        <table className="mt-6 w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border-b py-2 pr-3">Business</th>
              <th className="border-b py-2 pr-3">Trade</th>
              <th className="border-b py-2 pr-3">Location</th>
              <th className="border-b py-2 pr-3">Status</th>
              <th className="border-b py-2">Received</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td className="border-b py-2 pr-3">
                  <Link href={`/admin/enquiries/${enquiry.id}`}>{enquiry.business_name}</Link>
                </td>
                <td className="border-b py-2 pr-3">{tradeLabel(enquiry.trade)}</td>
                <td className="border-b py-2 pr-3">{enquiry.location}</td>
                <td className="border-b py-2 pr-3">{statusLabels[enquiry.status]}</td>
                <td className="border-b py-2">
                  {new Date(enquiry.created_at).toLocaleString("en-NZ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
}
