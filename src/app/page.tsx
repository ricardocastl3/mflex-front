import { appConfigs } from "@/utils/enums";
import { Metadata } from "next";

export { default } from "./onload-pages/_load-tnotify";

export const metadata: Metadata = {
  title: appConfigs.title + " - Maior Plataforma de Entretenimento em África",
  description: "Sejam bem-vindo ao seu universo do entretenimento 🚀",
  other: {
    "facebook-domain-verification": "fhl85w2wbtsfn4tor3jzex1d5lxs80",
  },
};
