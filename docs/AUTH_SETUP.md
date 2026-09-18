# Configuring Zoho Mail Sign-In — step-by-step

This guide walks you through wiring up **"Continue with Zoho"** on the Accommodation Finders site. It covers:

1. Registering an OAuth client in the Zoho API Console
2. Setting up Zoho Mail SMTP for the email magic-link sign-in (optional but recommended)
3. Configuring environment variables locally and on Vercel
4. Testing the end-to-end flow

Code is already wired up in this repo (`src/auth.ts`, `src/app/api/auth/`, `src/app/auth/signin/`, `src/components/site/sign-in-dropdown.tsx`). All you need to do is plug in the credentials.

---

## 0. What you need

- A **Zoho account** with admin access (the personal `yourname@zoho.com` works; a custom-domain Zoho Mail account like `hello@accommodationfinders.co.uk` is preferred so sign-in emails come from your domain).
- Access to the **Vercel project** `accommodation-finder` to set environment variables.
- A terminal with `openssl` installed (or `bunx auth secret`) to generate the JWT secret.

---

## 1. Register the OAuth client in Zoho API Console

Auth.js v5 talks to Zoho's OAuth 2.0 endpoints using a Client ID and Client Secret. You generate these in the Zoho API Console.

### Steps

1. Go to **https://api-console.zoho.com**.
2. Sign in with your Zoho account.
3. Click **Add Client** → choose **Server-based Applications** (this is the option for server-side web apps that need a long-lived refresh token; Auth.js v5 uses the authorization-code flow with PKCE).
4. Fill in the form:

   | Field | Value |
   |---|---|
   | **Client Name** | `Accommodation Finders` |
   | **Client Domain** | `accommodation-finder-two.vercel.app` |
   | **Homepage URL** | `https://accommodation-finder-two.vercel.app` |
   | **Authorized Redirect URIs** | `https://accommodation-finder-two.vercel.app/api/auth/callback/zoho` <br> AND (for local dev) `http://localhost:3000/api/auth/callback/zoho` |

5. Click **Create**.
6. On the next screen, copy the **Client ID** (starts with `1000.`) and **Client Secret** (long alphanumeric string). Save them somewhere safe — the secret is shown only once.

### Pick the right Zoho region

If your Zoho account is on **zoho.eu** or **zoho.in** (not zoho.com), you need to update the endpoints in `src/auth.ts`:

- zoho.eu: `accounts.zoho.eu` and `www.zohoapis.eu`
- zoho.in: `accounts.zoho.in` and `www.zohoapis.in`

The default in `src/auth.ts` is the `.com` region.

---

## 2. (Optional) Set up Zoho Mail SMTP for the email magic link

The "Continue with email" sign-in option sends a magic link email via SMTP. We recommend using Zoho Mail's SMTP server so the email comes from your domain (`hello@accommodationfinders.co.uk`).

### Steps

1. Sign in to **https://mail.zoho.com** with your Zoho admin account.
2. Go to **Settings** → **Mail Accounts** → **IMAP/SMTP** → **App-specific Passwords**.
3. Click **Generate New Password**.
   - **App Name:** `Accommodation Finders Magic Link`
   - **Mail Account:** `hello@accommodationfinders.co.uk` (or whichever address you want magic-link emails to come from)
4. Copy the generated password (16 characters, formatted `xxxx xxxx xxxx xxxx`). Save it — you won't see it again.

> ⚠️ Do NOT use your main Zoho account password. Zoho requires app-specific passwords for SMTP from third-party apps. The format is `xxxx xxxx xxxx xxxx` — copy it WITHOUT the spaces when you paste it into the env var.

### SMTP server details (Zoho Mail)

| Parameter | Value |
|---|---|
| Host | `smtp.zoho.com` |
| Port | `465` (SSL) or `587` (TLS) |
| Username | `hello@accommodationfinders.co.uk` (your verified sender) |
| Password | The app-specific password from step 3 (no spaces) |

---

## 3. Set environment variables locally

Copy the template and fill in your real values:

```bash
cd /path/to/accommodation-finder
cp .env.local.example .env.local
nano .env.local  # or your editor of choice
```

Fill in the values you copied from the Zoho console + Zoho Mail app password:

```bash
AUTH_URL=http://localhost:3000
AUTH_SECRET=<run: openssl rand -base64 32>

AUTH_ZOHO_ID=1000.XXXXXXXXXXXXXXXXXXXXXXXXX
AUTH_ZOHO_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

EMAIL_SERVER_HOST=smtp.zoho.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=hello@accommodationfinders.co.uk
EMAIL_SERVER_PASSWORD=xxxxxxxxxxxxxxxxxxxx  # no spaces
EMAIL_FROM=hello@accommodationfinders.co.uk
```

Generate `AUTH_SECRET` with one of:

```bash
openssl rand -base64 32
# or:
bunx auth secret
```

---

## 4. Set environment variables on Vercel

You can do this via the Vercel dashboard or the CLI.

### Via the Vercel CLI (fastest)

```bash
cd /path/to/accommodation-finder

# Link the project if not already linked
vercel link --yes --token="$VERCEL_TOKEN"

# Add each env var to the production environment
echo "<your-zoho-client-id>"     | vercel env add AUTH_ZOHO_ID       production --token="$VERCEL_TOKEN"
echo "<your-zoho-client-secret>" | vercel env add AUTH_ZOHO_SECRET   production --token="$VERCEL_TOKEN"
echo "<your-auth-secret>"        | vercel env add AUTH_SECRET        production --token="$VERCEL_TOKEN"
echo "https://accommodation-finder-two.vercel.app" | vercel env add AUTH_URL production --token="$VERCEL_TOKEN"

# Email magic-link SMTP
echo "smtp.zoho.com"            | vercel env add EMAIL_SERVER_HOST     production --token="$VERCEL_TOKEN"
echo "465"                      | vercel env add EMAIL_SERVER_PORT     production --token="$VERCEL_TOKEN"
echo "hello@accommodationfinders.co.uk" | vercel env add EMAIL_SERVER_USER     production --token="$VERCEL_TOKEN"
echo "<your-zoho-app-password>" | vercel env add EMAIL_SERVER_PASSWORD production --token="$VERCEL_TOKEN"
echo "hello@accommodationfinders.co.uk" | vercel env add EMAIL_FROM            production --token="$VERCEL_TOKEN"
```

### Via the Vercel dashboard

1. Go to **https://vercel.com/ruhe-global/accommodation-finder/settings/environment-variables**
2. Add each variable from the table above. Set **Environment** to "Production" (and optionally "Preview" + "Development" for testing).

| Key | Value |
|---|---|
| `AUTH_URL` | `https://accommodation-finder-two.vercel.app` |
| `AUTH_SECRET` | <32+ random chars from `openssl rand -base64 32`> |
| `AUTH_ZOHO_ID` | <Client ID from Zoho API Console> |
| `AUTH_ZOHO_SECRET` | <Client Secret from Zoho API Console> |
| `EMAIL_SERVER_HOST` | `smtp.zoho.com` |
| `EMAIL_SERVER_PORT` | `465` |
| `EMAIL_SERVER_USER` | `hello@accommodationfinders.co.uk` |
| `EMAIL_SERVER_PASSWORD` | <Zoho Mail app-specific password> |
| `EMAIL_FROM` | `hello@accommodationfinders.co.uk` |

After adding the vars, trigger a redeploy so the new env vars are picked up.

---

## 5. Run the database migration on Vercel

The Prisma schema was updated to add `Account`, `Session`, and `VerificationToken` tables (and add `username`, `passwordHash`, `emailVerified`, `image` to `User`). These tables need to exist on Vercel too.

Since we use SQLite locally, on Vercel you have two options:

### Option A (simplest): Use Vercel Postgres

Update `prisma/schema.prisma` to use `postgresql` and run:

```bash
vercel env add DATABASE_URL production --token="$VERCEL_TOKEN"  # value from Vercel Postgres
bunx prisma migrate deploy
```

### Option B: Keep SQLite via Turso or similar

If you want to keep the SQLite-based dev workflow, use **Turso** (`https://turso.tech`) which is SQLite-over-libsql. Update `DATABASE_URL` to the Turso URL and run `bunx prisma db push`.

Either way, after the DB is provisioned:

```bash
bunx prisma migrate deploy  # or: bunx prisma db push
```

---

## 6. Test the end-to-end flow

### Local

```bash
bun run dev
# Open http://localhost:3000
# Click "Get started" in the navbar → "Continue with Zoho"
# You should be redirected to https://accounts.zoho.com/oauth/v2/auth
# After granting consent, you'll be redirected back to /my-account
```

### Production

After deploying:

1. Go to **https://accommodation-finder-two.vercel.app/**.
2. Click **Get started** → **Continue with Zoho**.
3. You should be redirected to **https://accounts.zoho.com/oauth/v2/auth?...**
4. Sign in with your Zoho account, click **Accept** on the consent screen.
5. You'll be redirected back to **/api/auth/callback/zoho**, then to **/my-account**.
6. You should now be signed in — the navbar "Get started" should change to your name/email.

### Test the email magic link

1. Click **Get started** → **Continue with email**.
2. Enter an email address you control.
3. Check the inbox — you should receive an HTML email branded with the Allura "Accommodation finders" wordmark + an orange "Sign in" button.
4. Click the button (or paste the link into a browser). You should be signed in and redirected to `/my-account`.

### Test the username + password

You first need to create a user. Either:

- Hit `POST /api/auth/signup` with a JSON body like:
  ```bash
  curl -X POST https://accommodation-finder-two.vercel.app/api/auth/signup \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","username":"testuser","password":"password123","name":"Test User"}'
  ```
- Or go to `/auth/signin`, click **"Create one"**, and fill in the signup form.

Then sign in with that username + password via the dropdown or `/auth/signin`.

---

## 7. Troubleshooting

### "Redirect URI mismatch" from Zoho

The redirect URI in the Zoho API Console must EXACTLY match the URI Auth.js constructs. Common issues:
- Trailing slash: must be `/api/auth/callback/zoho` (no trailing slash)
- HTTP vs HTTPS: production must use HTTPS
- Subdomain mismatch: ensure the Vercel URL matches what you put in the Zoho console

### "Invalid grant" during token exchange

Zoho rejects tokens if:
- The `client_id` or `client_secret` is wrong
- The authorization code is reused (each code is single-use)
- The clock on the server is wrong (rare on Vercel)

Check your env vars first.

### Email magic link never arrives

- Check the `EMAIL_SERVER_USER` is the same Zoho account that issued the app password.
- Check `EMAIL_SERVER_PASSWORD` doesn't have spaces (`xxxx xxxxx ...` → `xxxxxxxxx...`).
- Try port 587 with `secure: false` if 465 doesn't work (some networks block 465).
- Check the Zoho Mail admin console → **Mail Accounts** → **Email Forwarding** for any bounce messages.

### "Prisma Client not found" / "Database not initialized"

You haven't run `bunx prisma generate` + `bunx prisma db push` against the production database. See section 5.

### Signed in but session is null

The JWT cookie is signed with `AUTH_SECRET`. If `AUTH_SECRET` differs between requests (e.g. you regenerated it), all sessions are invalidated. Generate once and keep it stable.

---

## 8. What's next

- Add rate-limiting on `/api/auth/signup` and `/api/auth/signin/email` to prevent abuse. Use `@upstash/ratelimit` with Vercel KV.
- Add email verification on signup (currently a user can sign up with any email and immediately sign in via username/password).
- Add a "Forgot password" flow (currently there's no way to reset a password if forgotten).
- Switch the database from SQLite to Vercel Postgres (or Turso) so the auth data persists across serverless instances on Vercel.
- Add a sign-out button in the navbar when the user is signed in.
