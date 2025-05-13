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
    titleENG: "Flex Plans 🚀",
    titlePT: "Planos FLEX 🚀",
    descriptionENG: "Subscribe to the best plans for the best features 🚀",
    descriptionPT: "Subscreva ao melhores planos para os melhores recursos 🚀",
    params: pars.locale,
  });
}
