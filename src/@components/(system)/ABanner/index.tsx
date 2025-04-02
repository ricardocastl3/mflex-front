"use client";

import { langByCookies } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function ABanner() {
  const { handleOpenBanner } = useAppProvider();

  return (
    <>
      <div className="w-full py-2.5 md:px-8 px-5 flex items-start justify-between ">
        <div className="flex items-center gap-2">
          <h4 className="md:text-normal text-xs text-white font-bold">
            <CTranslateTo
              eng="Your plan has just expired, renew it to keep selling again"
              pt="O seu plano acabou de expirar, renove-o para continuar a vender"
            />
          </h4>
          <Link
            href={`/${langByCookies}/pricing`}
            className="md:text-normal text-xs text-white font-bold animate-pulse"
          >
            <CTranslateTo eng="→ Renew Plan" pt="→ Renovar Plano" />
          </Link>
        </div>

        <button
          onClick={() => handleOpenBanner(false)}
          className="dark:text-white"
        >
          <ReactIcons.BiIcon.BiX size={18} />
        </button>
      </div>
    </>
  );
}
