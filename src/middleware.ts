/**
 * Next.js middleware — protects authenticated routes.
 *
 * Auth.js v5 exports a `auth` helper that returns the session from the
 * request. We wrap it in middleware and check for an active session on
 * routes that require sign-in.
 *
 * Protected routes:
 *   /my-account/*   — the user's dashboard
 *   /booking-confirmation  — booking summary requires sign-in
 *
 * If the user has no session, redirect them to /auth/signin?callbackUrl=<original-url>.
 */

export { auth as middleware } from "@/auth";

export const config = {
  // Run middleware on these paths
  matcher: [
    "/my-account/:path*",
    "/booking-confirmation/:path*",
  ],
};
