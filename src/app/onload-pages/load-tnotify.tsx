"use client";

import { useEffect } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useTranslate } from "@/providers/app/TranslateProvider";
import { langByCookies } from "@/http/axios/api";

import LogoSpinner from "./spinner/LogoSpinner";

export default function LoadingTSuite() {
  const { isLoadingUserData } = useAuth();
  const { handleSelectLanguage } = useTranslate();

  useEffect(() => {
    if (!isLoadingUserData) {
      const lang = langByCookies;
      handleSelectLanguage(lang);
    }
  }, []);

  return (
    <div>
      <div className="h-screen w-screen flex items-center justify-center flex-col gap-4 px-14">
        <LogoSpinner />
      </div>
    </div>
  );
}
