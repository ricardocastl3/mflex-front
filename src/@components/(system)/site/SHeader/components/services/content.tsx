"use client";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";

export default function CContentServices({
  callback,
}: {
  callback?: () => void;
}) {
  const { currentPageByUrl } = useAppProvider();
  return (
    <div className="md:w-56 w-[82vw]">
      <div className="flex items-center justify-between pb-2 mb-2 border-b  border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 text-sm font-bold dark:text-white">
          <ReactIcons.AiICon.AiFillSliders size={12} />
          <CTranslateTo eng="Services" pt="Serviços" />
        </h4>
        {callback && window.innerWidth <= 765 && (
          <button
            onClick={callback}
            className="rounded-md hover:opacity-80 text-slate-800 dark:text-slate-200"
          >
            <ReactIcons.BiIcon.BiX size={25} />
          </button>
        )}
      </div>

      <div
        onClick={() => {
          callback!();
          LocalStorageServices.resetAllKeys();
        }}
        className="flex flex-col my-1 gap-1"
      >
        <Link
          href={`/${langByCookies}/about-us`}
          className={`${
            currentPageByUrl == "about-us"
              ? "dark:bg-yellow-800/50 bg-yellow-200/40"
              : "dark:hover:bg-yellow-800/50 hover:bg-yellow-200/40"
          }  flex items-center gap-2 w-full md:py-2.5 py-4 px-4 dark:text-slate-100 rounded-full text-[0.85rem]`}
        >
          <ReactIcons.PiIcon.PiBuilding size={15} />
          <CTranslateTo
            eng="About Marca Flex Agency"
            pt="Conheça a Agência Marca Flex"
          />
        </Link>
        <Link
          href={`/${langByCookies}/services`}
          className={`${
            currentPageByUrl == "services"
              ? "dark:bg-yellow-800/50 bg-yellow-200/40"
              : "dark:hover:bg-yellow-800/50 hover:bg-yellow-200/40"
          } hidden  items-center gap-2 w-full md:py-2.5 py-4 px-4 dark:text-slate-100 rounded-full text-[0.85rem]`}
        >
          <ReactIcons.PiIcon.PiMarkerCircle size={15} />
          <CTranslateTo eng="Marketing Services" pt="Serviços de Marketing" />
        </Link>
        <Link
          href={`/${langByCookies}/pricing`}
          className={`${
            currentPageByUrl == "about-us"
              ? "dark:bg-yellow-800/50 bg-yellow-200/40"
              : "dark:hover:bg-yellow-800/50 hover:bg-yellow-200/40"
          }  flex items-center gap-2 w-full md:py-2.5 py-4 px-4 dark:text-slate-100 rounded-full text-[0.85rem]`}
        >
          <ReactIcons.PiIcon.PiStar size={15} />
          <CTranslateTo eng="Flex Plans" pt="Planos Flex" />
        </Link>
      </div>
    </div>
  );
}
