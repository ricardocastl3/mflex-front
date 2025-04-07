import { langByCookies } from "@/http/axios/api";
export { default } from "./_index";

import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  try {
    const pars = await params;
    const resp = await axios.get(
      process.env.LINKS_SERVER_URL + "/api/v1" + "/events",
      {
        params: {
          id: pars.id,
        },
        headers: {
          "accept-language": langByCookies,
          origin: process.env.MFLEX_NEXT_PUBLIC_URL,
          "mf-server-token": `Karma ${process.env.MFLEX_SERVER_URL}`,
        },
      }
    );

    return {
      title: resp.data.event.title,
      description: resp.data.event.description,
    };
  } catch (err) {
    return {
      title: "404",
    };
  }
}
