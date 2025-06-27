import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useModal } from "@/providers/app/ModalProvider";

import React from "react";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CreatorSharePostModal() {
  //Contexts
  const { handleOpenModal } = useModal();

  return (
    <BaseModal callbackClose={() => handleOpenModal("")}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-4 py-5 flex flex-col items-center gap-2"></div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 flex items-center md:gap-4 gap-2">
          <AuSoftUI.UI.Button
            onClick={() => handleOpenModal("")}
            size={"sm"}
            variant={"outline"}
            className="w-full justify-center rounded-full"
          >
            <CTranslateTo eng="Cancel" pt="Cancelar" />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
