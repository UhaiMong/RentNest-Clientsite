"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PROPERTY_TYPES, USAGE_TYPES, type Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type ActionState = { success: boolean; message: string } | null;
type FormAction = (
  prevState: ActionState,
  formData: FormData,
) => Promise<ActionState>;

export default function CategoryForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: FormAction;
  defaultValues?: Pick<Category, "propertyType" | "usageType">;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
      router.push("/admin-dashboard/categories");
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="propertyType">Property Type</Label>
        <select
          id="propertyType"
          name="propertyType"
          required
          defaultValue={defaultValues?.propertyType ?? ""}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select property type
          </option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="usageType">Usage Type</Label>
        <select
          id="usageType"
          name="usageType"
          required
          defaultValue={defaultValues?.usageType ?? ""}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select usage type
          </option>
          {USAGE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <Button
        className="text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
