"use client";

import { useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DestinationCard, type Destination } from "@/components/destination-card";

const categoryOptions = [
  "All Categories",
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
];

const priceOptions = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "$1000 - $2000", min: 1000, max: 2000 },
  { label: "Over $2000", min: 2000, max: Infinity },
];

const sortOptions = [
  "Newest First",
  "Price: Low to High",
  "Price: High to Low",
];

export function DestinationsExplorer({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState("All Categories");
  const [price, setPrice] = useState("All Prices");
  const [sort, setSort] = useState("Newest First");

  const filtered = useMemo(() => {
    const priceRange =
      priceOptions.find((option) => option.label === price) ??
      priceOptions[0];

    const result = destinations.filter((destination) => {
      const matchesCategory =
        category === "All Categories" || destination.category === category;
      const value = Number(destination.price);
      const matchesPrice =
        !Number.isFinite(value) ||
        (value >= priceRange.min && value < priceRange.max);
      return matchesCategory && matchesPrice;
    });

    return [...result].sort((a, b) => {
      if (sort === "Price: Low to High") {
        return Number(a.price) - Number(b.price);
      }
      if (sort === "Price: High to Low") {
        return Number(b.price) - Number(a.price);
      }
      return b.departure.localeCompare(a.departure);
    });
  }, [destinations, category, price, sort]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Select value={category} onValueChange={(v) => setCategory(v ?? "All Categories")}>
          <SelectTrigger className="w-full uppercase">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={price} onValueChange={(v) => setPrice(v ?? "All Prices")}>
          <SelectTrigger className="w-full uppercase">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {priceOptions.map((option) => (
              <SelectItem key={option.label} value={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v ?? "Newest First")}>
          <SelectTrigger className="w-full uppercase">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Showing {filtered.length} destination{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 py-16 text-center text-sm text-gray-500">
          No destinations found. Try adjusting your filters.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </>
  );
}
