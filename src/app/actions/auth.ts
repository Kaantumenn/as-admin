"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginAdmin } from "@/lib/api/auth";
import { TOKEN_COOKIE } from "@/lib/auth";

export async function login(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    const { accessToken } = await loginAdmin(username, password);
    const cookieStore = await cookies();

    cookieStore.set(TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : "Giriş başarısız. Tekrar deneyin.",
    };
  }

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  redirect("/login");
}
