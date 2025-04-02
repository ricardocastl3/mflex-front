import { appConfigs } from "@/utils/enums";
import { Metadata } from "next";

export interface IlocalePage {
  params: {
    locale: string;
  };
}
interface ILocaleParams {
  params: string;
  titleENG: string;
  titlePT: string;
  descriptionPT: string;
  descriptionENG: string;
}

class LocalePageServices {
  metadatas({
    descriptionENG,
    descriptionPT,
    params,
    titleENG,
    titlePT,
  }: ILocaleParams): Metadata {
    return {
      title: `${params == "en" ? titleENG : titlePT} | ${appConfigs.title}`,
      description: params == "en" ? descriptionENG : descriptionPT,
    };
  }
}

export default new LocalePageServices();
