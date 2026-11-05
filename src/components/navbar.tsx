'use client'
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Add Destinations", href: "/add-destination" },
  { name: "My Bookings", href: "/my-bookings" },
];

export function Navbar({ active = "Home" }: { active?: string }) {

  const { data: session } = authClient.useSession()
  const user = session?.user;

  const handleSignout = () => {
    authClient.signOut()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:px-6">
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${link.name === active
                ? "text-[#0097b2]"
                : "text-gray-700 hover:text-[#0097b2]"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link href="/" className="justify-self-center">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={184}
            height={38}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <div className="hidden items-center justify-end gap-5 md:flex">
          {
            user ? <>
              <Popover>
                <PopoverTrigger render={
                  <Avatar>
                    <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription><h2>{user?.email}</h2></PopoverDescription>
                    <Button onClick={handleSignout} variant={'destructive'}>Sign Out</Button>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>

              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-[#0097b2]"
              >
                <User className="size-4" />
                Profile
              </Link>
            </> : <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-[#0097b2]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold text-gray-900 transition-colors hover:text-[#0097b2]"
              >
                Sign Up
              </Link>
            </>
          }

        </div>
      </div>
    </header>
  );
}
