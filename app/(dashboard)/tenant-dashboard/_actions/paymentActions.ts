"use server";

import { apiFetch } from "@/app/services/api";
// import { apiFetch } from "@/services/api";
import type { Payment } from "@/lib/types";

type PayState = { success: boolean; message: string; url?: string } | null;

export async function payForRentalAction(
  rentalRequestId: string,
  prevState: PayState,
): Promise<PayState> {
  try {
    const result = await apiFetch<{ data: { checkOutUrl: string } }>(
      "/payments/create",
      {
        method: "POST",
        body: JSON.stringify({ rentalRequestId }),
      },
    );
    return {
      success: true,
      message: "Redirecting to payment...",
      url: result.data.checkOutUrl,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to start payment",
    };
  }
}

export async function getMyPayments() {
  const result = await apiFetch<{ data: Payment[] }>("/payments", {
    method: "GET",
  });
  return result.data;
}

export async function getPaymentById(id: string) {
  const result = await apiFetch<{ data: Payment }>(`/payments/${id}`, {
    method: "GET",
  });
  return result.data;
}
