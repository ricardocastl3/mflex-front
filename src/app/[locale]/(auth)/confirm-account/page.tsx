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
    titleENG: "Confirm Account 🟡",
    titlePT: "Confirmar conta 🟡",
    descriptionENG: "Confirm your account",
    descriptionPT: "Confirme a sua conta",
    params: pars.locale,
  });
}
