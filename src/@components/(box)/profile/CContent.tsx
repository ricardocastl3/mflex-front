import React from "react";

import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CContent({ callback }: { callback?: () => void }) {
  const { userLogged, handleLogout } = useAuth();
  const { handleOpenModal } = useModal();

  return (
    <div className="md:w-[26vw] w-[82vw]">
      <div className="flex items-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700/60">
        <AuSoftUI.Component.Avatar size={65} wsite="w-[3.3rem] h-[3.3rem]" />

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

      <div className="flex flex-col gap-1.5 mt-4">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
          <AuSoftUI.UI.Button
            size={"sm"}
            onClick={() => handleLogout()}
            className="w-full justify-start rounded-full hover:bg-red-400/10 text-red-600 dark:text-red-400 border-none pt-3 pb-2.5"
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
