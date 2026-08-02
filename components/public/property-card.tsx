import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Bath } from "lucide-react";
import type { Property } from "@/lib/types";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="block overflow-hidden rounded-lg border transition hover:shadow-md"
    >
      <div className="relative h-48 w-full bg-muted">
        {property.images?.[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-semibold">{property.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4" /> {property.location}
        </p>

        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble className="size-4" /> {property.bedrooms}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="size-4" /> {property.bathrooms}
            </span>
          )}
        </div>

        <p className="mt-3 font-semibold">৳ {property.price} / month</p>
      </div>
    </Link>
  );
}
