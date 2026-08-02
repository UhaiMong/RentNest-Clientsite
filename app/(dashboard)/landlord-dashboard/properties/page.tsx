import Link from "next/link";
import {
  getLandlordProperties,
  deletePropertyAction,
  toggleAvailabilityAction,
} from "../_actions/propertyActions";
import { Button } from "@/components/ui/button";

export default async function LandlordPropertiesPage() {
  const properties = await getLandlordProperties();

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Properties</h1>
        <Link href="/landlord-dashboard/properties/create">
          <Button>Add Property</Button>
        </Link>
      </div>

      {properties?.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t listed any properties yet.
        </p>
      ) : (
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-semibold">{property.title}</p>
                <p className="text-sm text-muted-foreground">
                  {property.location} — ${property.price}/mo
                </p>
                <p className="mt-1 text-xs">
                  Status:{" "}
                  <span
                    className={
                      property.isAvailable ? "text-green-600" : "text-red-600"
                    }
                  >
                    {property.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold">Amentities:</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a: any) => (
                    <span key={a} className="border px-1 py-1 text-sm">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold">Description:</h3>
                <div className="">
                  <span className="px-1 py-1 text-sm">
                    {property?.description.slice(0, 100)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <form action={toggleAvailabilityAction.bind(null, property.id)}>
                  <Button type="submit" size="sm" variant="outline">
                    {property.isAvailable
                      ? "Mark Unavailable"
                      : "Mark Available"}
                  </Button>
                </form>

                <form action={deletePropertyAction.bind(null, property.id)}>
                  <Button type="submit" size="sm" variant="destructive">
                    Delete
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
