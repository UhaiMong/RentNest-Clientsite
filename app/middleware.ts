import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "@/lib/decode-jwt";
import { dashboardPathForRole } from "@/lib/session";

const PROTECTED_PREFIXES = [
  "/tenant-dashboard",
  "/landlord-dashboard",
  "/admin-dashboard",
];
const AUTH_PAGES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const user = token ? decodeJwt(token) : null;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (isProtected && !user) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // stop a TENANT from opening /admin-dashboard, etc.
  if (isProtected && user) {
    const allowed = dashboardPathForRole(user.role);
    if (!pathname.startsWith(allowed)) {
      return NextResponse.redirect(new URL(allowed, request.url));
    }
  }

  if (isAuthPage && user) {
    return NextResponse.redirect(
      new URL(dashboardPathForRole(user.role), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tenant-dashboard/:path*",
    "/landlord-dashboard/:path*",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
  ],
};
