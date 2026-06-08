import { getDirectApiUrl } from "@/lib/api/get-base-url";

export { apiUrl } from "@/lib/api/get-base-url";

export const api = {
  get baseUrl() {
    return getDirectApiUrl();
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
