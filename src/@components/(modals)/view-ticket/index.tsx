import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import AQRCode from "@/@components/(ausoft)/AQRCode";

import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { useTicketProvider } from "@/providers/features/TicketProvider";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";
import { langByCookies } from "@/http/axios/api";

export default function ViewTicketModal() {
  const { handleOpenModal } = useModal();
  const { selectedTicket } = useTicketProvider();

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,

    documentTitle: `${
      langByCookies == "en"
        ? `#Ticket - ${selectedTicket?.event_name}_${new Date().getTime()}`
        : `#Ingresso - ${selectedTicket?.event_name}_${new Date().getTime()}`
    } `,
  });

  return (
    <BaseModal callbackClose={() => {}} customDesktop="p-1">
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
        <div className="p-8 flex justify-center h-full flex-col items-center gap-4">
          <div
            ref={componentRef}
            className="flex flex-col items-center justify-center gap-2"
          >
            <AAuSoftLogo size={90} />
            <h4 className="text-lg font-bold text-center">
              <CTranslateTo
                eng="Buyed By MARCA FLEX"
                pt="Comprado na MARCA FLEX"
              />
            </h4>
            <h4 className="text-lg dark:text-slate-300 text-slate-600 text-center">
              <CTranslateTo
                eng="Ticket By MARCA FLEX"
                pt="Use este QRCode no local do evento, para validar o seu ingresso"
              />
            </h4>
            <div className="bg-white p-2 rounded-xl">
              <AQRCode size={150} url={selectedTicket?.id!} />
            </div>
          </div>

          <AuSoftUI.UI.Button
            onClick={() => handlePrint()}
            variant={"primary"}
            className="roundex-xl"
          >
            <CTranslateTo eng="Print" pt="Imprimir" />
            <ReactIcons.AiICon.AiFillPrinter size={15} />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </BaseModal>
  );
}
