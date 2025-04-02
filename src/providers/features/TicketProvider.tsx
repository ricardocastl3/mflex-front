import { IUserResponse } from "@/http/interfaces/responses/IUserResponse";
import { createContext, ReactNode, useContext, useState } from "react";

interface ITicketProviderProps {
  selectedTicket: IUserResponse | undefined;
  fetchTicket: boolean;

  handleFetchTicket: (mode: boolean) => void;
  handleSelectTicket: (ticket: IUserResponse | undefined) => void;
}

export const TicketContext = createContext({} as ITicketProviderProps);

export function useTicketProvider() {
  const context = useContext(TicketContext);
  return context;
}

export default function TicketProvider({ children }: { children: ReactNode }) {

  const [selectedTicket, setSelectedTicket] = useState<
    IUserResponse | undefined
  >();

  const [fetchTicket, setFetchTicket] = useState(false);

  function handleFetchTicket(mode: boolean) {
    setFetchTicket(mode);
  }

  function handleSelectTicket(merchant: IUserResponse | undefined) {
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
