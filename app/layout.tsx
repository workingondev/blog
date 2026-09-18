import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://workingon.dev"),
  title: {
    default: "akshit — Technology, design, marketing, and ideas",
    template: "%s — akshit",
  },
  description:
    "akshit's notes on technology, design, marketing, building, research, and internet culture.",
  authors: [{ name: "akshit", url: "https://workingon.dev" }],
  creator: "akshit",
  publisher: "akshit",
  alternates: {
    canonical: "/",
    types: {
      "application/atom+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "workingon.dev",
    title: "akshit — Technology, design, marketing, and ideas",
    description:
      "Notes on technology, design, marketing, building, research, and internet culture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "akshit — Technology, design, marketing, and ideas",
    description:
      "Notes on technology, design, marketing, building, research, and internet culture.",
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
