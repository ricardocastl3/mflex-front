import { langByCookies } from "@/http/axios/api";
export { default } from ".";
import { Metadata } from "next";
import { IMusic } from "@/http/interfaces/models/artists/IMusic";

import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const pars = await params;
    const resp = await axios.get<{ music: IMusic }>(
      process.env.MFLEX_SERVER_URL + "/api/v1/artists/musics",
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

    const findMusic = resp.data.music;

    return {
      title: findMusic.title + " 📰 | Marca Flex",
      description: findMusic.description,
      openGraph: {
        images: [
          {
            url: findMusic.cover,
            width: 1200,
            height: 630,
            alt: findMusic.title,
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
