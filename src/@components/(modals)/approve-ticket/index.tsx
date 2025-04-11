import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CurrencyServices from "@/services/CurrencyServices";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

import { useModal } from "@/providers/app/ModalProvider";
import { useTicketProvider } from "@/providers/features/TicketProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useState } from "react";
import { useAppProvider } from "@/providers/app/AppProvider";
import { internalApi } from "@/http/axios/api";

export default function ApproveTicketModal() {
  const { handleOpenModal } = useModal();
  const { selectedTicket } = useTicketProvider();
  const { handleAddToastOnArray } = useAppProvider();
  // Controls
  const [ticketDelivered, setTicketDelivered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleDevelivered() {
    try {
      setIsSubmitting(true);
      await internalApi.put("/tickets/delivered", {
        id: selectedTicket?.id,
      });

      setTicketDelivered(true);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  function handleClose() {
    handleOpenModal("");
  }

  return (
    <BaseModal callbackClose={handleClose} customDesktop="pb-4 pt-4">
      <div className=" p-7 h-[60vh] overflow-y-auto flex flex-col md:w-[40vw] w-[90vw] gap-6 justify-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <AAuSoftLogo size={56} />
          <h2 className="dark:text-white text-xl font-bold">
            {selectedTicket?.event_ticket?.event.title}
          </h2>
          <h1 className="text-lg dark:text-slate-400 text-slate-700">{`${selectedTicket?.customer.first_name} ${selectedTicket?.customer.last_name} | ${selectedTicket?.customer.profile?.phone_number}`}</h1>
        </div>
        <div className="border-t pt-3 border-slate-300 dark:border-slate-800 mx:px-5 px-4 flex items-center justify-center gap-2 flex-wrap">
          <h1 className="text-xl dark:text-yellow-500 text-yellow-400 font-bold">{`${CurrencyServices.decimal(
            selectedTicket?.amount!
          )} Kz`}</h1>
          <h1 className="text-xl font-bold dark:text-white">|</h1>
          <h1 className="text-xl font-bold dark:text-white">
            {selectedTicket?.quantity}{" "}
            <CTranslateTo eng="Tickets" pt="Ingressos" />
          </h1>
        </div>
        <div className="p-4 flex items-center md:flex-row flex-col justify-center gap-2 pb-5">
          {(ticketDelivered || selectedTicket?.status == "delivered") && (
            <>
              <AuSoftUI.UI.Button variant={"green"} size={"md"}>
                <CTranslateTo eng="Delivered Ticket" pt="Ingresso entregue" />
              </AuSoftUI.UI.Button>
            </>
          )}
          {!ticketDelivered && selectedTicket?.status == "paid" && (
            <>
              <AuSoftUI.UI.Button
                onClick={handleDevelivered}
                disabled={isSubmitting}
                variant={"primary"}
                size={"md"}
              >
                {!isSubmitting && (
                  <CTranslateTo
                    eng="Mark as delivered"
                    pt="Marcar como entregue"
                  />
                )}

                <AuSoftUI.Component.isFormSubmitting
                  isSubmitting={isSubmitting}
                />
              </AuSoftUI.UI.Button>
            </>
          )}

          <AuSoftUI.UI.Button
            onClick={() => handleOpenModal("")}
            variant={"outline"}
            size={"md"}
          >
            <CTranslateTo eng="Close" pt="Fechar" />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </BaseModal>
  );
}
