import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "My Bookings", href: "/my-bookings" },
  { name: "My Profile", href: "/profile" },
];

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socials = [
  {
    name: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] px-4 pt-16 pb-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-white/10 pb-12">
          <Image
            src="/images/Wanderlast-1.png"
            alt="Wanderlast"
            width={340}
            height={68}
            className="h-14 w-auto"
          />
          <p className="mt-4 text-sm text-gray-400">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4 flex items-center gap-2 rounded-md bg-white/10 px-4 py-3">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="w-full bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-white transition-colors hover:text-gray-300"
              >
                <ArrowUpRight className="size-5" />
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="tel:+17869011622"
                  className="transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="transition-colors hover:text-white"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-gray-400">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-gray-400 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-4"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
