import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "Transactions",
    titlePT: "Transações",
    descriptionENG: "Manage your transactions",
    descriptionPT: "Gerencie as suas transações",
    params: params.locale,
  });
}
