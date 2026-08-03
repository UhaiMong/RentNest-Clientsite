"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { payForRentalAction } from "../../_actions/paymentActions";
import { Button } from "@/components/ui/button";

export default function PayButton({
  rentalRequestId,
}: {
  rentalRequestId: string;
}) {
  const action = payForRentalAction.bind(null, rentalRequestId);
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success && state.url) {
      toast.success(state.message);
      window.location.href = state.url; // send the browser to Stripe Checkout
    } else if (!state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button
        className="text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-800 cursor-pointer"
        type="submit"
        size="sm"
        disabled={isPending}
      >
        {isPending ? "Redirecting..." : "Pay Now"}
      </Button>
    </form>
  );
}
