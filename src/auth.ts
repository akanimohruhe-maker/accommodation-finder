import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import type { Provider } from "next-auth/providers";

// ------------------------------------------------------------
// Custom providers — Zoho OAuth 2.0, Email magic link, Username+password
// ------------------------------------------------------------
// Auth.js v5 doesn't ship a Zoho provider out of the box, so we use the
// generic OAuth2Provider with Zoho's endpoints. Zoho's OAuth uses:
//   Authorization: https://accounts.zoho.com/oauth/v2/auth
//   Token:         https://accounts.zoho.com/oauth/v2/token
//   Profile:       https://www.zohoapis.com/oauth/user/info
// Scopes we request: ZohoMail.accounts.READ + ZohoMail.views.READ
// (we just need the user's email to identify them; we don't read mail).
// ------------------------------------------------------------

import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * ZohoProvider — generic OAuth 2.0 provider configured against Zoho's
 * accounts.zoho.com endpoints. Returns the user's email + name from
 * Zoho's /oauth/user/info endpoint.
 *
 * Required env vars:
 *   AUTH_ZOHO_ID           — Zoho OAuth Client ID
 *   AUTH_ZOHO_SECRET       — Zoho OAuth Client Secret
 *   AUTH_URL                — public site URL (e.g. https://accommodation-finder-two.vercel.app)
 *   AUTH_SECRET            — random 32+ char secret used to sign JWTs
 *
 * The Zoho API Console redirect URI must be exactly:
 *   <AUTH_URL>/api/auth/callback/zoho
 *
 * For local dev, set AUTH_URL=http://localhost:3000 and use the same
 * redirect URI in the Zoho console.
 */
const ZohoProvider: Provider = {
  id: "zoho",
  name: "Zoho",
  type: "oauth",
  version: "2.0",
  clientId: process.env.AUTH_ZOHO_ID,
  clientSecret: process.env.AUTH_ZOHO_SECRET,
  // Zoho OAuth endpoints (region-aware — see note below)
  authorization: {
    url: "https://accounts.zoho.com/oauth/v2/auth",
    params: {
      scope: "ZohoMail.accounts.READ",
      prompt: "consent",
      access_type: "offline",
    },
  },
  token: {
    url: "https://accounts.zoho.com/oauth/v2/token",
    // Zoho's token endpoint returns access_token + refresh_token; we ask
    // Auth.js to also send the client_id/secret in the body (Zoho accepts
    // either header or body auth).
    conform: async (response: Response) => {
      // Zoho returns the response as JSON; no transformation needed.
      return response;
    },
  },
  userinfo: {
    url: "https://www.zohoapis.com/oauth/user/info",
    // Zoho returns { Email, DisplayName, First_Name, Last_Name }
    // We map to Auth.js's standard profile shape.
    async request({ tokens, provider }) {
      const res = await fetch("https://www.zohoapis.com/oauth/user/info", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      if (!res.ok) return null;
      const profile = await res.json();
      return {
        email: profile.Email,
        name: profile.DisplayName || [profile.First_Name, profile.Last_Name].filter(Boolean).join(" "),
        image: null,
        emailVerified: null,
      };
    },
  },
  profile(profile: { Email: string; DisplayName?: string; First_Name?: string; Last_Name?: string }) {
    return {
      id: profile.Email,
      email: profile.Email,
      name: profile.DisplayName || [profile.First_Name, profile.Last_Name].filter(Boolean).join(" "),
      image: null,
      emailVerified: null,
    };
  },
};

// ------------------------------------------------------------
// Email magic-link provider — sends a one-time link to the user's inbox.
// Uses nodemailer with SMTP env vars. In production we recommend a
// transactional email service (Resend, Postmark, AWS SES) but for the
// initial setup nodemailer against Zoho's SMTP works fine.
//
// Required env vars:
//   EMAIL_SERVER_HOST       — e.g. smtp.zoho.com
//   EMAIL_SERVER_PORT       — e.g. 465 (SSL) or 587 (TLS)
//   EMAIL_SERVER_USER       — your verified sender address (e.g. hello@accommodationfinders.co.uk)
//   EMAIL_SERVER_PASSWORD   — the SMTP password (or Zoho app-specific password)
//   EMAIL_FROM              — same as EMAIL_SERVER_USER for Zoho
// ------------------------------------------------------------

const emailProvider: Provider = EmailProvider({
  id: "email",
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT ?? 465),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
  // Generate the magic link token and send the email
  async sendVerification({ identifier, url, provider }) {
    const transport = nodemailer.createTransport({
      host: provider.server.host,
      port: provider.server.port,
      secure: provider.server.port === 465,
      auth: provider.server.auth,
    });
    const { host } = new URL(url);
    const result = await transport.sendMail({
      to: identifier,
      from: provider.from,
      subject: `Sign in to Accommodation Finders`,
      text: `Sign in to Accommodation Finders\n\nOpen this link in your browser:\n${url}\n\nThis link expires in 24 hours.\n\nIf you didn't request this sign-in, you can safely ignore this email.\n\nAccommodation Finders\n${host}`,
      html: `
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#FAFAF7;color:#0F172A;margin:0;padding:24px;">
          <table role="presentation" width="100%" style="max-width:480px;margin:0 auto;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;">
            <tr><td style="padding:32px 32px 24px;">
              <h1 style="font-family:'Allura',cursive;font-size:36px;color:#FF8C00;margin:0 0 8px;line-height:1;">Accommodation finders</h1>
              <p style="font-size:15px;color:#475569;margin:0 0 24px;">Sign in to your account</p>
              <p style="font-size:15px;color:#0F172A;margin:0 0 24px;">Click the button below to sign in. This link expires in 24 hours and can only be used once.</p>
              <p style="margin:0 0 24px;text-align:center;">
                <a href="${url}" style="display:inline-block;background:#2E3194;color:#FFFFFF;text-decoration:none;padding:14px 28px;border-radius:9999px;font-size:14px;font-weight:600;">Sign in to Accommodation Finders</a>
              </p>
              <p style="font-size:13px;color:#94A3B8;margin:0 0 8px;">Or paste this URL into your browser:</p>
              <p style="font-size:13px;color:#2E3194;margin:0 0 24px;word-break:break-all;background:#F1F5F9;padding:12px 14px;border-radius:8px;">${url}</p>
              <p style="font-size:13px;color:#94A3B8;margin:0;">If you didn't request this sign-in, you can safely ignore this email.</p>
            </td></tr>
            <tr><td style="padding:16px 32px;background:#F8FAFC;border-top:1px solid #E2E8F0;">
              <p style="font-size:12px;color:#94A3B8;margin:0;">Accommodation Finders · 1 Canada Square, Canary Wharf, London E14 5AB</p>
            </td></tr>
          </table>
        </body>
      `,
    });
    if (result.rejected.length) {
      console.error("[auth] email rejected for", identifier, result.rejected);
    }
  },
});

// ------------------------------------------------------------
// Credentials provider — username + password
// We hash passwords with bcrypt (10 rounds). The user is looked up in
// the User table by username OR email, and the password is verified
// against the stored bcrypt hash. We never store plain-text passwords.
//
// To create the first user, hit POST /api/auth/signup with { name, email,
// username, password }. Or seed via `bunx tsx scripts/seed-user.ts`.
// ------------------------------------------------------------

const credentialsProvider: Provider = CredentialsProvider({
  id: "credentials",
  name: "Username",
  credentials: {
    username: { label: "Username or email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(creds) {
    if (!creds?.username || !creds?.password) return null;
    const id = String(creds.username).trim().toLowerCase();
    const user = await db.user.findFirst({
      where: {
        OR: [{ username: id }, { email: id }],
      },
    });
    if (!user || !user.passwordHash) return null;
    const ok = await bcrypt.compare(String(creds.password), user.passwordHash);
    if (!ok) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      emailVerified: user.emailVerified,
    };
  },
});

// ------------------------------------------------------------
// Compose the providers + config
// ------------------------------------------------------------

export const providers: Provider[] = [
  ZohoProvider,
  emailProvider,
  credentialsProvider,
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers,
  pages: {
    signIn: "/auth/signin",
    // We don't ship a custom error page yet — Next.js default is fine.
  },
  trustHost: true,
  // Auth.js v5 needs AUTH_URL OR AUTH_TRUST_HOST. On Vercel we trust the
  // host header. In local dev you also need to set AUTH_URL explicitly.
  callbacks: {
    async jwt({ token, user, account }) {
      // First sign-in: persist the user id into the JWT so the session
      // callback can pick it up.
      if (user) {
        token.uid = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.uid as string | undefined;
      }
      return session;
    },
  },
});
