import { langByCookies } from "@/http/axios/api";
import { INews } from "@/http/interfaces/models/INews";
export { default } from ".";

import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const pars = await params;
    const resp = await axios.get<{ news: INews }>(
      process.env.MFLEX_SERVER_URL + "/api/v1/news",
      {
        params: {
          slug: pars.slug,
        },
        headers: {
          "accept-language": langByCookies,
          origin: process.env.MFLEX_NEXT_PUBLIC_URL,
          "mf-server-token": `Karma ${process.env.MFLEX_SERVER_TOKEN}`,
        },
      }
    );

    const findNews = resp.data.news;

    return {
      title: findNews.title + "📰 | Marca Flex",
      description: findNews.content,
    };
  } catch (err) {
    return {
      title: "404",
    };
  }
}
