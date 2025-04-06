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
    titleENG: "My Tickets",
    titlePT: "Meus Ingressos",
    descriptionENG: "Manage your tickets",
    descriptionPT: "Gerencie seus ingressos",
    params: pars.locale,
  });
}
