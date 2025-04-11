import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import AQRCode from "@/@components/(ausoft)/AQRCode";

import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { useTicketProvider } from "@/providers/features/TicketProvider";

export default function ViewTicketModal() {
  const { handleOpenModal } = useModal();
  const { selectedTicket } = useTicketProvider();
  function handleClose() {}

  return (
    <BaseModal callbackClose={handleClose}>
      <div className="flex flex-col md:w-[50vw] w-[90vw]">
        <div className="flex items-center justify-between p-4 border-b border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <AAuSoftLogo size={40} />
            <h3 className="text-base font-bold dark:text-white">
              <CTranslateTo eng="Ticket - " pt="Ingresso - " />
              {selectedTicket?.event_ticket?.event.title}
            </h3>
          </div>
          <button
            onClick={() => handleOpenModal("")}
            className="dark:text-white"
          >
            <ReactIcons.BiIcon.BiX size={20} />
          </button>
        </div>
        <div className="p-8 flex justify-center">
          <div className="bg-white p-2 rounded-xl">
            <AQRCode size={200} url={selectedTicket?.id!} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
