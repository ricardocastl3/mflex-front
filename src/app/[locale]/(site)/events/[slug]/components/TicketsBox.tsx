import { ReactIcons } from "@/utils/icons";
import { IEventTicket } from "@/http/interfaces/models/organizer/IEventTicket";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TicketCard from "./TicketCard";

export default function TicketBox({ tickets }: { tickets: IEventTicket[] }) {
  return (
    <div className="md:px-12 px-5 py-8 flex flex-col gap-4 border-b border-slate-300 dark:border-slate-800 bg-white dark:bg-ausoft-slate-900">
      <h1 className="dark:text-white text-2xl font-bold">
        <CTranslateTo eng="Tickets" pt="Ingressos" />
      </h1>

      {tickets.length > 0 && (
        <div className="flex flex-col gap-4">
          {tickets.map((ticket, i) => {
            return <TicketCard key={i} ticket={ticket} />;
          })}
        </div>
      )}
      {tickets.length <= 0 && (
        <div className=" flex items-center justify-center text-center gap-4 flex-col">
          <ReactIcons.HiIcon.HiTicket size={30} className="dark:text-white" />
          <div className="flex flex-col gap-2">
            <h2 className="text-xl dark:text-white">
              <CTranslateTo
                eng="No tickets available"
                pt="Sem Ingressos Disponíveis"
              />
            </h2>
            <h2 className="text-lg dark:text-slate-300 text-slate-600">
              <CTranslateTo
                eng="No tickets available"
                pt="Assim que forem disponibilidazados verá todos aqui"
              />
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
