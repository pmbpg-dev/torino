import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/basket", "/profile/:path*", "/checkout/:path*"],
};
