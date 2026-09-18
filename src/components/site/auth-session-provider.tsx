"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

/**
 * AuthSessionProvider — wraps the whole app so client components can
 * use the `useSession()` hook from next-auth/react.
 *
 * Mounted once in layout.tsx. The SessionProvider caches the session
 * JWT across navigations and refetches it periodically (default 60s)
 * so the navbar can show "Signed in as <name>" without server round-
 * trips on every page transition.
 *
 * Note: this is a client-only provider. The session JWT itself is
 * signed server-side using AUTH_SECRET in auth.ts.
 */
export function AuthSessionProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
