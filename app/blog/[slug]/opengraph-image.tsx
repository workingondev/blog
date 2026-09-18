import { ImageResponse } from "next/og";
import { getPost, isPostSlug } from "@/content/blog/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Research article on workingon.dev";

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const metadata = isPostSlug(slug)
    ? (await getPost(slug)).metadata
    : {
        title: "Research notes",
        category: "workingon.dev",
        description: "Technical research from first principles.",
      };
  const titleSize = metadata.title.length > 48 ? 54 : 64;

  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#fafafa",
        color: "#171717",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "68px 78px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          fontSize: 22,
          justifyContent: "space-between",
        }}
      >
        <span>akshit</span>
        <span style={{ color: "#737373", fontSize: 18 }}>
          {metadata.category.toLowerCase()}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            letterSpacing: "-2.5px",
            lineHeight: 1.06,
          }}
        >
          {metadata.title}
        </div>
        <div
          style={{
            color: "#737373",
            display: "flex",
            fontSize: 22,
            lineHeight: 1.35,
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {metadata.description}
        </div>
      </div>

      <div style={{ color: "#737373", display: "flex", fontSize: 19 }}>
        workingon.dev
      </div>
    </div>,
    size,
  );
}
