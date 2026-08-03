import { getProperties } from "@/app/services/property-action";
import PropertyCard from "@/components/public/property-card";
import { Property } from "@/lib/types";
import PropertyFilters from "./_component/PropertyFilters";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const res = await getProperties(params);

  let properties: Property[] = [];
  let meta = { page: 1, totalPages: 1, total: 0 };

  if (Array.isArray(res)) {
    properties = res;
    meta.total = res.length;
  } else {
    properties = (res as any).data ?? [];
    meta = (res as any).meta ?? meta;
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <PropertyFilters />

      <div className="flex-1">
        <h1 className="mb-6 text-2xl font-semibold">Available Properties</h1>

        {properties.length === 0 ? (
          <p className="text-muted-foreground">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          Page {meta.page} of {meta.totalPages} — {meta.total} total
        </p>
      </div>
    </div>
  );
}
