"use server";

import { revalidatePath } from "next/cache";
import type { Rental } from "@/lib/types";
import { apiFetch } from "@/app/services/api";

type ActionState = { success: boolean; message: string } | null;

export async function createRentalAction(
  propertyId: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = {
    propertyId,
    moveInDate: formData.get("moveInDate"),
    message: formData.get("message") || "",
  };

  try {
    await apiFetch("/rentals/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    revalidatePath("/tenant-dashboard/rentals");
    return { success: true, message: "Rental request sent to the landlord" };
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "Failed to send rental request",
    };
  }
}

export async function getMyRentals() {
  const result = await apiFetch<{ data: Rental[] }>("/rentals", {
    method: "GET",
  });
  return result.data;
}
