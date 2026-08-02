"use server";

import { revalidatePath } from "next/cache";
import type { Category } from "@/lib/types";
import { apiFetch } from "@/app/services/api";

type ActionState = { success: boolean; message: string } | null;

export async function getCategories() {
  const result = await apiFetch<{ data: Category[] }>("/categories/list", {
    method: "GET",
  });
  return result.data;
}

export async function createCategoryAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = {
    propertyType: formData.get("propertyType"),
    usageType: formData.get("usageType"),
  };

  try {
    await apiFetch("/categories/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    revalidatePath("/admin-dashboard/categories");
    return { success: true, message: "Category created" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to create category",
    };
  }
}

export async function updateCategoryAction(
  id: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = {
    propertyType: formData.get("propertyType"),
    usageType: formData.get("usageType"),
  };

  try {
    await apiFetch(`/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    revalidatePath("/admin-dashboard/categories");
    return { success: true, message: "Category updated" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to update category",
    };
  }
}

export async function deleteCategoryAction(id: string) {
  await apiFetch(`/categories/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/admin-dashboard/categories");
}
