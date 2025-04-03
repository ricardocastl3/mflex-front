"use client";

import { useTranslate } from "@/providers/app/TranslateProvider";
import { IAvailableLangs, availableLangs } from "@/utils/translation";
import { ReactIcons } from "@/utils/icons";

import Image from "next/image";
import CTranslateTo from "../CTranslateTo";

export default function CContent({ callback }: { callback?: () => void }) {
  const { currentLang, handleSelectLanguage } = useTranslate();

  function handleSetLang(langParams: IAvailableLangs) {
    handleSelectLanguage(langParams.code.toLowerCase());
  }

  return (
    <div className="md:w-56 w-[82vw]">
      <div className="flex items-center justify-between pb-2 mb-2 border-b  border-slate-200 dark:border-slate-800">
        <h3 className="text-normal font-bold  dark:text-slate-100 ">
          <CTranslateTo pt="Idiomas" eng="Languages" />
        </h3>

        {callback && (
          <button
            onClick={callback}
            className="rounded-md hover:opacity-80 text-slate-800 dark:text-slate-200"
          >
            <ReactIcons.BiIcon.BiX size={25} />
          </button>
        )}
      </div>
      {availableLangs.map((lang, index) => {
        return (
          <button
            onClick={() => handleSetLang(lang)}
            key={index}
            className={`${
              currentLang.code == lang.code
                ? "dark:bg-yellow-800/50 bg-yellow-200/40"
                : "dark:hover:bg-yellow-800/50 hover:bg-yellow-200/40"
            }  flex items-center gap-2 w-full md:py-2.5 py-4 my-1 px-2 dark:text-slate-100 rounded-full text-[0.85rem]`}
          >
            <Image src={lang.image!} width={20} height={20} alt={lang.lang} />
            {lang.lang}
          </button>
        );
      })}
    </div>
  );
}
