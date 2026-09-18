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
    <header className="flex items-center justify-between">
      <nav aria-label="Primary navigation">
        <ul className="flex items-center gap-6 text-[0.9375rem] leading-none sm:gap-9">
          {navigation.map((item) => {
            const isActive = active === item.label;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link -mx-1.5 -my-2 px-1.5 py-2${isActive ? " nav-link-active" : ""}`}
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
