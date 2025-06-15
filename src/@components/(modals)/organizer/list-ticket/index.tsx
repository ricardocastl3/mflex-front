import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { useEventProvider } from "@/providers/features/EventProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useEventTicketProvider } from "@/providers/features/EventTicketProvider";
import { IEventTicket } from "@/http/interfaces/models/IEventTicket";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";

import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import EventTicketCard from "./components/TicketItem";
import useEventTickets from "@/hooks/api/useEventTickets";

export default function ListTicketModal() {
  // Contexts
  const { selectedEvent, handleSelectEvent } = useEventProvider();
  const { handleSelectEventTicket } = useEventTicketProvider();
  const { handleOpenModal } = useModal();
  const { handleSeachEventTicket, isLoadingAllTickets, allTickets } =
    useEventTickets();
  const { currentSubscription } = useAuth();

  // Constrols
  const [allTicketsSafed, setAllTicketsSafed] = useState<IEventTicket[]>(
    selectedEvent?.event_tickets.length ? selectedEvent.event_tickets : []
  );

  const [isLoading, setIsLoading] = useState(true);
  const [searchTicket, setSearchTicket] = useState("");

  function handleClose() {
    handleOpenModal("");
    handleSelectEvent(undefined);
  }

  useEffect(() => {
    if (!isLoadingAllTickets) {
      if (searchTicket == "") {
        setAllTicketsSafed(selectedEvent?.event_tickets!);
      } else {
        setAllTicketsSafed(allTickets);
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isLoadingAllTickets]);

  return (
    <BaseModal callbackClose={handleClose} customDesktop="p-3 p-3">
      <div className="flex flex-col md:w-[70vw] w-[90vw]">
        <div className="flex items-center justify-between p-4 border-b border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <AAuSoftLogo size={40} />
            <h3 className="text-sm font-bold dark:text-white">
              <CTranslateTo eng="Ticket List" pt="Lista de ingressos" />
            </h3>
          </div>
          <button
            onClick={() => handleOpenModal("")}
            className="dark:text-white"
          >
            <ReactIcons.BiIcon.BiX size={20} />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-4 w-full py-4">
          <div className="flex md:flex-row flex-col md:gap-4 gap-2 md:items-center items-stretch">
            <div className="flex-1 flex flex-col gap-3">
              <h2 className="text-base dark:text-white">
                <CTranslateTo eng="Search For name" pt="Procurar por nome" />
              </h2>
              <AuSoftUI.UI.TextField.Default
                value={searchTicket}
                onChange={(e) => {
                  setSearchTicket(e.target.value),
                    handleSeachEventTicket({ name: e.target.value });
                }}
                weight={"sm"}
                className="w-full font-bold"
                placeholder="Ex: 2ª Edição - Festival das flores"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-base text-transparent md:flex hidden">
                <CTranslateTo eng="." pt="." />
              </h2>
              <AuSoftUI.UI.Button
                onClick={() => {
                  if (!currentSubscription?.subscription.is_expired) {
                    handleSelectEventTicket(undefined),
                      handleOpenModal("add-ticket");
                  } else {
                    handleOpenModal("ticket-unavailable-subs");
                  }
                }}
                variant={"primary"}
                size={"md"}
                className="flex items-center md:w-fit w-full h-fit"
              >
                <ReactIcons.AiICon.AiFillPlusCircle />
                <CTranslateTo eng="New Ticket" pt="Novo Ingresso" />
              </AuSoftUI.UI.Button>
            </div>
          </div>

          {isLoading && (
            <div className="flex flex-col gap-2 h-[50vh] overflow-y-auto md:pr-2 pr-0">
              {Array.from({ length: 8 }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="rounded-xl dark:bg-ausoft-slate-900 p-8 bg-slate-300/30 animate-pulse"
                  ></div>
                );
              })}
            </div>
          )}

          {allTicketsSafed.length > 0 && !isLoading && (
            <div className="flex flex-col h-[50vh] overflow-y-auto md:pr-2 pr-0">
              {allTicketsSafed.map((ticket, i) => {
                return <EventTicketCard ticket={ticket} key={i} />;
              })}
            </div>
          )}

          {allTicketsSafed.length <= 0 && !isLoading && (
            <div className="flex justify-center items-center py-12 h-[50vh] overflow-y-auto">
              <AuSoftUI.Component.ListEmpty
                action_en=""
                action_pt=""
                action_url=""
                description_en="All your searched or registered tickets will be shown here."
                description_pt="Todos os seus tickets buscados ou cadastrados serão mostrados aqui"
                title_en="No Tickets"
                title_pt="Sem Ingressos"
                action_blank
                hasAction={false}
              />
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
