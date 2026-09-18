import Image from "next/image";
import editorialStudy from "@/public/images/editorial-study.png";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://workingon.dev/#person",
        name: "Akshit",
        url: "https://workingon.dev",
        knowsAbout: [
          "Blockchain infrastructure",
          "Cryptography",
          "Post-quantum cryptography",
          "Distributed systems",
          "Digital wallets",
          "Cryptographic protocols",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://workingon.dev/#website",
        url: "https://workingon.dev",
        name: "workingon.dev",
        description:
          "Research notes on blockchain infrastructure, cryptography, distributed systems, and post-quantum security.",
        inLanguage: "en",
        author: { "@id": "https://workingon.dev/#person" },
        publisher: { "@id": "https://workingon.dev/#person" },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://workingon.dev/#profile",
        url: "https://workingon.dev",
        name: "Akshit",
        mainEntity: { "@id": "https://workingon.dev/#person" },
        isPartOf: { "@id": "https://workingon.dev/#website" },
      },
    ],
  };

  return (
    <div className="site-shell mx-auto grid h-dvh w-full max-w-[72rem] grid-rows-[auto_1fr_auto] overflow-hidden px-7 py-5 text-neutral-950 sm:px-12 sm:py-7 lg:px-20 lg:py-10 dark:text-neutral-100">
      <SiteHeader active="me" />

      <main className="grid min-h-0 content-center py-7 sm:py-10">
        <section
          aria-labelledby="introduction"
          className="grid items-center gap-7 sm:grid-cols-[minmax(0,32rem)_minmax(7.5rem,10rem)] sm:justify-between sm:gap-10 lg:grid-cols-[minmax(0,32rem)_12.5rem] lg:gap-20"
        >
          <div className="max-w-[32rem]">
            <h1 id="introduction" className="sr-only">
              About Akshit
            </h1>
            <p className="intro-primary text-[clamp(0.875rem,1.7vw,1rem)] leading-[1.75] tracking-[-0.015em] text-neutral-800 dark:text-neutral-200">
              I&apos;m Akshit. I work on blockchain infrastructure and study
              cryptography, distributed systems, and the machinery beneath their
              abstractions.
            </p>

            <p className="intro-secondary mt-4 text-[clamp(0.875rem,1.7vw,1rem)] leading-[1.75] tracking-[-0.015em] text-neutral-600 dark:text-neutral-400 sm:mt-5">
              I learn from first principles, build systems to test my
              understanding, and write about what survives the process.
            </p>

            <p className="intro-secondary mt-4 text-[clamp(0.875rem,1.7vw,1rem)] leading-[1.75] tracking-[-0.015em] text-neutral-600 dark:text-neutral-400 sm:mt-5">
              Currently, I&apos;m exploring post-quantum cryptography, blockchain
              security, wallets, and cryptographic protocols.
            </p>
          </div>

          <figure className="editorial-image justify-self-end overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={editorialStudy}
              alt="An abstract study of stone, metal, and fine connecting lines"
              priority
              sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 96px"
              className="h-full w-full object-cover grayscale opacity-90 transition-[filter,opacity] duration-300 dark:brightness-[0.72] dark:contrast-[1.06] dark:opacity-80"
            />
          </figure>
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
