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
    titleENG: "Event Organizer Dashboard",
    titlePT: "Painel do organizador",
    descriptionENG: "Manage your events gain",
    descriptionPT: "Gerencie os seus eventos",
    params: pars.locale,
  });
}
