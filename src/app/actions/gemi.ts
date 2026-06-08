"use server";

import { api } from "@/config/api";
import { serverApiRequest } from "@/lib/api/server-client";

export async function deleteGemiWithPassword(id: number, password: string) {
  const confirmPassword = process.env.DELETE_CONFIRM_PASSWORD;

  if (!confirmPassword || password !== confirmPassword) {
    return { error: "Onay şifresi hatalı." };
  }

  try {
    await serverApiRequest<void>(api.gemi.delete(id), { method: "DELETE" });
    return { success: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Silme başarısız.",
    };
  }
}
