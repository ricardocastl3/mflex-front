import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "Terms of Use",
    titlePT: "Termos de Uso",
    descriptionENG: "Discover our terms of uses",
    descriptionPT: "Conheça os nossos termos de uso",
    params: params.locale,
  });
}
