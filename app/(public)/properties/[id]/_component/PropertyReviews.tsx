import { getCurrentUser } from "@/lib/session";
import { Star } from "lucide-react";
import { getPropertyReviews } from "@/app/(dashboard)/tenant-dashboard/_actions/reviewActions";
import ReviewForm from "./ReviewForm";

export default async function PropertyReviews({
  propertyId,
}: {
  propertyId: string;
}) {
  const [reviews, user] = await Promise.all([
    getPropertyReviews(propertyId),
    getCurrentUser(),
  ]);

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-lg border p-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm font-medium">{r.user?.name}</p>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      {user?.role === "TENANT" && <ReviewForm propertyId={propertyId} />}
    </div>
  );
}
