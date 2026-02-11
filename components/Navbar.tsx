"use client";

import { ROUTES } from "@/lib/route";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  const session = useSession();
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };

  const userName = session.data?.user.name;
  const initials = userName
    ?.trim()
    .split(" ")
    .map((char) => {
      return char.charAt(0).toUpperCase();
    })
    .join("");

  const handleSignout = async () => {
    await signOut();
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

        {session?.data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="items-center justify-center mt-1.5">
                <AvatarImage src="https://github.com/shadcn" />
                <AvatarFallback className="bg-red-500 text-white text-center">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup>
                <DropdownMenuGroup className="text-center items-center">
                  <div>
                    <p className="font-medium">{session.data.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.data.user.email}
                    </p>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Create Event</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Hackathon</DropdownMenuItem>
                      <DropdownMenuItem>Workshop</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>My Events</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleSignout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            {pathname === "/signin" ? (
              <Link href="/signup">
                <Button className="bg-emerald-700 hover:cursor-pointer">
                  Signup
                </Button>
              </Link>
            ) : (
              <Link href="/signin">
                <Button className="bg-emerald-700 hover:cursor-pointer ">
                  Signin
                </Button>
              </Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
