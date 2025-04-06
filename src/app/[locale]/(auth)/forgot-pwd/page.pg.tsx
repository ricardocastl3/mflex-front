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
    titleENG: "Reset Password 🟡",
    titlePT: "Esqueci-me da senha 🟡",
    descriptionENG: "Reset your password",
    descriptionPT: "Altere sua senha",
    params: pars.locale,
  });
}
