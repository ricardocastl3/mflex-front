"use client";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useTransferences from "@/hooks/api/useTransferences";
import EventBox from "./components/EventBox";

import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";
import PageBase from "../cmps/PageBase";

export default function EventAppPage() {
  // Contexts
  const { handleOpenModal } = useModal();

  const {
    allTransfer,
    isLoadingAllTransfer,
    fetchAllTransfer,
    handleSeachByName,
  } = useTransferences({
    route: "transfer",
  });

  return (
    <PageBase>
      <div className="flex md:items-center items-stretch md:flex-row flex-col gap-4 justify-between border-b w-full pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.BiIcon.BiSolidCalendarEvent size={18} />
          <CTranslateTo eng="My Events" pt="Meus Eventos" />
        </h4>
        <div className="flex items-center gap-3">
          <AuSoftUI.UI.TextField.Default
            weight={"sm"}
            className="md:w-[19rem] w-full rounded-full font-bold border-slate-400"
            placeholder="Ex: Formação Você Rei..."
          />
          <div className="md:flex hidden items-center gap-3">
            <AuSoftUI.UI.Button
              onClick={() => handleOpenModal("validate-ticket")}
              size={"sm"}
              className="rounded-full py-2"
              variant={"primary"}
            >
              <CTranslateTo eng="Validate Ticket" pt="Validar Ingresso" />
              <ReactIcons.PiIcon.PiScan size={18} />
            </AuSoftUI.UI.Button>
            <AuSoftUI.UI.Button
              onClick={() => handleOpenModal("add-event")}
              size={"sm"}
              className="rounded-full py-2"
              variant={"primary"}
            >
              <CTranslateTo eng="New Event" pt="Novo Evento" />
              <ReactIcons.Hi2Icon.HiCalendar size={18} />
            </AuSoftUI.UI.Button>
          </div>
        </div>
        <div className="md:hidden flex fixed gap-4 bottom-[4.9rem] right-[4.4rem] z-20">
          <AuSoftUI.UI.Button
            size={"sm"}
            onClick={() => handleOpenModal("validate-ticket")}
            className="rounded-full p-3"
            variant={"primary"}
          >
            <ReactIcons.PiIcon.PiScan size={18} />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button
            size={"sm"}
            onClick={() => handleOpenModal("add-event")}
            className="rounded-full p-3"
            variant={"primary"}
          >
            <ReactIcons.Hi2Icon.HiCalendar size={18} />
          </AuSoftUI.UI.Button>
        </div>
      </div>
      <EventBox />
    </PageBase>
  );
}
