import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/pt",
        "/en",
        "/football",
        "/musics",
        "/news",
        "/events",
        "/flex-tv",
        "/podflex",
      ],
      crawlDelay: 1,
      disallow: "/app/*",
    },
    sitemap: process.env.MFLEX_NEXT_PUBLIC_URL + "/sitemap.xml",
  };
}
