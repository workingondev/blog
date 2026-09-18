import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/content/blog/posts";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical writing and research notes on cryptography, blockchains, distributed systems, wallets, protocols, and post-quantum security.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/atom+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Writing — Akshit",
    description:
      "Technical writing and research notes on cryptography, blockchains, distributed systems, wallets, protocols, and post-quantum security.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Akshit",
    description:
      "Technical writing and research notes on cryptography, blockchains, distributed systems, wallets, protocols, and post-quantum security.",
    images: ["/opengraph-image"],
  },
};

const researchThreads = [
  {
    title: "Post-quantum cryptography",
    description:
      "Quantum threats, signature migration, ML-KEM, ML-DSA, SLH-DSA, and what they mean for public blockchains.",
    topics: ["Shor’s algorithm", "digital signatures", "migration"],
  },
  {
    title: "Wallets and account systems",
    description:
      "Key management, smart accounts, recovery, signing interfaces, and the security boundaries users rarely see.",
    topics: ["wallet security", "account abstraction", "key management"],
  },
  {
    title: "Protocols and infrastructure",
    description:
      "The distributed systems beneath networks: consensus, interoperability, verification, and operational failure modes.",
    topics: ["consensus", "interoperability", "infrastructure"],
  },
] as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://workingon.dev/blog#blog",
    url: "https://workingon.dev/blog",
    name: "Writing — Akshit",
    description:
      "Technical writing and research notes on cryptography, blockchains, distributed systems, wallets, protocols, and post-quantum security.",
    inLanguage: "en",
    author: {
      "@type": "Person",
      "@id": "https://workingon.dev/#person",
      name: "Akshit",
      url: "https://workingon.dev",
    },
    publisher: { "@id": "https://workingon.dev/#person" },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://workingon.dev/blog/${post.slug}`,
      datePublished: post.published,
      dateModified: post.updated ?? post.published,
    })),
  };

  return (
    <div className="page-shell grid grid-rows-[auto_1fr_auto] text-neutral-950 dark:text-neutral-100">
      <SiteHeader active="blog" />

      <main className="py-20 sm:py-24 lg:py-28">
        <div className="max-w-[46rem]">
          <header className="max-w-[35rem]">
            <p className="mb-4 text-[0.6875rem] tracking-[0.08em] text-neutral-500 uppercase dark:text-neutral-500">
              Research notebook
            </p>
            <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.04em]">
              Writing
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-7 tracking-[-0.01em] text-neutral-600 dark:text-neutral-400 sm:text-base">
              Long-form notes about cryptographic systems, blockchains, and the
              infrastructure around them. Written to make difficult ideas more
              inspectable, not merely simpler.
            </p>
          </header>

          <section aria-labelledby="published-writing" className="mt-16 sm:mt-20">
            <h2
              id="published-writing"
              className="mb-1 text-[0.6875rem] font-normal tracking-[0.08em] text-neutral-500 uppercase dark:text-neutral-500"
            >
              Published
            </h2>

            <div>
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="rule grid gap-3 border-t py-6 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-7"
                >
                  <div className="text-[0.6875rem] leading-5 text-neutral-500 dark:text-neutral-500">
                    <time dateTime={post.published}>{formatDate(post.published)}</time>
                    <span className="block">{post.readingTime}</span>
                  </div>
                  <div>
                    <h3 className="text-[0.9375rem] font-normal leading-6 tracking-[-0.015em]">
                      <Link className="article-link" href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 max-w-[31rem] text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                      {post.description}
                    </p>
                    <ul
                      aria-label={`Topics in ${post.title}`}
                      className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.6875rem] leading-5 text-neutral-500 dark:text-neutral-500"
                    >
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <li key={tag}>
                          {index > 0 && <span aria-hidden="true">· </span>}
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="research-threads" className="mt-16 sm:mt-20">
            <h2
              id="research-threads"
              className="mb-1 text-[0.6875rem] font-normal tracking-[0.08em] text-neutral-500 uppercase dark:text-neutral-500"
            >
              Research threads
            </h2>

            <div>
              {researchThreads.map((thread) => (
                <article
                  key={thread.title}
                  className="rule grid gap-3 border-t py-6 sm:grid-cols-[12rem_1fr] sm:gap-8 sm:py-7"
                >
                  <h3 className="text-[0.9375rem] font-normal leading-6 tracking-[-0.015em]">
                    {thread.title}
                  </h3>
                  <div>
                    <p className="max-w-[31rem] text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                      {thread.description}
                    </p>
                    <ul
                      aria-label={`Topics in ${thread.title}`}
                      className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.6875rem] leading-5 text-neutral-500 dark:text-neutral-500"
                    >
                      {thread.topics.map((topic, index) => (
                        <li key={topic}>
                          {index > 0 && <span aria-hidden="true">· </span>}
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

          </section>
        </div>
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
