import { langByCookies } from "@/http/axios/api";
import { IEvent } from "@/http/interfaces/models/IEvent";
import { NextResponse } from "next/server";
import { Metadata } from "next";

import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const slug = (await params).slug;

    const resp = await axios.get<{ event: IEvent }>(
      process.env.MFLEX_SERVER_URL + "/api/v1" + "/events/" + slug,
      {
        headers: {
          "accept-language": langByCookies,
          origin: process.env.MFLEX_NEXT_PUBLIC_URL,
          "mf-server-token": `Karma ${process.env.MFLEX_SERVER_TOKEN}`,
        },
      }
    );

    const findEvent = resp.data.event;

    return {
      title: findEvent.title + " 🟡 | Marca Flex",
      description: findEvent.description,
      openGraph: {
        images: [
          {
            url: findEvent.image_url,
            width: 1200,
            height: 630,
            alt: findEvent.title,
          },
        ],
      },
    };
  } catch (err) {
    console.log(err);

    return {
      title: "404",
      description: "404",
    };
  }
}

export { default } from ".";
