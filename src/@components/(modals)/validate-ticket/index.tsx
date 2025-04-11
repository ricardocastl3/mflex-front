import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import QrScanner from "./QrScanner";

import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi } from "@/http/axios/api";
import { useTicketProvider } from "@/providers/features/TicketProvider";

export default function ValidateTicketModal() {
  const { handleOpenModal } = useModal();
  const { handleSelectTicket } = useTicketProvider();

  function handleClose() {
    handleSelectTicket(undefined);
    handleOpenModal("");
  }

  const fetchTicket = async (id: string) => {
    try {
      const resp = await internalApi.get("/tickets", {
        params: {
          id,
        },
      });
      handleSelectTicket(resp.data.ticket);
      handleOpenModal("approve-ticket");
    } catch (err) {
      handleSelectTicket(undefined);
      handleOpenModal("");
    }
  };

  return (
    <BaseModal callbackClose={handleClose} customDesktop="pb-4 pt-4">
      <div className="md:h-[70vh] h-[100%] flex flex-col md:w-[30vw] w-[90vw] relative">
        <AuSoftUI.UI.Button
          onClick={handleClose}
          className="justify-center text-base font-bold"
          variant={"primary"}
          size={"md"}
        >
          <CTranslateTo eng="Done" pt="Concluído" />
        </AuSoftUI.UI.Button>
        <div className="p-4">
          <QrScanner
            onScan={(e) => {
              fetchTicket(e);
            }}
          />
        </div>
      </div>
    </BaseModal>
  );
}
