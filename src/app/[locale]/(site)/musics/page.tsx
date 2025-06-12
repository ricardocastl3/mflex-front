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
    titleENG: "Musics 🎼",
    titlePT: "Músicas 🎼",
    descriptionENG: "The best musics for you 🚀",
    descriptionPT: "As melhores músicas para você 🚀",
    params: pars.locale,
  });
}
