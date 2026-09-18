import type { ComponentType } from "react";

export type TableOfContentsItem = {
  id: string;
  title: string;
  level?: 2 | 3;
};

export const postTopics = ["Tech", "Design", "Marketing", "Random"] as const;

export type PostTopic = (typeof postTopics)[number];

export type PostMetadata = {
  title: string;
  description: string;
  published: string;
  updated?: string;
  author: string;
  category: string;
  topic: PostTopic;
  tags: string[];
  readingTime: string;
  tableOfContents: TableOfContentsItem[];
};

type PostModule = {
  default: ComponentType;
  metadata: PostMetadata;
};

const postLoaders: Record<string, () => Promise<PostModule>> = {
  "why-we-need-post-quantum-cryptography": () =>
    import("./why-we-need-post-quantum-cryptography.mdx"),
};

export type PostSlug = string;

export const postSlugs = Object.keys(postLoaders);

export function isPostSlug(slug: string): slug is PostSlug {
  return slug in postLoaders;
}

function validateMetadata(slug: PostSlug, metadata: PostMetadata) {
  const requiredText = [
    ["title", metadata.title],
    ["description", metadata.description],
    ["author", metadata.author],
    ["category", metadata.category],
    ["readingTime", metadata.readingTime],
  ] as const;

  for (const [field, value] of requiredText) {
    if (!value.trim()) {
      throw new Error(`Blog post "${slug}" is missing ${field}.`);
    }
  }

  const published = Date.parse(metadata.published);
  const updated = metadata.updated ? Date.parse(metadata.updated) : published;

  if (Number.isNaN(published) || Number.isNaN(updated)) {
    throw new Error(`Blog post "${slug}" has an invalid publication date.`);
  }

  if (updated < published) {
    throw new Error(`Blog post "${slug}" is updated before it was published.`);
  }

  if (metadata.tags.length === 0) {
    throw new Error(`Blog post "${slug}" must have at least one tag.`);
  }

  if (!postTopics.includes(metadata.topic)) {
    throw new Error(`Blog post "${slug}" has an invalid topic.`);
  }

  const tocIds = metadata.tableOfContents.map((item) => item.id);

  if (new Set(tocIds).size !== tocIds.length) {
    throw new Error(`Blog post "${slug}" has duplicate table-of-contents IDs.`);
  }
}

export async function getPost(slug: PostSlug): Promise<PostModule> {
  const loader = postLoaders[slug];

  if (!loader) {
    throw new Error(`Blog post "${slug}" does not exist.`);
  }

  const post = await loader();
  validateMetadata(slug, post.metadata);
  return post;
}

export async function getAllPosts() {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const { metadata } = await getPost(slug);
      return { slug, ...metadata };
    }),
  );

  return posts.sort(
    (a, b) =>
      new Date(b.published).getTime() - new Date(a.published).getTime(),
  );
}
