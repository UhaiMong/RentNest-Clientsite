"use server";

import { revalidatePath } from "next/cache";

import type { Property, Category } from "@/lib/types";
import { apiFetch } from "@/app/services/api";

type ActionState = { success: boolean; message: string } | null;

export async function getLandlordProperties() {
  const result = await apiFetch<{ data: Property[] }>("/landlord/properties", {
    method: "GET",
  });
  return result.data;
}

export async function getCategories() {
  const result = await apiFetch<{ data: Category[] }>("/categories/list", {
    method: "GET",
  });
  return result.data;
}

export async function createPropertyAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const location = formData.get("location");
  const categoryId = formData.get("categoryId");
  const bedroomsRaw = formData.get("bedrooms");
  const bedrooms = bedroomsRaw ? Number(bedroomsRaw) : undefined;
  const bathroomsRaw = formData.get("bathrooms");
  const bathrooms = bathroomsRaw ? Number(bathroomsRaw) : undefined;
  const amenities = String(formData.get("amenities") || "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const images = String(formData.get("images") || "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const payload = {
    title,
    description,
    price,
    location,
    categoryId,
    bedrooms,
    bathrooms,
    amenities,
    images,
  };

  try {
    await apiFetch("/landlord/properties/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    revalidatePath("/landlord-dashboard/properties");
    return { success: true, message: "Property created successfully" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to create property",
    };
  }
}

export async function deletePropertyAction(id: string) {
  await apiFetch(`/landlord/properties/${id}/delete`, { method: "DELETE" });
  revalidatePath("/landlord-dashboard/properties");
}

export async function toggleAvailabilityAction(id: string) {
  await apiFetch(`/landlord/properties/${id}/toggle-availability`, {
    method: "PATCH",
  });
  revalidatePath("/landlord-dashboard/properties");
}
