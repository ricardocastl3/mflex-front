"use client";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";
import GAEventsServices from "@/services/google/GAEventsServices";

import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";

export default function CContentFlexTV({
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
          <CTranslateTo eng="Flex TV" pt="Flex TV" />
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
        }}
        className="flex flex-col my-1 gap-1"
      >
        <Link
          onClick={() => {
            GAEventsServices.send({
              event_name: `page-view-flex-tv`,
              metadata: "Click Button",
            });
          }}
          href={`/${langByCookies}/flex-tv`}
          className={`${
            currentPageByUrl == "flex-tv"
              ? "dark:bg-yellow-800/50 bg-yellow-200/40"
              : "dark:hover:bg-yellow-800/50 hover:bg-yellow-200/40"
          } flex items-center gap-2 w-full md:py-2.5 py-4 px-4 dark:text-slate-100 rounded-full text-[0.85rem]`}
        >
          <ReactIcons.BiIcon.BiTv size={15} />
          <CTranslateTo eng="TV Channels" pt="Canais Televisivos" />
        </Link>
        <Link
          onClick={() => {
            GAEventsServices.send({
              event_name: `page-view-flex-movie`,
              metadata: "Click Button",
            });
          }}
          href={`/${langByCookies}/flex-movie`}
          className={`${
            currentPageByUrl == "flex-movie"
              ? "dark:bg-yellow-800/50 bg-yellow-200/40"
              : "dark:hover:bg-yellow-800/50 hover:bg-yellow-200/40"
          }  flex items-center gap-2 w-full md:py-2.5 py-4 px-4 dark:text-slate-100 rounded-full text-[0.85rem]`}
        >
          <ReactIcons.PiIcon.PiPlay size={15} />
          <CTranslateTo eng="Flex Movie" pt="Flex Movie" />
        </Link>
      </div>
    </div>
  );
}
