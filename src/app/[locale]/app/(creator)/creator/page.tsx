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
    titleENG: "Creator Panel",
    titlePT: "Painel do Criador",
    descriptionENG: "Manage your posts and videos",
    descriptionPT: "Gerencie suas publicações e vídeos",
    params: pars.locale,
  });
}
