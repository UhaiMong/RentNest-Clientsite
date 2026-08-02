"use server";

import { revalidatePath } from "next/cache";

import type { Review } from "@/lib/types";
import { apiFetch } from "@/app/services/api";

type ActionState = { success: boolean; message: string } | null;

export async function createReviewAction(
  propertyId: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = {
    propertyId,
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
  };

  try {
    await apiFetch("/reviews/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    revalidatePath(`/properties/${propertyId}`);
    return { success: true, message: "Review submitted" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to submit review",
    };
  }
}

export async function getPropertyReviews(propertyId: string) {
  const result = await apiFetch<{ data: Review[] }>(
    `/reviews/property/${propertyId}`,
    {
      method: "GET",
    },
  );
  return result.data;
}

export async function getMyReviews() {
  const result = await apiFetch<{ data: Review[] }>("/reviews/mine", {
    method: "GET",
  });
  return result.data;
}
