import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Akshit is currently researching, learning, and building.",
  alternates: {
    canonical: "/now",
  },
};

export default function NowPage() {
  return (
    <div className="page-shell grid grid-rows-[auto_1fr_auto] text-neutral-950 dark:text-neutral-100">
      <SiteHeader active="now" />

      <main className="grid content-center py-20">
        <article className="max-w-[34rem]">
          <p className="mb-4 text-[0.6875rem] tracking-[0.08em] text-neutral-500 uppercase dark:text-neutral-500">
            Now
          </p>
          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.04em]">
            Current work
          </h1>
          <p className="mt-6 text-[0.9375rem] leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
            I&apos;m studying post-quantum signature systems and their implications
            for blockchains, wallets, and long-lived cryptographic protocols.
            This page will change as the work does.
          </p>
          <p className="mt-8 text-[0.6875rem] text-neutral-500 dark:text-neutral-500">
            Updated September 2026
          </p>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
