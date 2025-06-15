import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";
import { ReactIcons } from "@/utils/icons";
import { ITicket } from "@/http/interfaces/models/ITicket";
import { useTicketProvider } from "@/providers/features/TicketProvider";
import { localImages } from "@/utils/images";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function TicketCard({ ticket }: { ticket: ITicket }) {
  const { handleOpenModal } = useModal();
  const { handleSelectTicket } = useTicketProvider();

  return (
    <div className="dark:bg-ausoft-slate-900 bg-white rounded-xl p-4 flex md:flex-row flex-col gap-3">
      <div className="flex md:justify-start justify-center">
        <div
          style={{
            width: window.innerWidth > 765 ? "120px" : "100%",
            objectFit: "fill",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundImage: `url(${
              ticket.event_ticket
                ? ticket.event_ticket?.event.image_url
                : localImages.vectors.emptyBox.src
            })`,
          }}
          className="rounded-xl md:h-full h-[150px]"
        ></div>
      </div>
      <div className="flex-1 flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <h4 className="dark:text-white md:text-lg text-base font-bold">
            {`${
              ticket.event_ticket
                ? ticket.event_ticket.event.title
                : ticket.event_name
            }`}
          </h4>

          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="flex items-center gap-2 dark:text-yellow-400 text-yellow-700 text-base">
              <ReactIcons.HiIcon.HiCurrencyDollar size={18} />
              {ticket.amount} Kz
            </h1>
            <h1 className="flex items-center gap-2 dark:text-slate-300">
              <ReactIcons.HiIcon.HiTicket size={18} />
              <b>{ticket.quantity}</b>
              <CTranslateTo eng="Tickets" pt="Ingressos" />
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="flex items-center gap-2 dark:text-slate-300">
                <ReactIcons.HiIcon.HiHome size={18} />
                {`${
                  ticket.event_ticket
                    ? ticket.event_ticket?.name
                    : ticket.event_ticket_name
                }`}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {new Date(
                ticket.event_ticket
                  ? ticket.event_ticket?.event.start_at
                  : ticket.event_start_at
              ) < new Date() && (
                <h1 className="flex items-center gap-2 dark:text-slate-400 text-slate-700 text-base">
                  <ReactIcons.HiIcon.HiCalendar size={18} />
                  <CTranslateTo eng="Past Event" pt="Evento Passado" />
                </h1>
              )}
              {new Date(
                ticket.event_ticket
                  ? ticket.event_ticket?.event.start_at
                  : ticket.event_start_at
              ) > new Date() && (
                <h1 className="flex items-center gap-2 dark:text-yellow-400 text-yellow-700 text-base">
                  <ReactIcons.HiIcon.HiCalendar size={18} />
                  <CTranslateTo eng="Future Event" pt="Evento Futuro" />
                </h1>
              )}
              <h1 className="flex items-center gap-2 dark:text-yellow-400 text-yellow-700 text-base">
                <ReactIcons.HiIcon.HiUser size={18} />

                {ticket.event_ticket && (
                  <>
                    {`${ticket.event_ticket?.event.organizer.first_name} ${ticket.event_ticket?.event.organizer.last_name}`}
                  </>
                )}

                {!ticket.event_ticket && <>{ticket.event_organizer}</>}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {ticket.status == "delivered" && (
            <AuSoftUI.UI.Button
              variant={"green"}
              className="items-center cursor-not-allowed md:w-fit w-full font-bold"
            >
              <ReactIcons.AiICon.AiOutlineCheck size={15} />
              <CTranslateTo eng="Delivered" pt="Entregue" />
            </AuSoftUI.UI.Button>
          )}
          {ticket.status == "paid" && ticket.event_ticket && (
            <AuSoftUI.UI.Button
              onClick={() => {
                handleSelectTicket(ticket);
                handleOpenModal("view-ticket");
              }}
              variant={"primary"}
              className="items-center md:w-fit w-full font-bold"
            >
              <ReactIcons.AiICon.AiOutlineQrcode size={15} />
              <CTranslateTo eng="View Access Code" pt="Ver código de acesso" />
            </AuSoftUI.UI.Button>
          )}

          {!ticket.event_ticket && (
            <AuSoftUI.UI.Button
              variant={"outline"}
              className="items-center cursor-not-allowed md:w-fit w-full font-bold"
            >
              <ReactIcons.AiICon.AiOutlineQrcode size={15} />
              <CTranslateTo eng="Uavailable Event" pt="Evento Indisponível" />
            </AuSoftUI.UI.Button>
          )}
        </div>
      </div>
    </div>
  );
}
