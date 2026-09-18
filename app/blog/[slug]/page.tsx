import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPost,
  isPostSlug,
  postSlugs,
} from "@/content/blog/posts";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const dynamicParams = false;

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  if (!isPostSlug(slug)) return {};

  const { metadata } = await getPost(slug);
  const url = `/blog/${slug}`;

  return {
    title: metadata.title,
    description: metadata.description,
    authors: [{ name: metadata.author, url: "/" }],
    category: metadata.category,
    alternates: {
      canonical: url,
      types: {
        "application/atom+xml": "/feed.xml",
      },
    },
    openGraph: {
      type: "article",
      url,
      title: metadata.title,
      description: metadata.description,
      publishedTime: metadata.published,
      modifiedTime: metadata.updated ?? metadata.published,
      authors: ["https://workingon.dev"],
      section: metadata.category,
      tags: metadata.tags,
      images: [
        {
          url: `${url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [`${url}/twitter-image`],
    },
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function ArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;

  if (!isPostSlug(slug)) notFound();

  const [{ default: Post, metadata }, posts] = await Promise.all([
    getPost(slug),
    getAllPosts(),
  ]);
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  const previous = posts[currentIndex + 1];
  const next = posts[currentIndex - 1];
  const related = posts
    .filter(
      (post) =>
        post.slug !== slug && post.tags.some((tag) => metadata.tags.includes(tag)),
    )
    .slice(0, 2);
  const canonicalUrl = `https://workingon.dev/blog/${slug}`;
  const readingMinutes = Number.parseInt(metadata.readingTime, 10);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        headline: metadata.title,
        description: metadata.description,
        datePublished: metadata.published,
        dateModified: metadata.updated ?? metadata.published,
        inLanguage: "en",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        image: {
          "@type": "ImageObject",
          url: `${canonicalUrl}/opengraph-image`,
          width: 1200,
          height: 630,
        },
        author: {
          "@type": "Person",
          "@id": "https://workingon.dev/#person",
          name: metadata.author,
          url: "https://workingon.dev",
        },
        publisher: { "@id": "https://workingon.dev/#person" },
        isPartOf: { "@id": "https://workingon.dev/blog#blog" },
        articleSection: metadata.category,
        keywords: metadata.tags.join(", "),
        timeRequired: Number.isNaN(readingMinutes)
          ? undefined
          : `PT${readingMinutes}M`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://workingon.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "writing",
            item: "https://workingon.dev/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: metadata.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="page-shell grid grid-rows-[auto_1fr_auto] text-neutral-950 dark:text-neutral-100">
      <SiteHeader active="blog" />

      <main className="py-16 sm:py-20 lg:py-24">
        <article>
          <div className="article-layout">
            <aside className="article-toc hidden lg:block" aria-label="On this page">
              <p className="mb-4 text-[0.6875rem] tracking-[0.08em] text-neutral-500">
                On this page
              </p>
              <ol className="space-y-2.5 text-[0.75rem] leading-5 text-neutral-500 dark:text-neutral-500">
                {metadata.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a className="toc-link" href={`#${item.id}`}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="min-w-0 max-w-[43rem]">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-2 text-[0.6875rem] text-neutral-500">
                  <li>
                    <Link className="footer-link" href="/blog">
                      writing
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>{metadata.category.toLowerCase()}</li>
                </ol>
              </nav>

              <header>
                <h1 className="max-w-[42rem] text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.045em]">
                  {metadata.title}
                </h1>
                <p className="mt-6 max-w-[39rem] text-[1rem] leading-7 text-neutral-600 dark:text-neutral-400 sm:text-[1.0625rem]">
                  {metadata.description}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] text-neutral-500 dark:text-neutral-500">
                  <span>By {metadata.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={metadata.published}>
                    {formatDate(metadata.published)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{metadata.readingTime}</span>
                  {metadata.updated && metadata.updated !== metadata.published && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Updated {formatDate(metadata.updated)}</span>
                    </>
                  )}
                </div>
              </header>

              <details className="rule mt-10 border-y py-4 lg:hidden">
                <summary className="cursor-pointer text-xs text-neutral-600 dark:text-neutral-400">
                  On this page
                </summary>
                <ol className="mt-4 space-y-2 text-xs leading-5 text-neutral-500">
                  {metadata.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a className="toc-link" href={`#${item.id}`}>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              <div className="article-prose mt-14">
                <Post />
              </div>

              {related.length > 0 && (
                <section className="rule mt-16 border-t pt-8" aria-labelledby="related-writing">
                  <h2
                    id="related-writing"
                    className="text-[0.6875rem] font-normal tracking-[0.08em] text-neutral-500"
                  >
                    Related writing
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {related.map((post) => (
                      <li key={post.slug}>
                        <Link className="article-link text-sm" href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {(previous || next) && (
                <nav
                  aria-label="Article pagination"
                  className="rule mt-10 grid gap-6 border-t pt-8 sm:grid-cols-2"
                >
                  <div>
                    {previous && (
                      <Link className="group block" href={`/blog/${previous.slug}`}>
                        <span className="text-[0.6875rem] text-neutral-500">Previous</span>
                        <span className="mt-1 block text-sm leading-6 group-hover:text-neutral-500 dark:group-hover:text-neutral-400">
                          {previous.title}
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className="sm:text-right">
                    {next && (
                      <Link className="group block" href={`/blog/${next.slug}`}>
                        <span className="text-[0.6875rem] text-neutral-500">Next</span>
                        <span className="mt-1 block text-sm leading-6 group-hover:text-neutral-500 dark:group-hover:text-neutral-400">
                          {next.title}
                        </span>
                      </Link>
                    )}
                  </div>
                </nav>
              )}
            </div>
          </div>
        </article>
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
