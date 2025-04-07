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
    titleENG: "PodFlex 🎙️",
    titlePT: "PodFlex 🎙️",
    descriptionENG: "The best podcasts for you 🚀",
    descriptionPT: "Os melhores podcasts para você 🚀",
    params: pars.locale,
  });
}
