import { langByCookies } from "@/http/axios/api";
import { IPodcast } from "@/http/interfaces/models/IPodCast";
export { default } from ".";

import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const pars = await params;
    const resp = await axios.get<{ podcast: IPodcast }>(
      process.env.MFLEX_SERVER_URL + "/api/v1" + "/podcasts",
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

    const findPodflex = resp.data.podcast;

    return {
      title: findPodflex.title + " 🎙️ | Marca Flex",
      description: findPodflex.description,
    };
  } catch (err) {
    return {
      title: "404",
    };
  }
}
