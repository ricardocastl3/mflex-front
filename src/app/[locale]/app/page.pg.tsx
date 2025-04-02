import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from "./home";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "Dashboard",
    titlePT: "Dashboard",
    descriptionENG: "Manage your books with quality",
    descriptionPT: "Gerencie seus livros com qualidade",
    params: params.locale,
  });
}
