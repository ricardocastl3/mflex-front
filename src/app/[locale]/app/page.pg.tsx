import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from "./home";

export async function generateMetadata({
  params,
}: IlocalePage): Promise<Metadata> {
  const pars = await params;
  return LocalePageServices.metadatas({
    titleENG: "Dashboard",
    titlePT: "Dashboard",
    descriptionENG: "Manage your books with quality",
    descriptionPT: "Gerencie seus livros com qualidade",
    params: pars.locale,
  });
}
