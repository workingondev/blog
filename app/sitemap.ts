import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-09-18");
  const posts = await getAllPosts();

  return [
    {
      url: "https://workingon.dev",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: ["https://workingon.dev/images/editorial-study.png"],
    },
    {
      url: "https://workingon.dev/blog",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://workingon.dev/now",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...posts.map((post) => ({
      url: `https://workingon.dev/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.published),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
