import "server-only";

import { redirect } from "next/navigation";

import { createAuthClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const supabase = await createAuthClient();

  if (!supabase || !adminEmail) {
    redirect("/admin/login?error=config");
  }

  const { data, error } = await supabase.auth.getClaims();
  const email = data?.claims.email?.toLowerCase();

  if (error || !email || email !== adminEmail) {
    redirect("/admin/login");
  }

  return { email, supabase };
}
