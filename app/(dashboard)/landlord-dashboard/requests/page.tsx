import { Button } from "@/components/ui/button";
import {
  getLandlordRequests,
  updateRequestStatusAction,
} from "../_actions/requestActions";

export default async function LandlordRequestsPage() {
  const requests = await getLandlordRequests();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Rental Requests</h1>

      {requests.length === 0 ? (
        <p className="text-muted-foreground">No rental requests yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="rounded-lg border p-4">
              <p className="font-semibold">{r.property.title}</p>
              <p className="text-sm text-muted-foreground">
                Requested by {r.tenant?.name} ({r.tenant?.email})
              </p>
              <p className="mt-1 text-sm">
                Status: <span className="font-medium">{r.status}</span>
              </p>

              {r.status === "PENDING" && (
                <div className="mt-3 flex gap-2">
                  <form
                    action={updateRequestStatusAction.bind(
                      null,
                      r.id,
                      "APPROVED",
                    )}
                  >
                    <Button type="submit" size="sm">
                      Approve
                    </Button>
                  </form>
                  <form
                    action={updateRequestStatusAction.bind(
                      null,
                      r.id,
                      "REJECTED",
                    )}
                  >
                    <Button type="submit" size="sm" variant="destructive">
                      Reject
                    </Button>
                  </form>
                  <form
                    action={updateRequestStatusAction.bind(
                      null,
                      r.id,
                      "CANCELLED",
                    )}
                  >
                    <Button type="submit" size="sm" variant="destructive">
                      Cancel
                    </Button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
