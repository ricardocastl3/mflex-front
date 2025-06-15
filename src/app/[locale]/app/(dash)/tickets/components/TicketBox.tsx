import {
  ITicket,
  IUserTickerResponseAPI,
} from "@/http/interfaces/models/ITicket";
import { AuSoftUI } from "@/@components/(ausoft)";

import ContainerBase from "../../../@components/ContainerBase";
import TicketCard from "./TicketCard";
import LoadMoreContent from "../../../@components/api-query-pages/LoadMoreContent";
import LoadingMoreButton from "../../../@components/api-query-pages/LoadingMoreButton";

export default function TicketBox({
  isLoading,
  isLoadingMore,
  ticketsAPI,
  fetchMore,
}: {
  isLoading: boolean;
  isLoadingMore: boolean;
  fetchMore: () => void;
  ticketsAPI: IUserTickerResponseAPI;
}) {
  const tickets = ticketsAPI.tickets;

  return (
    <ContainerBase>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="h-[30vh] w-full rounded-xl bg-slate-300/40 dark:bg-ausoft-slate-900 animate-pulse"
                ></div>
              );
            })}
          </>
        )}

        {!isLoading && tickets.length > 0 && (
          <>
            {tickets.map((ticket, i) => {
              return <TicketCard ticket={ticket} key={i} />;
            })}
          </>
        )}
      </div>

      <LoadMoreContent isLoading={isLoadingMore} />

      <LoadingMoreButton
        fetchMore={fetchMore}
        has={ticketsAPI.has}
        isLoading={isLoadingMore}
      />

      {!isLoading && tickets.length <= 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <AuSoftUI.Component.ListEmpty
            hasAction={false}
            action_en=""
            action_pt=""
            action_url=""
            description_en="Your searched or registered tickets will be shown here"
            description_pt="Os seus ingressos buscados ou registrados serão mostrados aqui"
            title_en="No Tickets"
            title_pt="Sem Ingressos"
          />
        </div>
      )}
    </ContainerBase>
  );
}
