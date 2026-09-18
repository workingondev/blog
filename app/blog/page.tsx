import type { Metadata } from "next";
import { getAllPosts } from "@/content/blog/posts";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { PostIndex } from "./post-index";

export const metadata: Metadata = {
  title: "writing",
  description:
    "Essays and notes on technology, design, marketing, building, research, internet culture, and whatever akshit is learning next.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/atom+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "writing — akshit",
    description:
      "Essays and notes on technology, design, marketing, building, research, and internet culture.",
    images: [
      {
        url: "/blog/opengraph-image",
        width: 1200,
        height: 630,
        alt: "writing by akshit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "writing — akshit",
    description:
      "Essays and notes on technology, design, marketing, building, research, and internet culture.",
    images: ["/blog/twitter-image"],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://workingon.dev/blog#blog",
    url: "https://workingon.dev/blog",
    name: "writing — akshit",
    description:
      "Essays and notes on technology, design, marketing, building, research, and internet culture.",
    inLanguage: "en",
    author: {
      "@type": "Person",
      "@id": "https://workingon.dev/#person",
      name: "akshit",
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

      <main className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[46rem]">
          <header className="max-w-[34rem]">
            <h1 className="text-[clamp(1.75rem,4vw,2.25rem)] font-normal leading-[1.15] tracking-[-0.04em]">
              writing
            </h1>
            <p className="mt-4 text-[0.9375rem] leading-7 tracking-[-0.01em] text-neutral-600 dark:text-neutral-400 sm:text-base">
              Things I&apos;m trying to understand, build, or explain from
              technical systems and design to marketing, distribution, and
              internet culture.
            </p>
          </header>
          <PostIndex posts={posts} />
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
