import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="flex items-center gap-3 text-[0.6875rem] leading-none text-neutral-500 dark:text-neutral-500">
      <Link href="/blog" className="footer-link">
        writing
      </Link>
      <span aria-hidden="true">·</span>
      <a
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
        className="footer-link"
      >
        github<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <span aria-hidden="true">·</span>
      <a
        href="https://x.com/"
        target="_blank"
        rel="noreferrer"
        className="footer-link"
      >
        x<span className="sr-only"> (opens in a new tab)</span>
      </a>
    </footer>
  );
}
