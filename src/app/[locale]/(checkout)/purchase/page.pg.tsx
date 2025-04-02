import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "Thanks!",
    titlePT: "Obrigado!",
    descriptionENG: "Thanks for buy",
    descriptionPT: "Obrigado por comprar",
    params: params.locale,
  });
}
