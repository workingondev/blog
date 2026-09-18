import type { ComponentType } from "react";

export type TableOfContentsItem = {
  id: string;
  title: string;
  level?: 2 | 3;
};

export type PostMetadata = {
  title: string;
  description: string;
  published: string;
  updated?: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  tableOfContents: TableOfContentsItem[];
};

type PostModule = {
  default: ComponentType;
  metadata: PostMetadata;
};

const postLoaders = {
  "what-is-post-quantum-cryptography": () =>
    import("./what-is-post-quantum-cryptography.mdx"),
  "why-quantum-computers-threaten-ecdsa": () =>
    import("./why-quantum-computers-threaten-ecdsa.mdx"),
} as const;

export type PostSlug = keyof typeof postLoaders;

export const postSlugs = Object.keys(postLoaders) as PostSlug[];

export function isPostSlug(slug: string): slug is PostSlug {
  return slug in postLoaders;
}

export async function getPost(slug: PostSlug): Promise<PostModule> {
  return postLoaders[slug]() as Promise<PostModule>;
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
