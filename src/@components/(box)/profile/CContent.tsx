import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";
import { localImages } from "@/utils/images";
import { langByCookies } from "@/http/axios/api";

import React from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function CContent({ callback }: { callback?: () => void }) {
  const { userLogged, handleLogout } = useAuth();

  return (
    <div className="md:w-[26vw] w-[82vw]">
      <div className="flex items-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700/60">
        <AuSoftUI.Component.Avatar
          src={localImages.logos.flexUser.src}
          size={50}
          width={50}
          wsite="w-[3.3rem] h-[3.3rem]"
        />

        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-[1.16rem] text-slate-800 font-bold dark:text-white">
                <CTranslateTo pt="Olá" eng="Hi" />, {userLogged?.first_name}{" "}
              </h3>
              👋
            </div>
            {callback && (
              <button
                onClick={callback}
                className="rounded-md pb-3 hover:opacity-80 text-slate-800 dark:text-slate-200"
              >
                <ReactIcons.BiIcon.BiX size={25} />
              </button>
            )}
          </div>
          <h3 className="text-sm text-slate-500 dark:text-slate-400">
            {userLogged?.email && userLogged.email}
          </h3>
        </div>
      </div>

      <div className="flex flex-col mt-3 ">
        <h4 className="text-sm dark:text-slate-400 text-slate-600">
          <CTranslateTo eng="Your Menu" pt="Seu Menu" />
        </h4>
        <Link
          href={`/${langByCookies}/app`}
          className="mt-2.5 rounded-full flex text-sm items-center gap-2 px-4 dark:text-slate-200 hover:bg-slate-800/40 transition-all py-3"
        >
          <ReactIcons.VSCIcon.VscSymbolEvent size={14} />
          <CTranslateTo eng="Flex Zone" pt="Flex Zone" />
        </Link>
        <Link
          href={`/${langByCookies}/podcasts`}
          className="rounded-full flex text-sm items-center gap-2 px-4 dark:text-slate-200 hover:bg-slate-800/40 transition-all py-3"
        >
          <ReactIcons.AiICon.AiOutlineAudio size={14} />
          <CTranslateTo eng="PodCasts" pt="PodCasts" />
        </Link>
        <Link
          href={`/${langByCookies}/events`}
          className="rounded-full flex text-sm items-center gap-2 px-4 dark:text-slate-200 hover:bg-slate-800/40 transition-all py-3"
        >
          <ReactIcons.BiIcon.BiCalendarAlt size={14} />
          <CTranslateTo eng="Public Events" pt="Eventos Públicos" />
        </Link>
      </div>
      <div className="flex flex-col gap-1.5 mt-4">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
          <AuSoftUI.UI.Button
            size={"sm"}
            onClick={() => handleLogout()}
            className="w-full justify-start rounded-full text-sm hover:bg-red-400/10 text-red-600 dark:text-red-400 border-none pt-3 pb-2.5"
            variant={"outline"}
          >
            <ReactIcons.PiIcon.PiSignOut size={16} className="mb-1" />
            <CTranslateTo eng="Log Out" pt="Terminar sessão" />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </div>
  );
}
