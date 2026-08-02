import { getMyReviews } from "../_actions/reviewActions";
import { Star } from "lucide-react";

export default async function TenantReviewsPage() {
  const reviews = await getMyReviews();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">My Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t left any reviews yet.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-lg border p-4">
              <p className="font-semibold">{r.property.title}</p>
              <div className="mt-1 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
