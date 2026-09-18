declare module "*.mdx" {
  import type { PostMetadata } from "@/content/blog/posts";

  export const metadata: PostMetadata;
}
