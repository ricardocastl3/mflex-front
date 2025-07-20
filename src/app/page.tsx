import { appConfigs } from "@/utils/enums";
import { Metadata } from "next";

export { default } from "./onload-pages/_load-tnotify";

export const metadata: Metadata = {
  title: "Marca Flex - Maior Plataforma de Entretenimento em África",
  description:
    "Somos a maior plataforma de entretenimento em África, onde você pode explorar podcasts, eventos e novidades imperdíveis.",
  other: {
    "facebook-domain-verification": "fhl85w2wbtsfn4tor3jzex1d5lxs80",
  },
};
