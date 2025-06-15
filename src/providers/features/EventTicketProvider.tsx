"use client";

import { IEventTicket } from "@/http/interfaces/models/organizer/IEventTicket";
import { createContext, ReactNode, useContext, useState } from "react";

interface IEventTicketProviderProps {
  selectedEventTicket: IEventTicket | undefined;
  fetchEventTicket: boolean;

  handleFetchEventTicket: (mode: boolean) => void;
  handleSelectEventTicket: (Eventticket: IEventTicket | undefined) => void;
}

export const EventTicketContext = createContext(
  {} as IEventTicketProviderProps
);

export function useEventTicketProvider() {
  const context = useContext(EventTicketContext);
  return context;
}

export default function EventTicketProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedEventTicket, setSelectedEventTicket] = useState<
    IEventTicket | undefined
  >();

  const [fetchEventTicket, setFetchEventTicket] = useState(false);

  function handleFetchEventTicket(mode: boolean) {
    setFetchEventTicket(mode);
  }

  function handleSelectEventTicket(merchant: IEventTicket | undefined) {
    setSelectedEventTicket(merchant);
  }

  return (
    <EventTicketContext.Provider
      value={{
        handleSelectEventTicket,
        selectedEventTicket,
        fetchEventTicket,
        handleFetchEventTicket,
      }}
    >
      {children}
    </EventTicketContext.Provider>
  );
}
