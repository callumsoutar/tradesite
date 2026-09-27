import Link from "next/link";

import { signOut } from "@/app/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { privateMetadata } from "@/lib/seo";

export const metadata = privateMetadata;
export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { email } = await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-300 pb-4">
        <p>
          Signed in as {email}. <Link href="/admin/enquiries">Enquiries</Link>
        </p>
        <form action={signOut}>
          <button type="submit" className="underline">
            Sign out
          </button>
        </form>
      </div>
      <div className="py-6">{children}</div>
    </div>
  );
}
