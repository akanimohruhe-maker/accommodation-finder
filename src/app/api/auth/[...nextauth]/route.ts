/**
 * Next.js App Router catch-all route for Auth.js v5.
 *
 * This exposes:
 *   GET  /api/auth/*   — sign-in pages, callback URLs, sign-out
 *   POST /api/auth/*   — sign-in form submissions, sign-out form
 *
 * The handlers come from `auth.ts` which is the central Auth.js config.
 *
 * Note: Auth.js v5 (next-auth@beta) uses the App Router pattern of
 * `export const { GET, POST } = handlers`. v4 used `NextAuth(authOptions)`.
 *
 * We deliberately don't set `runtime = "edge"` because the Prisma adapter
 * needs Node.js filesystem for SQLite. Once the DB is moved to
 * Postgres on Vercel (via Prisma Accelerate or Neon), this can run on
 * edge runtime for faster cold starts.
 */
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
