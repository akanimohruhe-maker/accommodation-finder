import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Space_Grotesk, Amarante, Allura } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ImageShield } from "@/components/site/image-shield";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const amarante = Amarante({
  variable: "--font-amarante",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

// Allura — flowing cursive script, used as the brand's "logo wordmark"
// font for the word "Accommodation" wherever it appears as a brand mark
// on the site. Matches the cursive style of the official logo wordmark.
const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://accommodation-finder-two.vercel.app"),
  title: "Accommodation Finders — Student Housing in the UK",
  description:
    "Verified student accommodations across London, Manchester, Birmingham, Leicester and Northampton. Secure booking, viewings, lease agreements, and move-in support — all in one place.",
  keywords: [
    "student accommodation UK",
    "student housing London",
    "Manchester student accommodation",
    "Birmingham student housing",
    "UK student lets",
    "international student housing",
  ],
  authors: [{ name: "Accommodation Finders" }],
  // Custom favicon set — generated from the official Accommodation Finders
  // logo (scripts/build-favicons.py). Square favicon crops the icon (sun +
  // house forming 'A') and discards the wordmark because the wordmark is
  // illegible at 16-32px sizes.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    android: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Accommodation Finders",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  // Prevent search engines (Google, Bing, etc.) from indexing our images
  // so they don't appear in Google Images search results where they could
  // be hotlinked or downloaded. `noimageindex` is the older Next.js API
  // and is what most crawlers actually honor.
  robots: {
    index: true,
    follow: true,
    noimageindex: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  openGraph: {
    title: "Accommodation Finders — Student Housing in the UK",
    description:
      "Verified student accommodations across London, Manchester, Birmingham, Leicester and Northampton.",
    siteName: "Accommodation Finders",
    type: "website",
    images: [
      {
        url: "/logo-square.png",
        width: 512,
        height: 512,
        alt: "Accommodation Finders — orange sun and house logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accommodation Finders — Student Housing in the UK",
    description:
      "Verified student accommodations across London, Manchester, Birmingham, Leicester and Northampton.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${bricolage.variable} ${spaceGrotesk.variable} ${amarante.variable} ${allura.variable} antialiased bg-background text-foreground`}
      >
        <ImageShield />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
