import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import QrScanner from "./QrScanner";

import { useModal } from "@/providers/app/ModalProvider";
import { useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";

export default function ValidateTicketModal() {
  const { handleOpenModal } = useModal();

  const [resultScan, setResultScan] = useState("");

  function handleClose() {
    handleOpenModal("");
  }

  return (
    <BaseModal callbackClose={handleClose} customDesktop="pb-4 pt-4">
      <div className="md:h-[70vh] h-[80vh] flex flex-col md:w-[30vw] w-[90vw]">
        <AuSoftUI.UI.Button
          onClick={handleClose}
          className="justify-center"
          variant={"primary"}
          size={"md"}
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
      </div>
    </BaseModal>
  );
}
