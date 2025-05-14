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
    titleENG: "Subscriptions",
    titlePT: "Assinaturas",
    descriptionENG: "Manage your subscriptions",
    descriptionPT: "Gerencie as suas assinaturas",
    params: pars.locale,
  });
}
