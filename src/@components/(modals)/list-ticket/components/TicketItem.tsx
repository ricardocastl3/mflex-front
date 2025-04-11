import { internalApi } from "@/http/axios/api";
import { IEventTicket } from "@/http/interfaces/models/EventTicket";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { useEventProvider } from "@/providers/features/EventProvider";
import { useEventTicketProvider } from "@/providers/features/EventTicketProvider";
import { ReactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CurrencyServices from "@/services/CurrencyServices";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function EventTicketCard({ ticket }: { ticket: IEventTicket }) {
  // Contexts
  const { handleOpenModal, handleAddModalQuestionData } = useModal();
  const { handleSelectEventTicket } = useEventTicketProvider();
  const { handleFetchEvent, handleSelectEvent } = useEventProvider();
  const { handleAddToastOnArray } = useAppProvider();

  //Controls
  const [openBox, setOpenBox] = useState(false);

  async function handleDeleteEvent() {
    try {
      handleAddModalQuestionData({ isSubmitting: true });

      await internalApi.delete("/events/tickets", {
        data: {
          id: ticket.id,
        },
      });

      handleFetchEvent(true);
      handleSelectEventTicket(undefined);
      handleSelectEvent(undefined);
      handleAddModalQuestionData({ isSubmitting: false, isUpdated: true });
    } catch (err) {
      handleAddModalQuestionData({
        isSubmitting: false,
      });

      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  useEffect(() => {
    if (openBox) {
      handleAddModalQuestionData({
        action_en: "Delete ticket",
        action_pt: "Eliminar ingresso",
        description_en:
          "Are you sure you want to delete this ticket? Your customers will no longer be able to purchase this ticket.",
        description_pt:
          "Tem certeza de que deseja eliminar este ingresso? Os seus clientes não poderão mais comprar este ingresso.",
        updated_description_en: "Ticket deleted successfully.",
        updated_description_pt: "Ingresso eliminado com sucesso.",
        updated_title_en: "Ticket Deleted",
        updated_title_pt: "Ingresso Eliminado",
        title_en: "Do you want to delete this ticket?",
        title_pt: "Deseja eliminar este ingresso?",
        handleConfirmCallback: () => {
          handleDeleteEvent();
        },
        callbackClose: () => {
          handleSelectEventTicket(undefined);
          handleSelectEvent(undefined);
          handleFetchEvent(false);
          setOpenBox(false);
        },
        isSubmitting: false,
        isUpdated: false,
      });

      handleOpenModal("default-question");
    }
  }, [openBox]);

  return (
    <div className="rounded-xl grid md:grid-cols-5 grid-cols-2 p-4 cursor-pointer dark:hover:bg-ausoft-slate-900 hover:bg-slate-300/30">
      <h1 className="dark:text-white flex items-center gap-2 col-span-2">
        <ReactIcons.HiIcon.HiTicket size={15} />
        {ticket.name}
      </h1>
      <h3 className="dark:text-green-500 text-green-500 font-bold">{`${CurrencyServices.decimal(
        ticket.amount
      )} Kz`}</h3>

      <div className="md:hidden flex"></div>

      {ticket.status == "available" && (
        <h3 className="dark:text-yellow-500 text-yellow-500 font-bold">
          <CTranslateTo eng="Available" pt="Disponível" />
        </h3>
      )}
      {ticket.status == "unavailable" && (
        <h3 className="dark:text-red-500 text-red-500 font-bold">
          <CTranslateTo eng="Unavailable" pt="Indisponível" />
        </h3>
      )}

      <div className="flex items-center gap-2 justify-self-end">
        <button
          onClick={() => {
            handleSelectEventTicket(ticket);
            handleOpenModal("add-ticket");
          }}
          className=" dark:text-yellow-500 text-yellow-500 hover:dark:text-yellow-600 hover:text-yellow-600"
        >
          <ReactIcons.HiIcon.HiPencilAlt size={18} />
        </button>
        <button
          onClick={() => setOpenBox(true)}
          className=" dark:text-red-500 text-red-500 hover:dark:text-red-600 hover:text-red-600"
        >
          <ReactIcons.HiIcon.HiTrash size={18} />
        </button>
      </div>
    </div>
  );
}
