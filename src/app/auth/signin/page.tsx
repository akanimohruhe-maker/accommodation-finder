"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import {
  MailIcon,
  PhoneIcon,
  ChatIcon,
  LocationIcon,
  ClockIcon,
} from "@/components/site/contact-icons";

/**
 * Sign-in page — rendered when a user is redirected to /auth/signin by
 * middleware, or when they click a "Get started" → "Sign in" option in
 * the navbar dropdown.
 *
 * Three sign-in methods (matching the dropdown):
 *   1. Zoho OAuth — redirects to Zoho's consent screen via /api/auth/signin/zoho
 *   2. Email magic link — sends a one-time link to the user's inbox
 *   3. Username + password — submits to /api/auth/callback/credentials
 *
 * Also exposes a "Create account" link for first-time users so they can
 * sign up via the /api/auth/signup endpoint.
 */

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/my-account";

  const [mode, setMode] = useState<"menu" | "email" | "credentials" | "signup">("menu");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signInWithZoho = () => {
    setLoading(true);
    // Auth.js v5 client-side signIn — redirect to Zoho consent screen
    window.location.href = `/api/auth/signin/zoho?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  };

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      // Use the Auth.js v5 client-side helper to start the email flow
      // via a form POST. We use fetch to hit the email provider directly.
      const res = await fetch(`/api/auth/signin/email`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          callbackUrl,
          csrfToken: await getCsrfToken(),
        }).toString(),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send magic link");
      }
      setInfo(`Magic link sent to ${email}. Check your inbox (and spam folder). The link expires in 24 hours.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const signInWithCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/callback/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username,
          password,
          callbackUrl,
          csrfToken: await getCsrfToken(),
        }).toString(),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Invalid username or password");
      }
      // On success, redirect to the callback URL
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, name }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Sign-up failed");
      }
      setInfo(`Account created for ${data.user.email}. You can now sign in with your username and password.`);
      setMode("credentials");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 sm:px-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-ink transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to home
      </Link>

      <h1 className="headline text-ink text-[34px] lg:text-[44px] leading-tight">
        Sign in to your account
      </h1>
      <p className="mt-3 text-[15px] text-ink-soft">
        Pick a method below — all three connect to the same account.
      </p>

      {error && (
        <div className="mt-6 rounded-xl border border-danger/30 bg-danger/8 px-4 py-3 text-[14px] text-danger">
          {error}
        </div>
      )}
      {info && (
        <div className="mt-6 rounded-xl border border-success/30 bg-success/8 px-4 py-3 text-[14px] text-success">
          {info}
        </div>
      )}

      {/* MENU mode — three big buttons */}
      {mode === "menu" && (
        <div className="mt-8 space-y-3">
          {/* Zoho */}
          <button
            type="button"
            onClick={signInWithZoho}
            disabled={loading}
            className="group w-full inline-flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-line bg-bg-elevated hover:border-brand/30 hover:bg-brand/3 transition-colors text-left disabled:opacity-60"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sun-1/10 to-sun-2/10 border border-sun-1/20 shrink-0">
              <ChatIcon size={22} />
            </span>
            <span className="flex-1">
              <span className="block text-[15px] font-medium text-ink leading-tight">Continue with Zoho</span>
              <span className="block text-[12.5px] text-ink-muted mt-0.5">Sign in with your Zoho account</span>
            </span>
          </button>

          {/* Email */}
          <button
            type="button"
            onClick={() => { setMode("email"); setError(null); setInfo(null); }}
            className="group w-full inline-flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-line bg-bg-elevated hover:border-brand/30 hover:bg-brand/3 transition-colors text-left"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sun-1/10 to-sun-2/10 border border-sun-1/20 shrink-0">
              <MailIcon size={22} />
            </span>
            <span className="flex-1">
              <span className="block text-[15px] font-medium text-ink leading-tight">Continue with email</span>
              <span className="block text-[12.5px] text-ink-muted mt-0.5">We'll send a one-time magic link</span>
            </span>
          </button>

          {/* Credentials */}
          <button
            type="button"
            onClick={() => { setMode("credentials"); setError(null); setInfo(null); }}
            className="group w-full inline-flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-line bg-bg-elevated hover:border-brand/30 hover:bg-brand/3 transition-colors text-left"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sun-1/10 to-sun-2/10 border border-sun-1/20 shrink-0">
              <PhoneIcon size={22} />
            </span>
            <span className="flex-1">
              <span className="block text-[15px] font-medium text-ink leading-tight">Sign in with username</span>
              <span className="block text-[12.5px] text-ink-muted mt-0.5">Use your Accommodation Finders account</span>
            </span>
          </button>

          {/* Sign up link */}
          <p className="pt-4 text-[13px] text-ink-muted text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(null); setInfo(null); }}
              className="font-medium text-brand hover:text-brand-soft transition-colors underline-offset-4 hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      )}

      {/* EMAIL mode — magic link form */}
      {mode === "email" && (
        <form onSubmit={sendMagicLink} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-brand-foreground px-5 py-2.5 text-[14px] font-semibold hover:bg-brand-soft transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Sending..." : "Send magic link"}
          </button>
          <button
            type="button"
            onClick={() => setMode("menu")}
            className="w-full text-[13px] text-ink-muted hover:text-ink transition-colors"
          >
            ← Back to all options
          </button>
        </form>
      )}

      {/* CREDENTIALS mode — username + password form */}
      {mode === "credentials" && (
        <form onSubmit={signInWithCredentials} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
              Username or email
            </span>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-username or you@example.com"
              className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-brand-foreground px-5 py-2.5 text-[14px] font-semibold hover:bg-brand-soft transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <button
            type="button"
            onClick={() => setMode("menu")}
            className="w-full text-[13px] text-ink-muted hover:text-ink transition-colors"
          >
            ← Back to all options
          </button>
        </form>
      )}

      {/* SIGNUP mode — create a new account */}
      {mode === "signup" && (
        <form onSubmit={signUp} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
              Full name (optional)
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
              Username
            </span>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="janedoe"
              minLength={3}
              className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
              Password (min 8 characters)
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
              className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-brand-foreground px-5 py-2.5 text-[14px] font-semibold hover:bg-brand-soft transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Creating..." : "Create account"}
          </button>
          <button
            type="button"
            onClick={() => setMode("menu")}
            className="w-full text-[13px] text-ink-muted hover:text-ink transition-colors"
          >
            ← Back to all options
          </button>
        </form>
      )}
    </div>
  );
}

// Helper — fetch the CSRF token from the Auth.js v5 endpoint
async function getCsrfToken(): Promise<string> {
  const res = await fetch(`/api/auth/csrf`);
  const data = await res.json();
  return data.csrfToken as string;
}

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <section className="flex-1 py-32 lg:py-40 bg-bg">
        <Suspense
          fallback={
            <div className="mx-auto w-full max-w-md px-6 py-12">
              <div className="h-10 w-10 rounded-full border-2 border-brand border-t-transparent animate-spin mx-auto" />
            </div>
          }
        >
          <SignInForm />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
