import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

import { Scanner } from "@yudiel/react-qr-scanner";
import { useModal } from "@/providers/app/ModalProvider";
import { useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";

export default function ValidateTicketModal() {
  const { handleOpenModal } = useModal();

  const [resultScan, setResultScan] = useState();

  function handleClose() {
    handleOpenModal("");
  }

  return (
    <BaseModal callbackClose={handleClose}>
      <div className="md:h-[60vh] h-[40vh] flex flex-col">
        <AuSoftUI.UI.Button
          onClick={handleClose}
          className="justify-center"
          variant={"primary"}
        >
          <CTranslateTo eng="Done" pt="Concluído" />
        </AuSoftUI.UI.Button>
        <Scanner
          formats={[
            "dx_film_edge",
            "code_39",
            "code_93",
            "databar",
            "code_128",
          ]}
          onScan={(e) => {
            alert(JSON.stringify(e)), handleClose();
          }}
        />
      </div>
    </BaseModal>
  );
}
