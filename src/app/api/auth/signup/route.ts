/**
 * POST /api/auth/signup
 *
 * Create a new username+password user. The user is NOT automatically
 * signed in — they have to use the sign-in flow afterwards (this is
 * deliberate so we don't bypass the JWT signing path).
 *
 * Request body:
 *   { email, username, password, name? }
 *
 * Returns:
 *   200 { ok: true, user: { id, email, username } } — on success
 *   400 { error: "..." }                            — on validation failure
 *   409 { error: "User already exists" }           — if email/username taken
 *   500 { error: "..." }                            — on unexpected error
 *
 * Password is hashed with bcryptjs (10 rounds). We never store the
 * plain-text password.
 *
 * For production you'd want email verification + rate-limiting here.
 * Email verification is handled by the Email magic-link provider in
 * auth.ts; rate-limiting should be added via Vercel's edge middleware
 * or a dedicated rate-limiter like @upstash/ratelimit.
 */
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    const { email, username, password, name } = body as {
      email?: string;
      username?: string;
      password?: string;
      name?: string;
    };

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }
    if (!username || username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    // Normalize
    const normEmail = email.trim().toLowerCase();
    const normUser = username.trim().toLowerCase();

    // Uniqueness check
    const existing = await db.user.findFirst({
      where: { OR: [{ email: normEmail }, { username: normUser }] },
      select: { email: true, username: true },
    });
    if (existing) {
      if (existing.email === normEmail) {
        return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
      }
      return NextResponse.json({ error: "This username is already taken" }, { status: 409 });
    }

    // Hash password (10 rounds — about 100ms per hash on modern hardware)
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user
    const user = await db.user.create({
      data: {
        email: normEmail,
        username: normUser,
        passwordHash,
        name: name?.trim() || null,
      },
      select: { id: true, email: true, username: true },
    });

    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error("[signup] error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
