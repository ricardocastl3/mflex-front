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
    titleENG: "Affiliate Dashboard",
    titlePT: "Painel do afiliado",
    descriptionENG: "Manage your events gain",
    descriptionPT: "Gerencie as suas comissões",
    params: pars.locale,
  });
}
