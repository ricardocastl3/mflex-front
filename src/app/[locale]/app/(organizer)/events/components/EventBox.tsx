import { IEvent } from "@/http/interfaces/models/IEvent";
import { AuSoftUI } from "@/@components/(ausoft)";

import ContainerBase from "../../../@components/ContainerBase";
import EventCard from "./EventCard";

export default function EventBox({
  events,
  isLoading,
}: {
  isLoading: boolean;
  events: IEvent[];
}) {
  return (
    <ContainerBase>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="md:h-[50vh] h-[60vh] w-full rounded-xl bg-slate-300/40 dark:bg-ausoft-slate-900 animate-pulse"
                ></div>
              );
            })}
          </>
        )}

        {!isLoading && events.length > 0 && (
          <>
            {events.map((event, i) => {
              return <EventCard event={event} key={i} />;
            })}
          </>
        )}
      </div>

      {!isLoading && events.length <= 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <AuSoftUI.Component.ListEmpty
            hasAction={false}
            action_en=""
            action_pt=""
            action_url=""
            description_en="Your searched or registered events will be shown here"
            description_pt="Os seus eventos buscados ou registrados serão mostrados aqui"
            title_en="No Events"
            title_pt="Sem Eventos"
          />
        </div>
      )}
    </ContainerBase>
  );
}
