import { LoginForm } from "@/components/admin/login-form";
import { privateMetadata } from "@/lib/seo";

export const metadata = privateMetadata;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Admin sign in</h1>
      {params.error === "config" ? (
        <p className="mt-4">
          Add the Supabase URL, publishable key, secret key, and ADMIN_EMAIL before signing in.
        </p>
      ) : (
        <p className="mt-4">This area is for the business operator.</p>
      )}
      <div className="mt-6">
        <LoginForm />
      </div>
    </main>
  );
}
