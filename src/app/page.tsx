import { appConfigs } from "@/utils/enums";
import { Metadata } from "next";

export { default } from "./onload-pages/_load-tnotify";

export const metadata: Metadata = {
  title: appConfigs.title,
  description: "Marca Flex, marketing & publicidade ao seu alance 🚀 ",
  other: {
    "facebook-domain-verification": "fhl85w2wbtsfn4tor3jzex1d5lxs80",
  },
};
