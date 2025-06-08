"use client";

import { CSwitcherTheme } from "@/@components/(theme)/CSwitcherTheme";
import { CUserProfileBox } from "@/@components/(box)/profile/CUserProfileBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { langByCookies } from "@/http/axios/api";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";

import Link from "next/link";
import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import CTranslate from "@/@components/(translation)/CCTranslate/CTranslate";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function AHeader() {
  const { openBanner } = useAppProvider();

  return (
    <div
      className={`${
        openBanner
          ? "md:rounded-t-[2rem] rounded-t-3xl absolute md:-bottom-10 -bottom-[2.7rem]"
          : ""
      } flex w-full border-b border-slate-200 dark:border-slate-800 md:pr-8 pr-4 md:pl-4 pl-4 md:py-1.5 py-2 justify-between md:bg-white bg-white dark:bg-ausoft-slate-950 items-center md:gap-4 gap-2`}
    >
      <div className="flex items-center gap-2">
        <Link
          href={`/${langByCookies}/app`}
          className="flex items-center font-bold gap-1.5 md:text-md text-xl md:ml-2 ml-0 text-blue-500 dark:text-blue-600/90"
        >
          <AAuSoftLogo size={70} />
        </Link>
        <AuSoftUI.UI.Button
          onClick={() => (window.location.href = `/${langByCookies}`)}
          variant={"primary"}
          size={"sm"}
          className="py-0.5 px-0.5 w-fit items-center"
        >
          <ReactIcons.BiIcon.BiArrowToLeft size={15} />
          <CTranslateTo eng="Back" pt="Voltar" />
        </AuSoftUI.UI.Button>
      </div>

      <div className="flex items-center md:gap-2 gap-2 divide-x-2 divide-slate-300 dark:divide-slate-700/60">
        <div className="flex items-center gap-2.5">
          <CSwitcherTheme />
          <CTranslate />
        </div>
        <div className="flex relative items-center gap-2.5 md:pl-4 pl-2">
          <div className="md:flex hidden"></div>
          <CUserProfileBox />
        </div>
      </div>
    </div>
  );
}
