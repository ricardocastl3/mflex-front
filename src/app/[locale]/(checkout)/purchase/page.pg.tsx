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
    titleENG: "Thanks!",
    titlePT: "Obrigado!",
    descriptionENG: "Thanks for buy",
    descriptionPT: "Obrigado por comprar",
    params: pars.locale,
  });
}
