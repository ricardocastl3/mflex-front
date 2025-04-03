import { langByCookies } from "@/http/axios/api";
export { default } from ".";

import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  try {
    const { id, locale } = await params;
    const resp = await axios.get(
      process.env.LINKS_SERVER_URL + "/api/v1" + "/products/checkout",
      {
        params: {
          id,
        },
        headers: {
          "accept-language": langByCookies,
          origin: process.env.LINKS_NEXT_PUBLIC_URL,
          "bp-server-token": `Noah ${process.env.LINKS_SERVER_TOKEN}`,
        },
      }
    );

    return {
      title: resp.data.product.title,
      description: resp.data.description,
    };
  } catch (err) {
    return {
      title: "404",
    };
  }
}
