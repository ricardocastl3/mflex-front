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
    titleENG: "My Affiliates",
    titlePT: "Meus afiliados",
    descriptionENG: "Manage your affliates",
    descriptionPT: "Gerencie os seus afiliados",
    params: pars.locale,
  });
}
