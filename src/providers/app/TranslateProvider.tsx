"use client";

import CookieServices from "@/services/auth/CookieServices";
import { appConfigs, ECOOKIES } from "@/utils/enums";
import { IAvailableLangs, availableLangs } from "@/utils/translation";
import { getCookie, setCookie } from "cookies-next";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ITranslateContextProps {
  currentLang: IAvailableLangs;
  isChangeLang: boolean;

  handleSelectLanguage: (lang: string) => void;
}

export function useTranslate() {
  const translation = useContext(TranslateContext);
  return translation;
}

export const TranslateContext = createContext({} as ITranslateContextProps);

export default function TranslateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLang, setCurrentLang] = useState<IAvailableLangs>(
    availableLangs[0]
  );

  const [isChangeLang, setIsChangeLang] = useState(false);

  const basePathname = usePathname();
  function handleSelectLanguage(lang: string) {
    const langStorage = getCookie(ECOOKIES.AS_LANG);
    const baseUrl = basePathname.slice(4, basePathname.length);

    if (langStorage == lang) {
      setCurrentLang(lang == "pt" ? availableLangs[0] : availableLangs[1]);
      if (basePathname != "/") return;
    }

    setCookie(ECOOKIES.AS_LANG, lang, {
      domain:
        process.env.NODE_ENV != "production" ? "localhost" : appConfigs.domain,
      maxAge: 24 * 60 * 60 * 9999,
    });

    window.location.href = `${
      lang == "pt" ? `/pt/${baseUrl}` : `/en/${baseUrl}`
    }`;
  }

  const segmendLanguage = useSelectedLayoutSegment();

  useEffect(() => {
    const lang = CookieServices.getLocale();
    handleSelectLanguage(
      !segmendLanguage || segmendLanguage == "" ? lang : segmendLanguage
    );
  }, []);

  return (
    <>
      <TranslateContext.Provider
        value={{
          currentLang,
          isChangeLang,
          handleSelectLanguage,
        }}
      >
        {children}
      </TranslateContext.Provider>
    </>
  );
}
