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
    titleENG: "Privacy Policies",
    titlePT: "Políticas de Privacidade",
    descriptionENG: "Discover our privacy policies",
    descriptionPT: "Conheça as nossas políticas de privacidade",
    params: pars.locale,
  });
}
