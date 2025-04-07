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
    titleENG: "FAQs",
    titlePT: "FAQs",
    descriptionENG: "Find out which questions are most frequently asked",
    descriptionPT: "Saiba quais perguntas são mais frequentes",
    params: pars.locale,
  });
}
