import Link from "next/link";
import { LocalTime } from "./components/local-time";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://workingon.dev/#person",
        name: "akshit",
        url: "https://workingon.dev",
        homeLocation: {
          "@type": "Country",
          name: "India",
        },
        knowsAbout: [
          "Technology",
          "Product design",
          "Marketing",
          "Customer acquisition",
          "Internet culture",
          "Building products",
          "Cryptography",
          "Post-quantum cryptography",
          "Distributed systems",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://workingon.dev/#website",
        url: "https://workingon.dev",
        name: "workingon.dev",
        description:
          "Notes on technology, design, marketing, building, research, and internet culture.",
        inLanguage: "en",
        author: { "@id": "https://workingon.dev/#person" },
        publisher: { "@id": "https://workingon.dev/#person" },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://workingon.dev/#profile",
        url: "https://workingon.dev",
        name: "akshit",
        mainEntity: { "@id": "https://workingon.dev/#person" },
        isPartOf: { "@id": "https://workingon.dev/#website" },
      },
    ],
  };

  return (
    <div className="home-shell mx-auto grid w-full max-w-[72rem] grid-rows-[auto_1fr_auto] px-6 py-5 text-neutral-950 sm:px-12 sm:py-8 lg:px-20 lg:py-10 dark:text-neutral-100">
      <SiteHeader active="me" />

      <main className="home-main grid min-h-0 content-center py-8 sm:py-10">
        <section aria-labelledby="introduction" className="max-w-[34rem]">
          <h1
            id="introduction"
            className="text-[clamp(1.375rem,3vw,1.75rem)] font-normal leading-[1.2] tracking-[-0.035em]"
          >
            I&apos;m akshit.
          </h1>

          <p className="intro-primary mt-5 text-[clamp(0.9375rem,1.7vw,1rem)] leading-[1.75] tracking-[-0.015em] text-neutral-800 dark:text-neutral-200">
            I&apos;m curious about how things work and usually understand them
            by building. I work in tech, think about marketing, and make memes.
          </p>

          <p className="intro-secondary mt-4 text-[clamp(0.875rem,1.7vw,1rem)] leading-[1.75] tracking-[-0.015em] text-neutral-600 dark:text-neutral-400 sm:mt-5">
            I learn from first principles, test ideas in the real world, and
            write while they are still taking shape.
          </p>

          <p className="intro-secondary mt-4 text-[clamp(0.875rem,1.7vw,1rem)] leading-[1.75] tracking-[-0.015em] text-neutral-600 dark:text-neutral-400 sm:mt-5">
            Right now: post-quantum cryptography, product design, distribution,
            and the small decisions with great design.
          </p>

          <nav
            aria-label="Explore akshit's work"
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
          >
            <Link className="home-action-link" href="/blog">
              read the writing
            </Link>
            <Link className="home-action-link" href="/now">
              see what I&apos;m doing now
            </Link>
          </nav>

          <LocalTime />
        </section>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
