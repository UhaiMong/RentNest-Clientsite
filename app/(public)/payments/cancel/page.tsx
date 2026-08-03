import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <XCircle className="size-14 text-red-600" />
      <h1 className="mt-4 text-2xl font-semibold">Payment cancelled</h1>
      <p className="mt-2 text-muted-foreground">
        No charge was made. You can try again anytime.
      </p>
      <Link href="/tenant-dashboard/rentals">
        <Button className="mt-6">Back to My Rentals</Button>
      </Link>
    </div>
  );
}
