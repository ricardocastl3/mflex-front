import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { langByCookies } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";
import { useAppProvider } from "@/providers/app/AppProvider";

import React from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BaseModal from "../../base";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function UserNoHaveArtistProfileModal() {
  const { handleOpenModal } = useModal();
  const { currentLastPageUrl } = useAppProvider();

  return (
    <BaseModal callbackClose={() => {}}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-4 py-5 flex flex-col items-center gap-2">
          <div className="p-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500">
            <ReactIcons.FaIcon.FaMusic size={40} className="" />
          </div>
          <h4 className="font-bold text-lg md:w-[20vw] w-[70vw] text-yellow-600 text-center dark:text-yellow-400 mt-4">
            <CTranslateTo eng="No Artist Profile" pt="Sem perfil de artista" />
          </h4>
          <h4 className="flex md:flex-row flex-col md:w-[30vw] w-[80vw] text-center items-center gap-2 text-base dark:text-slate-400 text-slate-800">
            <CTranslateTo
              eng={`Great choice! 🎉 To continue, you need to have an approved artist profile`}
              pt={`Ótima escolha! 🎉 Para continuar, você precisa ter um perfil de artista aprovado`}
            />
          </h4>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 grid grid-cols-2 md:gap-4 gap-2">
          <AuSoftUI.UI.Button
            onClick={() => {
              handleOpenModal("");
              LocalStorageServices.setLastPageViewFlexZone(currentLastPageUrl);
              window.location.href = `/${langByCookies}/app/artist`;
            }}
            size={"sm"}
            variant={"primary"}
            className="w-full justify-center rounded-full"
          >
            <CTranslateTo eng="Become Flex Artist" pt="Quero ser artista flex" />
          </AuSoftUI.UI.Button>

          <AuSoftUI.UI.Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {
              handleOpenModal("");
            }}
            className="w-full justify-center rounded-full"
          >
            <CTranslateTo eng="Close" pt="Fechar" />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
