"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TOKEN_COOKIE } from "@/lib/auth";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  redirect("/login");
}
