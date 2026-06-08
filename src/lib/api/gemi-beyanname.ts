import { api } from "@/config/api";
import { apiRequest } from "@/lib/api/client";
import { getGemiDetay } from "@/lib/api/gemi";
import type { Gemi } from "@/types/gemi";

export async function getShipBeyannames(shipId: number) {
  const ship = await getGemiDetay(shipId);
  return ship.beyannames;
}

export async function addShipBeyanname(shipId: number, beyanname: string) {
  return apiRequest<Gemi>(api.gemi.beyannames.add(shipId), {
    method: "POST",
    body: { beyanname },
  });
}

export async function updateShipBeyannames(
  shipId: number,
  beyannames: string[],
) {
  return apiRequest<Gemi>(api.gemi.beyannames.update(shipId), {
    method: "PUT",
    body: { beyannames },
  });
}

export async function deleteShipBeyanname(shipId: number, beyannameNo: string) {
  return apiRequest<{ success: boolean; deletedCount: number }>(
    api.gemi.beyannames.delete(shipId, beyannameNo),
    { method: "DELETE" },
  );
}
