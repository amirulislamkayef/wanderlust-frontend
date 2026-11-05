import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { Button } from "@/components/ui/button";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const searchFields = [
  { label: "Location", hint: "Address, City Or Zip" },
  { label: "Date/Duration", hint: "Anytime/3 Days" },
  { label: "Budget", hint: "$0-$3000" },
  { label: "People", hint: "5-10" },
];

export function Banner() {
  return (
    <section className="relative isolate flex min-h-160 flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise bay"
        fill
        sizes="100vw"
        priority
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/35" />

      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-24 text-center">
        <h1
          className={`${headingFont.className} max-w-4xl text-5xl leading-[1.05] font-bold text-white md:text-7xl`}
        >
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            render={<Link href="/destinations" />}
            nativeButton={false}
            className="h-11 gap-2 rounded-md bg-[#0097b2] px-6 text-sm font-semibold tracking-wide text-white uppercase hover:bg-[#007d95]"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Button>
          <Button
            render={<Link href="/destinations" />}
            nativeButton={false}
            className="h-11 rounded-md bg-white/20 px-6 text-sm font-semibold tracking-wide text-white uppercase hover:bg-white/30 hover:text-white"
          >
            View Destination
          </Button>
        </div>
      </div>

      <div className="w-full bg-black/55 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-[repeat(4,1fr)_auto]">
          {searchFields.map((field, i) => (
            <div
              key={field.label}
              className={`px-6 py-4 text-left ${
                i > 0 ? "border-t border-white/20 md:border-t-0 md:border-l" : ""
              }`}
            >
              <p className="text-sm font-semibold text-white">{field.label}</p>
              <p className="mt-0.5 text-xs text-white/60">{field.hint}</p>
            </div>
          ))}
          <button
            type="submit"
            className="col-span-2 bg-[#0097b2] px-12 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#007d95] md:col-span-1"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
