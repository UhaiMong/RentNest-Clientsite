import Link from "next/link";

import PropertyCard from "@/components/public/property-card";
import { Button } from "@/components/ui/button";
import { getProperties } from "../services/property-action";
import { Property } from "@/lib/types";

export default async function HomePage() {
  const data = await getProperties({ limit: "4", page: "1" });
  const properties: Property[] = Array.isArray(data)
    ? data
    : ((data as { data?: Property[] })?.data ?? []);
  console.log(properties);

  return (
    <div>
      <section className="border-b bg-muted/30 px-4 py-10 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Find your next home with RentNest
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Browse verified rental listings, filter by location, price, and
          amenities.
        </p>
        <Link href="/properties">
          <Button
            className="bg-emerald-600 text-white hover:bg-emerald-800 cursor-pointer mt-6"
            size="lg"
          >
            Browse Properties
          </Button>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Listings</h2>
          <Link
            href="/properties"
            className="text-sm font-medium text-primary underline"
          >
            View all
          </Link>
        </div>

        {properties.length === 0 ? (
          <p className="text-muted-foreground">
            No properties available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
