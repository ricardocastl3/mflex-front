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
    titleENG: "Settings",
    titlePT: "Definições",
    descriptionENG: "Manage your account settings",
    descriptionPT: "Gerencie as definições da sua conta",
    params: pars.locale,
  });
}
