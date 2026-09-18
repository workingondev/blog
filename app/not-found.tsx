import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <div className="page-shell grid grid-rows-[auto_1fr_auto] text-neutral-950 dark:text-neutral-100">
      <SiteHeader />
      <main className="grid content-center py-20">
        <div className="max-w-[30rem]">
          <p className="text-[0.6875rem] tracking-[0.08em] text-neutral-500 uppercase">
            404
          </p>
          <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-normal tracking-[-0.04em]">
            Nothing here.
          </h1>
          <p className="mt-5 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            The page may have moved, or the address may be incomplete.
          </p>
          <Link className="article-link mt-6 inline-block text-sm" href="/blog">
            Return to writing
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
