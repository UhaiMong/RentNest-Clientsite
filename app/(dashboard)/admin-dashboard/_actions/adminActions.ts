"use server";

import { revalidatePath } from "next/cache";
import type { User, Property, Rental, AdminStats } from "@/lib/types";
import { apiFetch } from "@/app/services/api";

export async function getAdminStats() {
  const result = await apiFetch<{ data: AdminStats }>("/admin/stats", {
    method: "GET",
  });
  return result.data;
}

export async function getAllUsers() {
  const result = await apiFetch<{ data: User[] }>("/admin/users", {
    method: "GET",
  });
  return result.data;
}

export async function getAllProperties() {
  const result = await apiFetch<{ data: Property[] }>("/admin/properties", {
    method: "GET",
  });
  return result.data;
}

export async function getAllRentals() {
  const result = await apiFetch<{ data: Rental[] }>("/admin/rentals", {
    method: "GET",
  });
  return result.data;
}

export async function deleteUserAction(id: string) {
  await apiFetch(`/admin/users/${id}`, { method: "DELETE" });
  revalidatePath("/admin-dashboard/users");
}
