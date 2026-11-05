import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export function CallToAction() {
  return (
    <section className="relative isolate flex min-h-105 items-center justify-center overflow-hidden px-4 py-24">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of an airplane flying over a tropical island"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="flex max-w-3xl flex-col items-center text-center">
        <h2
          className={`${headingFont.className} text-4xl leading-tight font-bold text-white md:text-5xl`}
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/90 md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="mt-8 inline-flex h-11 items-center gap-3 rounded-md bg-white px-7 text-sm font-semibold tracking-wide text-gray-900 uppercase transition-colors hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
