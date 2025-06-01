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
    titleENG: "Transactions",
    titlePT: "Transações",
    descriptionENG: "Manage your transactions",
    descriptionPT: "Gerencie as suas transações",
    params: pars.locale,
  });
}
