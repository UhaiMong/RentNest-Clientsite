"use server";

import { revalidatePath } from "next/cache";
import type { Payment } from "@/lib/types";
import { apiFetch } from "@/app/services/api";

export async function payForRentalAction(rentalId: string) {
  await apiFetch("/payments/create", {
    method: "POST",
    body: JSON.stringify({ rentalId }),
  });
  revalidatePath("/tenant-dashboard/payments");
  revalidatePath("/tenant-dashboard/rentals");
}

export async function getMyPayments() {
  const result = await apiFetch<{ data: Payment[] }>("/payments", {
    method: "GET",
  });
  return result.data;
}
