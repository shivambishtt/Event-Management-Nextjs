"use client";

import { ROUTES } from "@/lib/route";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header>
      <nav className="h-20 mt-4 w-2/3 border border-transparent  rounded-4xl ">
        <Link href="/" className="app- flex gap-2 items-center">
          <Image src="/icons/logo.png" alt="appLogo" width={24} height={24} />
          <p>Dev Events</p>
        </Link>

        <ul>
          <Link
            className={
              isActive(ROUTES.home) ? "text-zinc-400 underline " : "text-white"
            }
            href="/"
          >
            Home
          </Link>
          <Link
            className={
              isActive(ROUTES.events)
                ? "text-zinc-400 underline "
                : "text-white"
            }
            href="/events"
          >
            Events
          </Link>
          <Link
            className={
              isActive(ROUTES.createEvent)
                ? "text-zinc-400 underline "
                : "text-white"
            }
            href="/create-events"
          >
            Create Events
          </Link>
        </ul>
        <Avatar className="items-center justify-center">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
}

export default Navbar;
