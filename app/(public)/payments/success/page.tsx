import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <CheckCircle2 className="size-14 text-green-600" />
      <h1 className="mt-4 text-2xl font-semibold">Payment received</h1>
      <p className="mt-2 text-muted-foreground">
        Your payment is being confirmed. It may take a few seconds to reflect in
        your account.
      </p>
      <Link href="/tenant-dashboard/payments">
        <Button className="mt-6">View My Payments</Button>
      </Link>
    </div>
  );
}
