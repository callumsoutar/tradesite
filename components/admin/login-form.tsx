"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createBrowserSupabase } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const supabase = createBrowserSupabase();

    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }

    setPending(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);

    if (signInError) {
      setError("Those details were not accepted.");
      return;
    }

    router.push("/admin/enquiries");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error ? (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="username" className="mt-1 w-full border px-3 py-2 text-base" />
      </div>
      <div>
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="mt-1 w-full border px-3 py-2 text-base" />
      </div>
      <button type="submit" disabled={pending} className="border border-neutral-950 bg-neutral-950 px-4 py-2 text-white">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
