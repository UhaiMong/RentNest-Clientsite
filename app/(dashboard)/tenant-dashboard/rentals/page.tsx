import { getMyRentals } from "../_actions/rentalActions";
import PayButton from "./_component/PayButton";

export default async function TenantRentalsPage() {
  const rentals = await getMyRentals();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">My Rentals</h1>

      {rentals.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t requested any rentals yet.
        </p>
      ) : (
        <div className="space-y-4">
          {rentals.map((r) => (
            <div key={r.id} className="rounded-lg border p-4">
              <p className="font-semibold">{r.property.title}</p>
              <p className="text-sm text-muted-foreground">
                {r.property.location}
              </p>
              <p className="mt-1 text-sm">
                Status: <span className="font-medium">{r.status}</span>
              </p>

              {r.status === "APPROVED" && (
                <div className="mt-3">
                  <PayButton rentalRequestId={r.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
