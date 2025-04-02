import LocalePageServices, {
  IlocalePage,
} from "@/services/locale/LocalePageServices";
import { Metadata } from "next";

export { default } from "./home";

export function generateMetadata({ params }: IlocalePage): Metadata {
  return LocalePageServices.metadatas({
    titleENG: "Hi 😌",
    titlePT: "Olá 😌",
    descriptionENG: "Boost your brand 🚀",
    descriptionPT: "Turbine sua marca 🚀",
    params: params.locale,
  });
}
