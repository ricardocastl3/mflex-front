import { langByCookies } from "@/http/axios/api";
export { default } from ".";
import { Metadata } from "next";
import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";

import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>;
}): Promise<Metadata> {
  try {
    const pars = await params;
    const resp = await axios.get<{ post: ICreatorPost }>(
      process.env.MFLEX_SERVER_URL + "/api/v1/shares/ctr-post",
      {
        params: {
          id: pars.post,
        },
        headers: {
          "accept-language": langByCookies,
          origin: process.env.MFLEX_NEXT_PUBLIC_URL,
          "mf-server-token": `Karma ${process.env.MFLEX_SERVER_TOKEN}`,
        },
      }
    );

    const findPost = resp.data.post;

    const title = `${langByCookies == "pt" ? "Post by" : "Publicação de"}: ${
      findPost.author?.user.first_name
    } ${findPost.author?.user.last_name}`;

    return {
      title: title + " 📰 | Marca Flex",
      description: findPost.description,
      ...(findPost.image && {
        openGraph: {
          images: [
            {
              url: findPost.image,
              width: 1200,
              height: 630,
              alt: findPost.title,
            },
          ],
        },
      }),
      ...(findPost.type == "reel" && {
        openGraph: {
          videos: [
            {
              url: findPost.reel_url!,
              width: 1200,
              height: 630,
            },
          ],
        },
      }),
    };
  } catch (err) {
    return {
      title: "404",
    };
  }
}
