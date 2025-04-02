import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "PodFlex 🎙️",
    titlePT: "PodFlex 🎙️",
    descriptionENG: "The best podcasts for you 🚀",
    descriptionPT: "Os melhores podcasts para você 🚀",
    params: params.locale,
  });
}
