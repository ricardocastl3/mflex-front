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
    titleENG: "New FLEX Account 🟡",
    titlePT: "Nova Conta FLEX 🟡",
    descriptionENG: "Create your FLEX account, and get the best",
    descriptionPT: "Crie sua conta FLEX, e aproveite ao máximo",
    params: pars.locale,
  });
}
