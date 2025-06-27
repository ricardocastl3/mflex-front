import { langByCookies } from "@/http/axios/api";
export { default } from ".";
import { Metadata } from "next";
import { ICreator } from "@/http/interfaces/models/fhouse/ICreator";
import { localImages } from "@/utils/images";
import { ECOOKIES } from "@/utils/enums";
import { cookies } from "next/headers";

import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  try {
    const pars = await params;
    const cookieSafe = await cookies();
    const authToken = cookieSafe.get(ECOOKIES.COOKIE_USER_AUTH_TOKEN)?.value;

    const resp = await axios.get<{ creator: ICreator }>(
      process.env.MFLEX_SERVER_URL + "/api/v1/creators",
      {
        params: {
          username: pars.username,
        },
        headers: {
          "accept-language": langByCookies,
          mf: authToken,
          origin: process.env.MFLEX_NEXT_PUBLIC_URL,
          "mf-server-token": `Karma ${process.env.MFLEX_SERVER_TOKEN}`,
        },
      }
    );

    const findCreator = resp.data.creator;

    return {
      title: `${findCreator.user.first_name} ${findCreator.user.last_name} | Marca Flex`,
      description: findCreator.biography,
      openGraph: {
        images: [
          {
            url: findCreator.user.photo || localImages.logos.flexUser.src,
            width: 1200,
            height: 630,
            alt: findCreator.user.first_name,
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
