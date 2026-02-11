import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (token && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/create-events") || pathname.startsWith("/events")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/create-events", "/events/:path*"],
};

export default proxy;
