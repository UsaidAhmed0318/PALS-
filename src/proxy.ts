import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session/config";
import { SessionData, UserRole } from "@/types/session";

const publicPaths = [
  "/login",
  "/products",
  "/api/auth/login",
  "/api/auth/callback",
  "/",
];

// Define which routes require which roles
const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  "/admin": ["super_admin"],
  "/warehouse": ["super_admin", "warehouse_manager"],
  "/dashboard": [
    "super_admin",
    "warehouse_manager",
    "customer",
    "website_user",
  ],
};

// Must export a function named 'middleware' or use default export
export async function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  const path = req.nextUrl.pathname;

  // Allow public paths
  if (path === "/" || publicPaths.some((path) => path.startsWith(path))) {
    return NextResponse.next();
  }

  // Find matching protected route
  const matchedRoute = Object.keys(PROTECTED_ROUTES).find((route) =>
    path.startsWith(route)
  );

  if (!matchedRoute) return res; // Public route, allow

  // Not logged in → redirect to login
  if (!session.isLoggedIn || !session.user) {
    return NextResponse.redirect(new URL(`/auth?redirect=${path}`, req.url));
  }

  // Wrong role → redirect to home
  const allowedRoles = PROTECTED_ROUTES[matchedRoute];
  if (!allowedRoles.includes(session.user.role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/warehouse/:path*",
    "/dashboard/:path*",
    "/api/proxy/:path*",
  ],
};
