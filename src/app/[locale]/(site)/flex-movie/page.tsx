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
    titleENG: "Flex Movie  🎬",
    titlePT: "Flex Movie 🎬",
    descriptionENG: "Watch your favourite movies anywhere where you want",
    descriptionPT: "Assista aos seus filmes favoritos onde você quisers",
    params: pars.locale,
  });
}
