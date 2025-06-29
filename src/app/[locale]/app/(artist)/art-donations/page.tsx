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
    titleENG: "Donations",
    titlePT: "Doações",
    descriptionENG: "Manage your donations",
    descriptionPT: "Gerencie as suas doações",
    params: pars.locale,
  });
}
