"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createReviewAction } from "@/app/(dashboard)/tenant-dashboard/_actions/reviewActions";

export default function ReviewForm({ propertyId }: { propertyId: string }) {
  const action = createReviewAction.bind(null, propertyId);
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="mt-4 space-y-3 rounded-lg border p-4">
      <p className="font-semibold">Leave a review</p>

      <div className="space-y-1">
        <Label className="text-sm font-semibold py-1.5" htmlFor="rating">
          Rating (1-5)
        </Label>
        <select
          id="rating"
          name="rating"
          required
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-semibold py-1.5" htmlFor="comment">
          Comment
        </Label>
        <textarea
          id="comment"
          name="comment"
          required
          rows={3}
          placeholder="Parfect place for office"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />
      </div>

      <Button
        className="font-semibold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
