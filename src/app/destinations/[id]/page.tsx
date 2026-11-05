import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditDestination from "@/components/EditDestination";
import BookingCard from "@/components/booking/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
    ArrowLeft,
    CalendarDays,
    Check,
    MapPin,
    Star,
} from "lucide-react";
import { Playfair_Display } from "next/font/google";

import {
    formatDuration,
    titleCase,
    type Destination,
} from "@/components/destination-card";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";

const headingFont = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
});


// Fetch at request time so `next build` doesn't bake in API state.
export const dynamic = "force-dynamic";

const highlights = [
    "Luxury beachfront accommodation",
    "Visit Uluwatu Temple at sunset",
    "Traditional Balinese spa treatment",
    "Private beach dinner experience",
    "Sunrise trek to Mount Batur",
];

async function getDestination(
    id: string,
    jwtToken: { token: string } | null,
): Promise<Destination | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
            headers: {
                authorization: `Bearer ${jwtToken?.token}`,
            },
        });
        if (res.status === 404) return null;
        if (!res.ok) return null;
        const data = await res.json();
        return data && data._id ? data : null;
    } catch {
        // Backend unreachable — surface a 404 rather than crashing the render.
        return null;
    }
}

export default async function DestinationDetailsPage({
    params,
}: PageProps<"/destinations/[id]">) {
    const { id } = await params;

    // `getToken` throws `Unauthorized` when the session is missing or invalid —
    // without this guard an unauthenticated/expired session would 500 the page.
    let jwtToken: { token: string } | null = null;
    try {
        jwtToken = await auth.api.getToken({
            headers: await headers(),
        });
    } catch {
        jwtToken = null;
    }

    const destination = await getDestination(id, jwtToken);

    if (!destination) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    href="/destinations"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                    <ArrowLeft className="size-4" />
                    Back to Destinations
                </Link>
                <div className="flex items-center gap-3">
                    {/* Edit */}
                    <EditDestination destination={destination}></EditDestination>
                    <DeleteDestinationDialog id={id}></DeleteDestinationDialog>
                </div>
            </div>

            <div className="relative mt-6 aspect-16/7 overflow-hidden rounded-xl">
                <Image
                    src={destination.imageUrl}
                    alt={destination.name}
                    fill
                    priority
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="object-cover"
                />
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
                <div>
                    <p className="flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin className="size-4" />
                        {titleCase(destination.country)}
                    </p>
                    <h1
                        className={`${headingFont.className} mt-2 text-4xl font-bold text-gray-900 md:text-5xl`}
                    >
                        {titleCase(destination.name)}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Star className="size-4 fill-gray-900 text-gray-900" />
                            <span className="font-semibold text-gray-900">4.9</span>
                            <span className="text-gray-500">(234 reviews)</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-700">
                            <CalendarDays className="size-4" />
                            {formatDuration(destination.duration)}
                        </span>
                    </div>

                    <h2
                        className={`${headingFont.className} mt-8 text-2xl font-bold text-gray-900`}
                    >
                        Overview
                    </h2>
                    <p className="mt-3 leading-relaxed text-gray-600">
                        {destination.description}
                    </p>

                    <h2
                        className={`${headingFont.className} mt-8 text-2xl font-bold text-gray-900`}
                    >
                        Highlights
                    </h2>
                    <p className="mt-3 leading-relaxed text-gray-600">
                        {destination.description}
                    </p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {highlights.map((highlight) => (
                            <li
                                key={highlight}
                                className="flex items-center gap-2 text-sm text-gray-600"
                            >
                                <Check className="size-4 text-green-600" />
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </div>
                <BookingCard destination={destination}></BookingCard>
                
            </div>
        </main>
    );
}
