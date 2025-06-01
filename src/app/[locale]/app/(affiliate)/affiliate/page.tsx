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
    titleENG: "Afflite Dashboard",
    titlePT: "Painel do afiliado",
    descriptionENG: "Manage your affliate gain",
    descriptionPT: "Gerencie seus ganhos como afiliado",
    params: pars.locale,
  });
}
