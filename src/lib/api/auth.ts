import { api, apiUrl } from "@/config/api";
import type { LoginResponse } from "@/lib/auth";

export async function loginAdmin(username: string, password: string) {
  let res: Response;

  try {
    res = await fetch(apiUrl(api.auth.login), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "API sunucusuna bağlanılamadı. Dev ortamında API_URL tanımlı mı ve API erişilebilir mi kontrol edin.",
    );
  }

  if (!res.ok) {
    let message = "Kullanıcı adı veya şifre hatalı.";

    try {
      const data = JSON.parse(await res.text()) as { message?: string };
      if (data.message) message = data.message;
    } catch {
      // API düz metin döndürdüyse varsayılan mesajı kullan
    }

    throw new Error(message);
  }

  return res.json() as Promise<LoginResponse>;
}
