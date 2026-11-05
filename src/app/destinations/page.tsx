import { Suspense } from "react";
import { Playfair_Display } from "next/font/google";

import {
  DestinationsExplorer,
} from "@/components/destinations-explorer";
import type { Destination } from "@/components/destination-card";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});


// Always fetch destinations at request time — otherwise `next build` bakes in
// whatever the API returned at build time (an empty list if the backend is down).
export const dynamic = "force-dynamic";

async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    // Backend not reachable — render an empty state instead of crashing.
    return [];
  }
}

async function DestinationsList() {
  const destinations = await getDestinations();
  return <DestinationsExplorer destinations={destinations} />;
}

function CardGridFallback() {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-16/13 animate-pulse rounded-lg border border-gray-200 bg-gray-100"
        />
      ))}
    </div>
  );
}

export default function DestinationPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16">
      <h1
        className={`${headingFont.className} text-4xl font-bold text-gray-900 md:text-5xl`}
      >
        Explore All Destinations
      </h1>
      <p className="mt-3 text-sm text-gray-500">
        Find your perfect travel experience from our curated collection
      </p>

      <div className="mt-10">
        <Suspense fallback={<CardGridFallback />}>
          <DestinationsList />
        </Suspense>
      </div>
    </main>
  );
}
