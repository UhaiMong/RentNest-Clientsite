"use server";

import { revalidatePath } from "next/cache";
import type { Rental } from "@/lib/types";
import { apiFetch } from "@/app/services/api";

export async function getLandlordRequests() {
  const result = await apiFetch<{ data: Rental[] }>("/landlord/requests", {
    method: "GET",
  });
  return result.data;
}

export async function updateRequestStatusAction(
  id: string,
  status: "APPROVED" | "REJECTED" | "CANCELLED",
) {
  await apiFetch(`/landlord/requests/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  revalidatePath("/landlord-dashboard/requests");
}
