import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/app/*",
    },
    sitemap: process.env.MFLEX_NEXT_PUBLIC_URL + "/sitemap.xml",
  };
}
