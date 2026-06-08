type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

async function getAccessToken() {
  const res = await fetch("/api/auth/token", { credentials: "include" });

  if (!res.ok) {
    throw new Error("Oturum bulunamadı.");
  }

  const data = (await res.json()) as { accessToken: string };
  return data.accessToken;
}

export async function apiRequest<T>(
  path: string,
  { method = "GET", body }: RequestOptions = {},
): Promise<T> {
  const token = await getAccessToken();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const res = await fetch(`/external-api${normalizedPath}`, {
    method,
    credentials: "include",
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
