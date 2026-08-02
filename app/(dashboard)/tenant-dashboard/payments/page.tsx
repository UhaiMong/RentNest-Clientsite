import { getMyPayments } from "../_actions/paymentActions";

export default async function TenantPaymentsPage() {
  const payments = await getMyPayments();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">My Payments</h1>

      {payments.length === 0 ? (
        <p className="text-muted-foreground">No payments yet.</p>
      ) : (
        <div className="space-y-4">
          {payments?.map((p) => (
            <div key={p.id} className="rounded-lg border p-4">
              <p className="font-semibold">{p.rental.property.title}</p>
              <p className="text-sm text-muted-foreground">
                Amount: ${p.amount}
              </p>
              <p className="mt-1 text-sm">
                Status: <span className="font-medium">{p.status}</span>
              </p>
              {p.transactionId && (
                <p className="text-xs text-muted-foreground">
                  Txn: {p.transactionId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
