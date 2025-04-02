"use client";

import { langByCookies } from "@/http/axios/api";
import { IToast } from "@/providers/app/AppProvider";

export default function COpenToastyWithTranslation({
  description_en,
  description_pt,
  title_en,
  title_pt,
  toast,
  type,
}: {
  type: "error" | "info" | "success";
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  toast: (toast: IToast) => void;
}) {
  return toast({
    description: langByCookies == "pt" ? description_pt : description_en,
    title: langByCookies == "pt" ? title_pt : title_en,
    type,
  });
}
