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
    titleENG: "About Us 💡",
    titlePT: "Sobre nós 💡",
    descriptionENG: "Discover who are we 🚀",
    descriptionPT: "Descubra quem somos 🚀",
    params: pars.locale,
  });
}
