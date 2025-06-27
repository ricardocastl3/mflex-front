import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from "./index";

export async function generateMetadata({
  params,
}: IlocalePage): Promise<Metadata> {
  const pars = await params;
  return LocalePageServices.metadatas({
    titleENG: "Flex House",
    titlePT: "Casa Da Flex",
    descriptionENG: "You're welcome at your home",
    descriptionPT: "Sejam bem-vindo a sua casa da criatividade",
    params: pars.locale,
  });
}
