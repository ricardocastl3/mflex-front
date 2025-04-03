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
    titleENG: "Sign-In 🟡",
    titlePT: "Iniciar sessão 🟡",
    descriptionENG: "Log in to your library platform",
    descriptionPT: "Inicie sessão na sua plataforma de business",
    params: pars.locale,
  });
}
