export function getDirectApiUrl(): string {
  return (
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    ""
  );
}

export function getAppOrigin(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/** Sunucu tarafı istekler — Vercel uyumlu rewrite proxy üzerinden gider */
export function apiUrl(path: string): string {
  const direct = getDirectApiUrl();

  if (!direct) {
    throw new Error(
      "API adresi tanımlı değil. API_URL veya NEXT_PUBLIC_API_URL ayarlayın.",
    );
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getAppOrigin()}/external-api${normalizedPath}`;
}
