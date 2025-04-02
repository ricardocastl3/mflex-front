import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "News 📰",
    titlePT: "Novidades 📰",
    descriptionENG: "The most recent news for your 🚀",
    descriptionPT: "As novidades mais recentes do momento🚀",
    params: params.locale,
  });
}
