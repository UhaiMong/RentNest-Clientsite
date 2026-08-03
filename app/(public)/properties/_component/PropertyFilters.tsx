"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AMENITY_OPTIONS = [
  "parking",
  "wifi",
  "pool",
  "gym",
  "furnished",
  "balcony",
];

export default function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [amenities, setAmenities] = useState<string[]>(
    searchParams.getAll("amenities"),
  );

  function applyFilters(next: {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    amenities?: string[];
  }) {
    const params = new URLSearchParams();

    const loc = next.location ?? location;
    const min = next.minPrice ?? minPrice;
    const max = next.maxPrice ?? maxPrice;
    const am = next.amenities ?? amenities;

    if (loc) params.set("location", loc);
    if (min) params.set("minPrice", min);
    if (max) params.set("maxPrice", max);
    am.forEach((a) => params.append("amenities", a));
    params.set("page", "1"); // reset to page 1 on any filter change
    params.set("limit", "10");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function toggleAmenity(value: string) {
    const next = amenities.includes(value)
      ? amenities.filter((a) => a !== value)
      : [...amenities, value];
    setAmenities(next);
    applyFilters({ amenities: next });
  }

  return (
    <aside className="w-full shrink-0 space-y-6 md:w-64">
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={() => applyFilters({})}
          onKeyDown={(e) => e.key === "Enter" && applyFilters({})}
          placeholder="e.g. dhaka"
        />
      </div>

      <div className="space-y-2">
        <Label>Price range</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={() => applyFilters({})}
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={() => applyFilters({})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="flex flex-col gap-2">
          {AMENITY_OPTIONS.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={amenities.includes(a)}
                onChange={() => toggleAmenity(a)}
              />
              {a}
            </label>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setLocation("");
          setMinPrice("");
          setMaxPrice("");
          setAmenities([]);
          router.push(pathname);
        }}
      >
        Clear filters
      </Button>

      {isPending && (
        <p className="text-xs text-muted-foreground">Updating results...</p>
      )}
    </aside>
  );
}
