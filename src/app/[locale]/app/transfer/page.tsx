import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export async function generateMetadata({ params }: IlocalePage): Promise<Metadata> {
  const pars = await params
  return LocalePageServices.metadatas({
    titleENG: "Transferences",
    titlePT: "Transferências",
    descriptionENG: "Manage your transferences",
    descriptionPT: "Gerencie suas transferências",
    params: pars.locale,
  });
}
