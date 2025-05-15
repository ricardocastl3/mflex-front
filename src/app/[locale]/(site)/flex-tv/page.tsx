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
    titleENG: "Flex TV 📺",
    titlePT: "Planos FLEX 📺",
    descriptionENG: "Watch TV anywhere where you want",
    descriptionPT: "Assista ao seus canais favoritos onde você quisers",
    params: pars.locale,
  });
}
