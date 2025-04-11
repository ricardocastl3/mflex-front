import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IEventTicket } from "@/http/interfaces/models/EventTicket";
import { useCallback, useEffect, useState } from "react";

export default function useEventTickets() {
  const [allTickets, setAllTickets] = useState<IEventTicket[]>([]);
  const [isLoadingAllTickets, setIsLoadingAllTickets] = useState(true);

  const fetchAllTickets = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        tickets: IEventTicket[];
      }>(`/events/tickets/me`);

      setAllTickets(resp.data.tickets);
      setIsLoadingAllTickets(false);
    } catch (err) {
      setIsLoadingAllTickets(false);
    }
  }, []);

  async function handleSeachEventTicket({ name }: ISearchDataField) {
    try {
      setIsLoadingAllTickets(true);

      const resp = await internalApi.get<{
        tickets: IEventTicket[];
      }>("/events/tickets", { params: { name } });

      setAllTickets(resp.data.tickets);
      setIsLoadingAllTickets(false);
    } catch (err) {
      setIsLoadingAllTickets(false);
    }
  }

  useEffect(() => {
    fetchAllTickets();
  }, [fetchAllTickets]);

  return {
    handleSeachEventTicket,
    fetchAllTickets,
    allTickets,
    isLoadingAllTickets,
  };
}
