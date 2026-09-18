import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://workingon.dev"),
  title: {
    default: "Akshit — Blockchain, cryptography, and distributed systems",
    template: "%s — Akshit",
  },
  description:
    "Akshit's personal notes on blockchain infrastructure, cryptography, distributed systems, and post-quantum security.",
  authors: [{ name: "Akshit", url: "https://workingon.dev" }],
  creator: "Akshit",
  publisher: "Akshit",
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
    title: "Akshit — Blockchain, cryptography, and distributed systems",
    description:
      "Research notes on blockchain infrastructure, cryptography, distributed systems, and post-quantum security.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshit — Blockchain, cryptography, and distributed systems",
    description:
      "Research notes on blockchain infrastructure, cryptography, distributed systems, and post-quantum security.",
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
      <body>{children}</body>
    </html>
  );
}
