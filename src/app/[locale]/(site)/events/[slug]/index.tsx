"use client";

import { internalApi, langByCookies } from "@/http/axios/api";
import { IEvent } from "@/http/interfaces/models/IEvent";
import { use, useCallback, useEffect, useState } from "react";
import HeroEvents from "../components/Hero";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { BaseBox } from "@/@components/(box)/BaseBox";
import TicketBox from "./components/TicketsBox";

export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const eventId = use(params);

  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const handleGetEvent = useCallback(async () => {
    try {
      const resp = await internalApi.get("/events" + `/${eventId.slug}`);

      setSelectedEvent(resp.data.event);
      if (resp.data.event.status === "pending") {
        window.location.href = `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}`;
        return;
      }

      setIsLoading(false);
    } catch (err) {
      window.location.href = `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}`;
    }
  }, []);

  useEffect(() => {
    handleGetEvent();
  }, []);

  if (selectedEvent && !isLoading)
    return (
      <div className="flex flex-col">
        <HeroEvents route="slug" />
        <div className="z-0 flex w-full h-full items-center justify-center absolute -top-32 flex-col gap-4">
          <div className="w-full justify-center text-center">
            <h4 className="text-white z-20 font-bold md:text-2xl text-xl">
              {selectedEvent?.title}
            </h4>
          </div>
        </div>
        <div className="z-10 md:px-[3rem] px-5 py-12 flex flex-col gap-4">
          <h1 className="dark:text-white text-xl font-bold">
            {selectedEvent?.title}
          </h1>
          <div className="flex gap-6 md:flex-row flex-col ">
            <div className="flex flex-1">
              <BaseBox className="w-full">
                <div className="p-4"></div>
              </BaseBox>
            </div>
            <div className="md:w-[20rem] w-full">
              <BaseBox className="w-full">
                <div className="p-4"></div>
              </BaseBox>
            </div>
          </div>
        </div>
        <TicketBox tickets={selectedEvent?.event_tickets} />
      </div>
    );
}
