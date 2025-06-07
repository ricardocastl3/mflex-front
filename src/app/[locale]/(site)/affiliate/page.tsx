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
    titleENG: "FLEX Affiliate 💰",
    titlePT: "Afiliado FLEX 💰",
    descriptionENG: "Become a FLEX affiliate and earn every day",
    descriptionPT: "Torne-se um afiliado FLEX, e ganhe todos os dias",
    params: pars.locale,
  });
}
