"use client";

import { IEvent } from "@/http/interfaces/models/organizer/IEvent";
import { createContext, ReactNode, useContext, useState } from "react";

interface IEventProviderProps {
  selectedEvent: IEvent | undefined;
  fetchEvent: boolean;

  handleFetchEvent: (mode: boolean) => void;
  handleSelectEvent: (event: IEvent | undefined) => void;
}

export const EventContext = createContext({} as IEventProviderProps);

export function useEventProvider() {
  const context = useContext(EventContext);
  return context;
}

export default function EventProvider({ children }: { children: ReactNode }) {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>();

  const [fetchEvent, setFetchEvent] = useState(false);

  function handleFetchEvent(mode: boolean) {
    setFetchEvent(mode);
  }

  function handleSelectEvent(merchant: IEvent | undefined) {
    setSelectedEvent(merchant);
  }

  return (
    <EventContext.Provider
      value={{
        handleSelectEvent,
        selectedEvent,
        fetchEvent,
        handleFetchEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
