import { api, apiUrl } from "@/config/api";
import type { LoginResponse } from "@/lib/auth";

export async function loginAdmin(username: string, password: string) {
  const res = await fetch(apiUrl(api.auth.login), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Kullanıcı adı veya şifre hatalı.");
  }

  return res.json() as Promise<LoginResponse>;
}
