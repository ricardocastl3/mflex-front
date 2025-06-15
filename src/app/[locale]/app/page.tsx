import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from "./(dash)/home";

export async function generateMetadata({
  params,
}: IlocalePage): Promise<Metadata> {
  const pars = await params;
  return LocalePageServices.metadatas({
    titleENG: "Flex Zone",
    titlePT: "Flex Zone",
    descriptionENG: "Manage your events with quality",
    descriptionPT: "Gerencie seus eventos com qualidade",
    params: pars.locale,
  });
}
