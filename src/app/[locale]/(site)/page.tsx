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
    titleENG: "Hi 😌",
    titlePT: "Olá 😌",
    descriptionENG: "The best entertainment in one place 🚀",
    descriptionPT: "O melhor do entretenimento em um só lugar 🚀",
    params: pars.locale,
  });
}
