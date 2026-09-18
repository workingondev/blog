import { getAllPosts } from "@/content/blog/posts";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();
  const latestUpdate = posts.reduce(
    (latest, post) => {
      const date = new Date(post.updated ?? post.published);
      return date > latest ? date : latest;
    },
    new Date("2026-09-18"),
  );
  const items = posts
    .map((post) => {
      const url = `https://workingon.dev/blog/${post.slug}`;

      return `
    <entry>
      <title>${escapeXml(post.title)}</title>
      <id>${url}</id>
      <link href="${url}" />
      <published>${new Date(post.published).toISOString()}</published>
      <updated>${new Date(post.updated ?? post.published).toISOString()}</updated>
      <summary>${escapeXml(post.description)}</summary>
      ${post.tags.map((tag) => `<category term="${escapeXml(tag)}" />`).join("\n      ")}
    </entry>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>writing — akshit</title>
  <subtitle>Essays and notes on technology, design, marketing, building, research, and internet culture.</subtitle>
  <id>https://workingon.dev/blog</id>
  <link href="https://workingon.dev/blog" />
  <link href="https://workingon.dev/feed.xml" rel="self" type="application/atom+xml" />
  <updated>${latestUpdate.toISOString()}</updated>
  <author><name>akshit</name><uri>https://workingon.dev</uri></author>${items}
</feed>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
