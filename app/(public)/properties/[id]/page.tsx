import Image from "next/image";

import {
  Bath,
  Bed,
  Briefcase,
  Building,
  CheckCircle2,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { getPropertyById } from "@/app/services/property-action";
import { getMeAction } from "@/app/(auth)/_actions/authActions";
import RequestToRentForm from "./_component/RequestToRentForm";
import PropertyReviews from "./_component/PropertyReviews";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  const user = await getMeAction();
  const images = property?.images || [];
  const hasMultipleImages = images.length > 1;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* HEADER SECTION */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {property.category?.propertyType && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <Building className="size-3" />
                {property.category.propertyType.replace("_", " ")}
              </span>
            )}
            {property.category?.usageType && (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                <Briefcase className="size-3" />
                {property.category.usageType.replace("_", " ")}
              </span>
            )}
            {property.isAvailable ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                <CheckCircle2 className="size-3" /> Available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
                <XCircle className="size-3" /> Rented out
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {property.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-4" /> {property.location}
          </p>
        </div>
      </div>

      {/* IMAGE GALLERY */}
      <div
        className={`grid h-100 gap-2 md:h-125 ${hasMultipleImages ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1"}`}
      >
        {/* Main Image */}
        <div
          className={`relative overflow-hidden rounded-xl bg-muted ${hasMultipleImages ? "md:col-span-3" : "col-span-1"}`}
        >
          {images[0] ? (
            <Image
              src={images[0]}
              alt={`${property.title} - Main Image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
              priority
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        {/* Thumbnails (Only renders if more than 1 image exists) */}
        {hasMultipleImages && (
          <div className="hidden grid-rows-2 gap-2 md:grid">
            {images.slice(1, 3).map((img, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={img}
                  alt={`${property.title} - Image ${index + 2}`}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                {index === 1 && images.length > 3 && (
                  <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 text-lg font-medium text-white transition-colors hover:bg-black/60">
                    +{images.length - 3} more
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT COLUMN: Details */}
        <div className="lg:col-span-2">
          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-6 rounded-lg border bg-card p-4 shadow-sm">
            {property.bedrooms != null && (
              <div className="flex items-center gap-2">
                <Bed className="size-5 text-muted-foreground" />
                <span className="font-medium">
                  {property.bedrooms} Bedrooms
                </span>
              </div>
            )}
            {property.bathrooms != null && (
              <div className="flex items-center gap-2">
                <Bath className="size-5 text-muted-foreground" />
                <span className="font-medium">
                  {property.bathrooms} Bathrooms
                </span>
              </div>
            )}
            {property.sizeSqFt != null && (
              <div className="flex items-center gap-2">
                <Maximize2 className="size-5 text-muted-foreground" />
                <span className="font-medium">{property.sizeSqFt} Sq Ft</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">About this property</h2>
            <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
              {property.description || "No description provided."}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border bg-secondary/50 px-4 py-1.5 text-sm font-medium capitalize text-secondary-foreground"
                  >
                    {amenity.replace("_", " ")}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Landlord Info */}
          {property.landlord && (
            <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Hosted by</h2>
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="size-7" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    {property.landlord.name}
                  </h3>
                  <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <a
                      href={`mailto:${property.landlord.email}`}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground"
                    >
                      <Mail className="size-4" /> {property.landlord.email}
                    </a>
                    {property.landlord.phone && (
                      <a
                        href={`tel:${property.landlord.phone}`}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground"
                      >
                        <Phone className="size-4" /> {property.landlord.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="mt-10 pt-8 border-t">
            <PropertyReviews propertyId={property.id} />
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Action Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 rounded-xl border bg-card p-6 shadow-md">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Rent price</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight">
                  ৳{property.price.toLocaleString()}
                </span>
                <span className="text-muted-foreground">/ month</span>
              </div>
            </div>

            {user?.role === "TENANT" ? (
              property.isAvailable ? (
                <div className="mt-4">
                  <RequestToRentForm propertyId={property.id} />
                </div>
              ) : (
                <div className="w-full rounded-lg bg-secondary p-4 text-center font-medium text-secondary-foreground">
                  Currently Unavailable
                </div>
              )
            ) : (
              <div className="w-full rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/50 dark:text-blue-200">
                Sign in as a tenant to request this property.
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              Listed on: {new Date(property.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
