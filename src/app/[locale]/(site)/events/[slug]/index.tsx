"use client";

import { internalApi, langByCookies } from "@/http/axios/api";
import { IEvent } from "@/http/interfaces/models/IEvent";
import { use, useCallback, useEffect, useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { format } from "date-fns";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { enUS, pt } from "date-fns/locale";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TicketBox from "./components/TicketsBox";
import EventSkeleton from "./components/EventSkeleton";

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

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-[60vh] bg-slate-200 animate-pulse dark:bg-ausoft-slate-900"></div>
        <EventSkeleton />
      </div>
    );
  }

  if (selectedEvent && !isLoading)
    return (
      <div className="flex flex-col ">
        <div
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundImage: `url(https://img.freepik.com/free-vector/yellow-color-elegant-wave-style-corporate-banner-design_1055-13670.jpg?t=st=1744311252~exp=1744314852~hmac=abf3be930eff3eb4164247c9059bbc1a558042d88e633b97e50a66058c2e2c9b&w=1380)`,
            backgroundAttachment: "fixed",
          }}
          className="h-[60vh] relative"
        >
          <div className="z-0 inset-0 bg-black/50 absolute"></div>
          <div className="flex flex-col gap-2 md:px-[2.5rem] px-5 z-10 absolute justify-center h-full w-full ">
            <h1 className="text-yellow-300 md:text-2xl text-[1.4rem]">
              <CTranslateTo
                eng="Get your ticket 🚀"
                pt="Adquira o seu ingresso 🚀"
              />
            </h1>
            <h1 className="text-white md:text-xl text-lg">
              <CTranslateTo
                eng="Quickly, simply and in your comfort 🌟"
                pt="De forma rápida, simples e no seu conforto 🌟"
              />
            </h1>
          </div>
        </div>
        <div className="md:px-[3rem] px-5 py-12 flex flex-col gap-4">
          <h1 className="dark:text-white md:text-[1.6rem] text-xl font-bold pb-2">
            {selectedEvent?.title}
          </h1>
          <div className="flex gap-6 md:flex-row flex-col h-full">
            <div className="flex flex-1 flex-col">
              <BaseBox
                style={{
                  objectFit: "cover",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${selectedEvent.image_url})`,
                }}
                className="w-full md:h-[600px] h-[300px]"
              ></BaseBox>
              <div className="py-7">
                <h2 className="text-lg dark:text-white">
                  {selectedEvent.description}
                </h2>
              </div>
            </div>
            <div className="md:w-[22rem] w-full flex-col flex gap-4">
              <BaseBox className="w-full flex flex-col gap-2 p-5">
                <h1 className="dark:text-white md:text-xl text-lg font-bold pb-4 border-b border-slate-300 dark:border-slate-800">
                  <CTranslateTo eng="General" pt="Geral" />
                </h1>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ReactIcons.Hi2Icon.HiCalendar
                      size={20}
                      className="dark:text-white"
                    />
                    <h2 className="dark:text-white font-bold text-base">
                      <CTranslateTo eng="Date" pt="Data" />
                    </h2>
                  </div>

                  <h2 className="dark:text-slate-300 text-base">
                    {format(new Date(selectedEvent.start_at), "d MMMM", {
                      locale: langByCookies == "pt" ? pt : enUS,
                    })}
                  </h2>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <ReactIcons.Hi2Icon.HiClock
                      size={20}
                      className="dark:text-white"
                    />
                    <h2 className="dark:text-white font-bold text-base">
                      <CTranslateTo eng="Hour" pt="Horário" />
                    </h2>
                  </div>

                  <h2 className="dark:text-slate-300 text-base">
                    {new Date(selectedEvent.start_at).getHours()}:
                    {new Date(selectedEvent.start_at).getMinutes()}
                  </h2>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <ReactIcons.VSCIcon.VscAzureDevops
                      size={20}
                      className="dark:text-white"
                    />
                    <h2 className="dark:text-white font-bold text-base">
                      <CTranslateTo eng="Category" pt="Categoria" />
                    </h2>
                  </div>

                  <h2 className="dark:text-slate-300 text-base">
                    {selectedEvent.category
                      ? selectedEvent.category.name
                      : "---------"}
                  </h2>
                </div>
              </BaseBox>
              <BaseBox className="w-full flex flex-col gap-2 p-5">
                <h1 className="dark:text-white md:text-xl text-lg font-bold pb-4 border-b border-slate-300 dark:border-slate-800">
                  <CTranslateTo eng="Location" pt="Localização" />
                </h1>

                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <ReactIcons.Hi2Icon.HiMap
                      size={20}
                      className="dark:text-white"
                    />
                    <h2 className="dark:text-white font-bold text-base">
                      <CTranslateTo eng="Province" pt="Província" />
                    </h2>
                  </div>

                  <h2 className="dark:text-slate-300 text-base">
                    {selectedEvent.main_address}
                  </h2>
                </div>
              </BaseBox>

              <BaseBox className="w-full flex flex-col gap-2 p-5">
                <h1 className="dark:text-white md:text-xl text-lg font-bold pb-4 border-b border-slate-300 dark:border-slate-800">
                  <CTranslateTo
                    eng="Reference Point"
                    pt="Ponto de Referência"
                  />
                </h1>

                <div className="flex items-center gap-2">
                  <ReactIcons.PiIcon.PiMapPinFill
                    size={20}
                    className="dark:text-white"
                  />
                  <h2 className="dark:text-slate-300 text-base">
                    {selectedEvent.reference_address}
                  </h2>
                </div>
              </BaseBox>
              <BaseBox className="w-full flex flex-col gap-2 p-5">
                <h1 className="dark:text-white md:text-xl text-lg font-bold pb-4 border-b border-slate-300 dark:border-slate-800">
                  <CTranslateTo eng="Organizer" pt="Organizador" />
                </h1>

                <div className="flex flex-col gap-2">
                  <h2 className="dark:text-white font-bold text-base">
                    <CTranslateTo eng="Name" pt="Nome" />
                  </h2>
                  <h2 className="dark:text-slate-300 text-base">
                    {`${selectedEvent.organizer.first_name} ${selectedEvent.organizer.last_name}`}
                  </h2>
                </div>

                {selectedEvent.organizer.email &&
                  selectedEvent.organizer.email != "" && (
                    <div className="flex flex-col gap-2">
                      <h2 className="dark:text-white font-bold text-base">
                        <CTranslateTo eng="Email" pt="Email" />
                      </h2>
                      <h2 className="dark:text-slate-300 text-base">
                        {`${selectedEvent.organizer.email}`}
                      </h2>
                    </div>
                  )}
              </BaseBox>
            </div>
          </div>
        </div>
        <TicketBox tickets={selectedEvent?.event_tickets} />
      </div>
    );
}
