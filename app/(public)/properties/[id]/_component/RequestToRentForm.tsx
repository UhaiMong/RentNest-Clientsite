"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRentalAction } from "@/app/(dashboard)/tenant-dashboard/_actions/rentalActions";

export default function RequestToRentForm({
  propertyId,
}: {
  propertyId: string;
}) {
  const action = createRentalAction.bind(null, propertyId);
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="mt-6 space-y-3 rounded-lg border p-4">
      <p className="font-semibold">Request to rent this property</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="py-1.5 text-sm font-semibold" htmlFor="moveInDate">
            Move In:
          </Label>
          <Input
            className="text-sm font-semibold"
            id="moveInDate"
            name="moveInDate"
            type="date"
            required
          />
        </div>
        <div className="space-y-1">
          <Label className="py-1.5 text-sm font-semibold" htmlFor="message">
            Message (optional):
          </Label>
          <Input
            className="text-sm"
            placeholder="I want to move as soon as possible"
            id="message"
            name="message"
            type="text"
          />
        </div>
      </div>

      <Button
        className={
          "font-semibold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
        }
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Sending request..." : "Request to Rent"}
      </Button>
    </form>
  );
}
