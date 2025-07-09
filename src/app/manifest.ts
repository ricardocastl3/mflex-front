import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marca Flex",
    short_name: "Marca Flex",
    description: "As melhores novidades você encontra aqui.",
    start_url: "/",
    display: "standalone",
    background_color: "#0000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
