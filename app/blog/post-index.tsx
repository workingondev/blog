"use client";

import Link from "next/link";
import { useState } from "react";
import { postTopics, type PostTopic } from "@/content/blog/posts";

type PostSummary = {
  slug: string;
  title: string;
  description: string;
  published: string;
  readingTime: string;
  topic: PostTopic;
  tags: string[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function PostIndex({ posts }: { posts: PostSummary[] }) {
  const [activeTopic, setActiveTopic] = useState<PostTopic | "All">("All");

  if (posts.length === 0) {
    return (
      <section aria-labelledby="writing-index" className="mt-12 sm:mt-14">
        <h2
          id="writing-index"
          className="text-[1.125rem] font-normal leading-6 tracking-[-0.025em]"
        >
          Nothing published yet.
        </h2>
        <p className="mt-2 max-w-[29rem] text-[0.9375rem] leading-6 text-neutral-600 dark:text-neutral-400">
          New writing will appear here soon.
        </p>
      </section>
    );
  }

  const topics = postTopics.filter((topic) =>
    posts.some((post) => post.topic === topic),
  );
  const visiblePosts =
    activeTopic === "All"
      ? posts
      : posts.filter((post) => post.topic === activeTopic);

  return (
    <section aria-labelledby="writing-index" className="mt-12 sm:mt-14">
      <h2 id="writing-index" className="sr-only">
        Browse writing
      </h2>

      <div className="flex items-center justify-between gap-6">
        <div
          aria-label="Filter writing by topic"
          className="topic-filter flex max-w-full gap-5 overflow-x-auto"
        >
          {(["All", ...topics] as const).map((topic) => {
            const count =
              topic === "All"
                ? posts.length
                : posts.filter((post) => post.topic === topic).length;
            const isActive = activeTopic === topic;

            return (
              <button
                aria-pressed={isActive}
                className="topic-filter-button shrink-0 text-sm"
                key={topic}
                onClick={() => setActiveTopic(topic)}
                type="button"
              >
                {topic}
                <span
                  aria-hidden="true"
                  className="ml-1.5 align-top text-[0.625rem] tabular-nums"
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="hidden shrink-0 text-[0.6875rem] tabular-nums text-neutral-500 sm:block dark:text-neutral-500"
        >
          {visiblePosts.length} {visiblePosts.length === 1 ? "article" : "articles"}
        </p>
      </div>

      <div className="blog-index-list mt-10 sm:mt-14">
        {visiblePosts.map((post) => (
          <article key={post.slug} className="blog-index-item max-w-[36rem]">
            <div className="mb-3 flex flex-wrap items-center gap-x-2 text-[0.6875rem] leading-5 text-neutral-500 dark:text-neutral-500">
              <span>{post.topic}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>

            <h3 className="text-[1.125rem] font-normal leading-6 tracking-[-0.025em]">
              <Link className="article-link" href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 max-w-[33rem] text-[0.9375rem] leading-6 text-neutral-600 dark:text-neutral-400">
              {post.description}
            </p>
            <ul
              aria-label={`Tags for ${post.title}`}
              className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.6875rem] leading-5 tracking-[0.01em] text-neutral-500 dark:text-neutral-500"
            >
              {post.tags.slice(0, 3).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
