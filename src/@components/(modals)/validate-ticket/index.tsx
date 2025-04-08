import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import QrScanner from "./QrScanner";

import { useModal } from "@/providers/app/ModalProvider";
import { useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";

export default function ValidateTicketModal() {
  const { handleOpenModal } = useModal();

  const [resultScan, setResultScan] = useState("");

  function handleClose() {
    handleOpenModal("");
  }

  return (
    <BaseModal callbackClose={handleClose} customDesktop="pb-4 pt-4">
      <div className="h-[70vh] flex flex-col md:w-[30vw] w-[90vw]">
        <AuSoftUI.UI.Button
          onClick={handleClose}
          className="justify-center"
          variant={"primary"}
        >
          <CTranslateTo eng="Done" pt="Concluído" />
        </AuSoftUI.UI.Button>
        <div className="p-4">
          <QrScanner
            onScan={(e) => {
              handleClose();
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <h4 className="flex items-center gap-3 py-2 text-yellow-500 dark:text-yellow-400 animate-pulse">
            <CTranslateTo eng="Scanning" pt="Escaneando" />
            <ReactIcons.PiIcon.PiSpinner className="animate-spin" size={20} />
          </h4>
        </div>
      </div>
    </BaseModal>
  );
}
