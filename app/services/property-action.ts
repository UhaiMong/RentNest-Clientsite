"use server";

import { Category, Property } from "@/lib/types";
import { apiFetch } from "./api";

export async function getProperties(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (!value) continue;
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
    else params.append(key, value);
  }

  const queryString = params.toString();
  // Pass query parameters if available
  const endpoint = queryString ? `properties?${queryString}` : `properties`;

  const result = await apiFetch<{ data: Property[] }>(endpoint, {
    method: "GET",
  });

  return result.data;
}

export async function getPropertyById(id: string) {
  const result = await apiFetch<{ data: Property }>(`properties/${id}`, {
    method: "GET",
  });
  return result.data;
}

export async function getCategories() {
  const result = await apiFetch<{ data: Category[] }>(`/categories/list`, {
    method: "GET",
  });
  return result.data;
}
