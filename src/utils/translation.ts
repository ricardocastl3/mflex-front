import { localImages } from "./images";

export interface IAvailableLangs {
  id: number;
  lang: string;
  code: "PT" | "EN";
  image?: string;
}

export const availableLangs: IAvailableLangs[] = [
  {
    id: 1,
    lang: "Português",
    code: "PT",
    image: localImages.flags.ao,
  },
  {
    id: 2,
    lang: "English",
    code: "EN",
    image: localImages.flags.en,
  },
];
