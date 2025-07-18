import { langByCookies } from "@/http/axios/api";
import { INews } from "@/http/interfaces/models/INews";
export { default } from ".";
import { Metadata } from "next";

import axios from "axios";
import { ITVMovie } from "@/http/interfaces/models/tv/ITVMovie";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const pars = await params;
    const resp = await axios.get<{ mv: ITVMovie }>(
      process.env.MFLEX_SERVER_URL + "/api/v1/movies/mv",
      {
        params: {
          id: pars.id,
        },
        headers: {
          "accept-language": langByCookies,
          origin: process.env.MFLEX_NEXT_PUBLIC_URL,
          "mf-server-token": `Karma ${process.env.MFLEX_SERVER_TOKEN}`,
        },
      }
    );

    const findMovie = resp.data.mv;

    const description =
      langByCookies == "en"
        ? `Watch ${findMovie.name} no Marca Flex 👌📺`
        : `Acompanhe ${findMovie.name} na Marca Flex 👌📺`;

    return {
      title: findMovie.name + " 📺 | Marca Flex",
      description,
      openGraph: {
        images: [
          {
            url: findMovie.thumbnail,
            width: 1200,
            height: 630,
            alt: findMovie.name,
          },
        ],
      },
    };
  } catch (err) {
    return {
      title: "404",
    };
  }
}
