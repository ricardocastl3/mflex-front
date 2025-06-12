import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { langByCookies } from "@/http/axios/api";
import { useMusicProvider } from "@/providers/features/MusicProvider";

import React from "react";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function AdsListenMusicModal() {
  const { selectedMusic } = useMusicProvider();

  function handleRegister() {
    LocalStorageServices.resetAllKeys();
    if (selectedMusic) {
      LocalStorageServices.setMusicSlug(selectedMusic.slug);
    }
    window.location.href = `/${langByCookies}/sign-in`;
  }

  return (
    <BaseModal callbackClose={() => {}}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-4 py-5 flex flex-col items-center gap-2">
          <div className="p-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500">
            <ReactIcons.AiICon.AiFillStar size={30} className="" />
          </div>
          <h4 className="font-bold text-lg md:w-[20vw] w-[70vw] text-yellow-600 text-center dark:text-yellow-400 mt-4">
            <CTranslateTo
              eng="Hello 😀! It's great to have you here."
              pt="Olá 😀! Que bom ter te por aqui."
            />
          </h4>
          <h4 className="flex md:flex-row flex-col md:w-[30vw] w-[80vw] text-center items-center gap-2 text-sm dark:text-slate-400 text-slate-800">
            <CTranslateTo
              eng={`You made the right choice! 🎉 To continue listen music, just create a free account, or if you already have one, just log in. Let's get started! 🚀`}
              pt={`Tomou a escolha certa! 🎉 Para continuar ouvindo a música, basta criar uma conta gratuita, ou se já tiver uma, apenas inicie sessão. Vamos começar! 🚀`}
            />
          </h4>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 flex items-center md:gap-4 gap-2">
          <AuSoftUI.UI.Button
            size={"sm"}
            variant={"primary"}
            onClick={handleRegister}
            className="w-full items-center justify-center rounded-full"
          >
            <ReactIcons.FaIcon.FaMusic size={18} />
            <CTranslateTo
              eng="Want to watch tv"
              pt="Quero continuar ouvindo música"
            />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
