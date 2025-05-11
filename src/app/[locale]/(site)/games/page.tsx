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
    titleENG: "Games ⚽",
    titlePT: "Jogos ⚽",
    descriptionENG: "Watch live games and enjoy football to the fullest ⚽",
    descriptionPT:
      "Acompanhe a jogos em direto, e aproveite ao máximo do futebol ⚽",
    params: pars.locale,
  });
}
