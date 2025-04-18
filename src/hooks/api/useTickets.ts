import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { ITicket } from "@/http/interfaces/models/ITicket";
import { useCallback, useEffect, useState } from "react";

export default function useTickets() {
  const [allTickets, setAllTickets] = useState<ITicket[]>([]);
  const [isLoadingAllTickets, setIsLoadingAllTickets] = useState(true);

  const fetchAllTickets = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        tickets: ITicket[];
      }>(`/tickets/me`);

      setAllTickets(resp.data.tickets);
      setIsLoadingAllTickets(false);
    } catch (err) {
      setIsLoadingAllTickets(false);
    }
  }, []);

  async function handleSeachByName({ name, mode }: ISearchDataField) {
    try {
      setIsLoadingAllTickets(true);

      const resp = await internalApi.get<{
        tickets: ITicket[];
      }>("/tickets", { params: { name } });

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
    fetchAllTickets,
    allTickets,
    handleSeachByName,
    isLoadingAllTickets,
  };
}
