import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useModal } from "@/providers/app/ModalProvider";

import React, { useEffect } from "react";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function GracefullDonateModal() {
  //Contexts
  const { userLogged } = useAuth();
  const { handleOpenModal } = useModal();

  useEffect(() => {}, []);

  return (
    <BaseModal callbackClose={() => {}}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-4 py-5 flex flex-col items-center gap-2">
          <div className="text-[2rem] rounded-full pt-4">🥳</div>
          <h4 className="font-bold text-lg md:w-[20vw] w-[70vw] text-yellow-600 text-center dark:text-yellow-400">
            <CTranslateTo
              eng={`${userLogged?.first_name}, many congratulations 👏`}
              pt={`${userLogged?.first_name}, muitos parabéns 👏`}
            />
          </h4>
          <h4 className="flex md:flex-row flex-col md:w-[30vw] w-[80vw] text-center items-center gap-2 text-[0.9rem] dark:text-slate-400 text-slate-800">
            <CTranslateTo
              eng={`You helped the artist a lot, he will be very happy to receive your donation 🙏`}
              pt={`Você ajudou bastante o artista, ele ficará muito feliz em receber a sua doação 🙏`}
            />
          </h4>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 flex items-center md:gap-4 gap-2">
          <AuSoftUI.UI.Button
            onClick={() => handleOpenModal("")}
            size={"sm"}
            variant={"primary"}
            className="w-full justify-center rounded-full"
          >
            <CTranslateTo eng="Understand" pt="Compreendido" />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
