import { langByCookies } from "@/http/axios/api";
import { INews } from "@/http/interfaces/models/INews";

import axios from "axios";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allNews = await axios.get<{ news: INews[] }>(
    process.env.MFLEX_SERVER_URL + "/api/v1/news",
    {
      params: {
        currentPage: 0,
        nextPage: 49999,
      },
      headers: {
        "accept-language": langByCookies,
        origin: process.env.MFLEX_NEXT_PUBLIC_URL,
        "mf-server-token": `Karma ${process.env.MFLEX_SERVER_TOKEN}`,
      },
    }
  );

  const BASE_URL = process.env.MFLEX_NEXT_PUBLIC_URL;

  const newsSitemap = allNews.data.news.map((news) => ({
    url: `${BASE_URL}/pt/news/${news.slug}`,
    alternates: {
      languages: {
        pt: `${BASE_URL}/pt/news/${news.slug}`,
        en: `${BASE_URL}/en/news/${news.slug}`,
      },
    },
    ...(news.updated_at && { lastModified: news.updated_at }),
  }));

  return [
    {
      url: `${BASE_URL}`,
      lastModified: "2025-07-10",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/pt`,
      lastModified: "2025-07-10",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: "2025-07-10",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pt/events`,
      lastModified: "2025-07-10",
      changeFrequency: "hourly",
      priority: 0.8,
      alternates: { 
        languages: {
          pt: `${BASE_URL}/pt/events`,
          en: `${BASE_URL}/en/events`,
        },
      },
    },
    {
      url: `${BASE_URL}/pt/news`,
      lastModified: "2025-07-10",
      changeFrequency: "hourly",
      priority: 0.8,
      alternates: {
        languages: {
          pt: `${BASE_URL}/pt/news`,
          en: `${BASE_URL}/en/news`,
        },
      },
    },
    {
      url: `${BASE_URL}/pt/musics`,
      lastModified: "2025-07-10",
      changeFrequency: "hourly",
      priority: 0.8,
      alternates: {
        languages: {
          pt: `${BASE_URL}/pt/musics`,
          en: `${BASE_URL}/en/musics`,
        },
      },
    },
    {
      url: `${BASE_URL}/pt/podflex`,
      lastModified: "2025-07-10",
      changeFrequency: "hourly",
      priority: 0.8,
      alternates: {
        languages: {
          pt: `${BASE_URL}/pt/podflex`,
          en: `${BASE_URL}/en/podflex`,
        },
      },
    },
    ...newsSitemap,
  ];
}
