import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from ".";

export async function generateMetadata({
  params,
}: IlocalePage): Promise<Metadata> {
  const pars = await params;
  return LocalePageServices.metadatas({
    titleENG: "My Events",
    titlePT: "Meus Eventos",
    descriptionENG: "Manage your events",
    descriptionPT: "Gerencie seus eventos",
    params: pars.locale,
  });
}
