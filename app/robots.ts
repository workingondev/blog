import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://workingon.dev/sitemap.xml",
    host: "https://workingon.dev",
  };
}
