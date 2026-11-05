import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export type Destination = {
  _id: string;
  name: string;
  country: string;
  price: string;
  duration: string;
  departure: string;
  imageUrl: string;
  description: string;
  category?: string;
};

export function titleCase(value: string) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDuration(duration: string) {
  const days = Number(duration);
  if (!Number.isFinite(days) || days <= 0) return duration;
  const nights = Math.max(days - 1, 1);
  return `${days} Days/${nights} Nights`;
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-2">
      <div className="relative aspect-16/10 overflow-hidden rounded-md">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="px-2 pt-3 pb-2">
        <p className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="size-3.5" />
          {titleCase(destination.country)}
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-2">
          <h3
            className={`${headingFont.className} text-lg text-gray-900`}
          >
            {titleCase(destination.name)}
          </h3>
          <p className="shrink-0">
            <span className="text-base font-bold text-gray-900">
              ${destination.price}
            </span>
            <span className="text-xs text-gray-500">/Person</span>
          </p>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
          <CalendarDays className="size-3.5" />
          {formatDuration(destination.duration)}
        </p>
        <Link
          href={`/destinations/${destination._id}`}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-[#0097b2] uppercase underline underline-offset-2"
        >
          Book Now
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
