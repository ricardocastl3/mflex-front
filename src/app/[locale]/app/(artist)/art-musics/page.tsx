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
    titleENG: "My Musics",
    titlePT: "Minhas Músicas",
    descriptionENG: "Manage your musics",
    descriptionPT: "Gerencie as suas músicas",
    params: pars.locale,
  });
}
