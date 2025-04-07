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
    titleENG: "Events 🌟",
    titlePT: "Eventos 🌟",
    descriptionENG: "The best events for you 🚀",
    descriptionPT: "Os melhores eventos para vocês 🚀",
    params: pars.locale,
  });
}
