import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "Settings",
    titlePT: "Definições",
    descriptionENG: "Manage your account settings",
    descriptionPT: "Gerencie as definições da sua conta",
    params: params.locale,
  });
}
