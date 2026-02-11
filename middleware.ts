import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/create-events") || pathname.startsWith("/events")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/create-events", "/events/:path*"],
};
