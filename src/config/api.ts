const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

export const api = {
  baseUrl,

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
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL tanımlı değil.");
  }
  return `${baseUrl.replace(/\/$/, "")}${path}`;
}
