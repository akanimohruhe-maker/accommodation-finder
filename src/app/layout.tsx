import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Space_Grotesk, Amarante } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
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
  openGraph: {
    title: "Accommodation Finders — Student Housing in the UK",
    description:
      "Verified student accommodations across London, Manchester, Birmingham, Leicester and Northampton.",
    siteName: "Accommodation Finders",
    type: "website",
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
        className={`${inter.variable} ${bricolage.variable} ${spaceGrotesk.variable} ${amarante.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
