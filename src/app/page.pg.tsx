import { appConfigs } from "@/utils/enums";
import { Metadata } from "next";

export { default } from "./onload-pages/load-tnotify";

export const metadata: Metadata = {
  title: appConfigs.title,
  description: "Muito bem-vindo ao seu gestor de links de pagmento",
};
