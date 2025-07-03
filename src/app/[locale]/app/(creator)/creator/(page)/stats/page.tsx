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
    titleENG: "Statistics",
    titlePT: "Estatísticas",
    descriptionENG: "Your creator panel statistics",
    descriptionPT: "Estatísticas do seu painel de criador",
    params: pars.locale,
  });
}
