import { ITicket } from "@/http/interfaces/models/ITicket";
import { createContext, ReactNode, useContext, useState } from "react";

interface ITicketProviderProps {
  selectedTicket: ITicket | undefined;
  fetchTicket: boolean;

  handleFetchTicket: (mode: boolean) => void;
  handleSelectTicket: (ticket: ITicket | undefined) => void;
}

export const TicketContext = createContext({} as ITicketProviderProps);

export function useTicketProvider() {
  const context = useContext(TicketContext);
  return context;
}

export default function TicketProvider({ children }: { children: ReactNode }) {
  const [selectedTicket, setSelectedTicket] = useState<ITicket | undefined>();

  const [fetchTicket, setFetchTicket] = useState(false);

  function handleFetchTicket(mode: boolean) {
    setFetchTicket(mode);
  }

  function handleSelectTicket(merchant: ITicket | undefined) {
    setSelectedTicket(merchant);
  }

  return (
    <TicketContext.Provider
      value={{
        handleSelectTicket,
        selectedTicket,
        fetchTicket,
        handleFetchTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
