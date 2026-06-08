import { cookies } from "next/headers";
import { apiUrl } from "@/config/api";
import { TOKEN_COOKIE } from "@/lib/auth";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

export async function serverApiRequest<T>(
  path: string,
  { method = "GET", body }: RequestOptions = {},
): Promise<T> {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;

  if (!token) {
    throw new Error("Oturum bulunamadı.");
  }

  const res = await fetch(apiUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `İstek başarısız (${res.status})`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
