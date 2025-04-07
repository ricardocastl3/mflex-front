import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from "./_index";

export async function generateMetadata({
  params,
}: IlocalePage): Promise<Metadata> {
  const pars = await params;
  return LocalePageServices.metadatas({
    titleENG: "Terms of Use",
    titlePT: "Termos de Uso",
    descriptionENG: "Discover our terms of uses",
    descriptionPT: "Conheça os nossos termos de uso",
    params: pars.locale,
  });
}
