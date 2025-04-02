"use client";

import { useTranslate } from "@/providers/app/TranslateProvider";

import Image from "next/image";
import ADropdownBase from "@/@components/(ausoft)/ADropdownBase";
import CContent from "./CContent";

export default function CTranslate() {
  const { currentLang } = useTranslate();

  return (
    <ADropdownBase
      trigger={
        <div>
          <button className="rounded-full bg-white dark:bg-slate-800/80 border py-1.5 px-1.5 dark:border-none border-slate-300 flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <Image
              src={currentLang.image!}
              width={24}
              height={24}
              alt={currentLang.lang != "null" ? currentLang.lang : "idioma"}
            />
          </button>
        </div>
      }
      DesktopContent={<CContent />}
      MobileContent={(call) => {
        return <CContent callback={() => call.callback()} />;
      }}
    />
  );
}
