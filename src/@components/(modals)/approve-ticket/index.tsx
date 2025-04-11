import BaseModal from "../base";

import { useModal } from "@/providers/app/ModalProvider";
import { useTicketProvider } from "@/providers/features/TicketProvider";

export default function ApproveTicketModal() {
  const { handleOpenModal } = useModal();
  const { selectedTicket } = useTicketProvider();

  function handleClose() {
    handleOpenModal("");
  }

  return (
    <BaseModal callbackClose={handleClose} customDesktop="pb-4 pt-4">
      <div className="h-[70vh] overflow-y-auto flex flex-col md:w-[30vw] w-[90vw]">
        <div className="flex flex-col gap-2">
          <h2>{selectedTicket?.event_ticket?.title}</h2>
        </div>

        <div className="p-4"></div>
      </div>
    </BaseModal>
  );
}
