"use client";

import { useTranslate } from "@/providers/app/TranslateProvider";

interface ITranslateTo {
  pt: string;
  eng: string;
}

export default function CTranslateTo({ eng, pt }: ITranslateTo) {
  const { currentLang } = useTranslate();
  return <>{currentLang.code == "PT" ? pt : eng}</>;
}
