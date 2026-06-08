import { api } from "@/config/api";
import { apiRequest } from "@/lib/api/client";
import type { Gemi, GemiForm } from "@/types/gemi";

export async function getGemiler() {
  return apiRequest<Gemi[]>(api.gemi.list);
}

export async function getGemiDetay(id: number) {
  return apiRequest<Gemi>(api.gemi.detail(id));
}

export async function createGemi(data: GemiForm) {
  return apiRequest<Gemi>(api.gemi.create, { method: "POST", body: data });
}

export async function updateGemi(id: number, data: Partial<GemiForm>) {
  return apiRequest<Gemi>(api.gemi.update(id), { method: "PATCH", body: data });
}

export async function deleteGemi(id: number) {
  return apiRequest<void>(api.gemi.delete(id), { method: "DELETE" });
}
