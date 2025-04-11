import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { IEvent } from "@/http/interfaces/models/IEvent";
import { useEventProvider } from "@/providers/features/EventProvider";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useEffect, useState } from "react";
import { internalApi } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function EventCard({ event }: { event: IEvent }) {
  const {
    handleOpenModal,
    handleAddTextOnBoxSuccess,
    handleAddModalQuestionData,
  } = useModal();
  const { handleSelectEvent, handleFetchEvent } = useEventProvider();
  const { handleAddToastOnArray } = useAppProvider();

  //Controls
  const [openBox, setOpenBox] = useState(false);

  async function handleDeleteEvent() {
    try {
      handleAddModalQuestionData({ isSubmitting: true });

      await internalApi.delete("/events", {
        data: {
          id: event.id,
        },
      });

      handleFetchEvent(true);
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
        action_en: "Delete event",
        action_pt: "Eliminar evento",
        description_en:
          "Are you sure you want to delete this event? Your customers will no longer be able to purchase this event.",
        description_pt:
          "Tem certeza de que deseja eliminar este evento? Os seus clientes não poderão mais comprar este evento.",
        updated_description_en: "Event deleted successfully.",
        updated_description_pt: "Evento eliminado com sucesso.",
        updated_title_en: "Event Deleted",
        updated_title_pt: "Evento Eliminado",
        title_en: "Do you want to delete this event?",
        title_pt: "Deseja eliminar este evento?",
        handleConfirmCallback: () => {
          handleDeleteEvent();
        },
        callbackClose: () => {
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
    <div className="flex flex-col gap-2">
      <div
        style={{
          width: window.innerWidth > 765 ? "100%" : "100%",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${
            event.image_url != ""
              ? event.image_url
              : "https://img.freepik.com/free-vector/abstract-vertical-banners-with-orange-rolled-wrapping-paper-isolated_1284-48680.jpg?t=st=1744285073~exp=1744288673~hmac=7d793bd806e2ee3a895b2ccbad682ac4828c55b8aa1c2a57d0e5bf854970eb34&w=900"
          })`,
        }}
        className="rounded-xl md:h-[400px] h-[400px] flex flex-col justify-between"
      >
        <div className="p-4 flex flex-col gap-1 bg-black/80 rounded-t-xl h-fit">
          <div className="flex items-center gap-4">
            {event.status == "pending" && (
              <h1 className="text-yellow-400 flex items-center gap-2 text-sm">
                <ReactIcons.HiIcon.HiTicket size={18} />
                <CTranslateTo eng="Pending Event" pt="Evento Pendente" />
              </h1>
            )}
            {event.status == "approved" && (
              <h1 className="text-green-400 flex items-center gap-2 text-sm">
                <ReactIcons.HiIcon.HiTicket size={18} />
                <CTranslateTo eng="Approved Event" pt="Evento Aprovado" />
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1 className="flex items-start text-sm gap-2 text-white">
              <ReactIcons.HiIcon.HiCalendar size={18} />
              {event.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="py-1 px-4 flex items-center gap-2">
            <AuSoftUI.UI.Button
              onClick={() => setOpenBox(true)}
              variant={"destructive"}
              className="py-1.5 items-center justify-center gap-1 px-2 w-full"
              size={"sm"}
            >
              <ReactIcons.PiIcon.PiTrash size={15} />
              <CTranslateTo eng="Delete" pt="Eliminar" />
            </AuSoftUI.UI.Button>
            <AuSoftUI.UI.Button
              onClick={() => {
                handleSelectEvent(event), handleOpenModal("add-event");
              }}
              variant={"primary"}
              className="py-1.5 items-center justify-center gap-1 px-2 w-full"
              size={"sm"}
            >
              <ReactIcons.HiIcon.HiPencilAlt size={15} />
              <CTranslateTo eng="Edit" pt="Editar" />
            </AuSoftUI.UI.Button>
          </div>

          <div className="p-4 bg-black/50 rounded-b-xl h-fit">
            <div className="flex items-center gap-2">
              <AuSoftUI.UI.Button
                onClick={() => {
                  handleSelectEvent(event), handleOpenModal("list-ticket");
                }}
                variant={"default"}
                className="w-full font-bold items-center "
                size={"sm"}
              >
                <ReactIcons.HiIcon.HiTicket size={18} />
                <CTranslateTo eng="View tickets" pt="Ver ingressos" />
              </AuSoftUI.UI.Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
