import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "Privacy Policies",
    titlePT: "Políticas de Privacidade",
    descriptionENG: "Discover our privacy policies",
    descriptionPT: "Conheça as nossas políticas de privacidade",
    params: params.locale,
  });
}
