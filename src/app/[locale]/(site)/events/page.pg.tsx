import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "Events 🌟",
    titlePT: "Eventos 🌟",
    descriptionENG: "The best events for you 🚀",
    descriptionPT: "Os melhores eventos para vocês 🚀",
    params: params.locale,
  });
}
