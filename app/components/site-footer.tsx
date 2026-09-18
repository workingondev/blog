import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="flex items-center gap-3 text-[0.9375rem] leading-none text-neutral-500 dark:text-neutral-500">
      <Link href="/blog" className="footer-link -mx-1 -my-2 px-1 py-2">
        writing
      </Link>
      <span aria-hidden="true">·</span>
      <a
        href="https://github.com/workingondev"
        target="_blank"
        rel="noreferrer"
        className="footer-link -mx-1 -my-2 px-1 py-2"
      >
        github<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <span aria-hidden="true">·</span>
      <a
        href="https://x.com/workingondev"
        target="_blank"
        rel="noreferrer"
        className="footer-link -mx-1 -my-2 inline-flex min-w-7 justify-center px-1 py-2"
      >
        x<span className="sr-only"> (opens in a new tab)</span>
      </a>
    </footer>
  );
}
