import { getApiBaseUrl } from "@/lib/api/get-base-url";

export const api = {
  get baseUrl() {
    return getApiBaseUrl();
  },

  auth: {
    login: "/auth/admin/login",
  },

  gemi: {
    list: "/ships/active",
    detail: (id: number) => `/ships/${id}`,
    create: "/ships",
    update: (id: number) => `/ships/${id}`,
    delete: (id: number) => `/ships/${id}`,
    beyannames: {
      update: (id: number) => `/ships/${id}/beyannames`,
      add: (id: number) => `/ships/${id}/beyannames`,
      delete: (id: number, no: string) =>
        `/ships/${id}/beyannames/${encodeURIComponent(no)}`,
    },
  },
} as const;

export function apiUrl(path: string) {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new Error(
      "API adresi tanımlı değil. API_URL veya NEXT_PUBLIC_API_URL ayarlayın.",
    );
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
}
