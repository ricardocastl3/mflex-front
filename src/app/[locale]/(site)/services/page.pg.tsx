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
    titleENG: "Our Services 💡",
    titlePT: "Nossos Serviços 💡",
    descriptionENG: "Our services for your brand 🚀",
    descriptionPT: "Nossos serviços para a sua marca 🚀",
    params: pars.locale,
  });
}
