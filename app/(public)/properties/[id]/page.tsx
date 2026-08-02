import Image from "next/image";

import { MapPin } from "lucide-react";
import { getPropertyById } from "@/app/services/property-action";
import { getMeAction } from "@/app/(auth)/_actions/authActions";
import RequestToRentForm from "./_component/RequestToRentForm";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  const user = await getMeAction();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-muted">
        {property.images?.[0] && (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            className="object-cover"
          />
        )}
      </div>

      <h1 className="mt-6 text-2xl font-semibold">{property.title}</h1>
      <p className="mt-1 flex items-center gap-1 text-muted-foreground">
        <MapPin className="size-4" /> {property.location}
      </p>

      <p className="mt-4 text-xl font-semibold">৳ {property.price} / month</p>

      <p className="mt-4 text-muted-foreground">{property.description}</p>

      {property.amenities?.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 font-semibold">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((a: any) => (
              <span key={a} className="rounded-full border px-3 py-1 text-sm">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}
      {user?.role === "TENANT" && property.isAvailable && (
        <RequestToRentForm propertyId={property.id} />
      )}
    </div>
  );
}
