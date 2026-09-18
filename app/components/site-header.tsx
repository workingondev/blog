import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

type SiteHeaderProps = {
  active?: "me" | "blog" | "now";
};

const navigation = [
  { href: "/", label: "me" },
  { href: "/blog", label: "blog" },
  { href: "/now", label: "now" },
] as const;

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center">
      <Link
        href="/"
        aria-label="Akshit, home"
        className="justify-self-start text-[0.8125rem] font-normal leading-none tracking-[-0.015em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500"
      >
        akshit
      </Link>

      <nav aria-label="Primary navigation">
        <ul className="flex items-center gap-6 text-[0.6875rem] leading-none sm:gap-9">
          {navigation.map((item) => {
            const isActive = active === item.label;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link${isActive ? " nav-link-active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <ThemeToggle />
    </header>
  );
}
