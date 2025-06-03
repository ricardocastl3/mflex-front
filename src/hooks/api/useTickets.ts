import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IUserTickerResponseAPI } from "@/http/interfaces/models/ITicket";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useTickets() {
  const [allTickets, setAllTickets] = useState<IUserTickerResponseAPI>({
    has: false,
    tickets: [],
    total: 0,
  });
  const [isLoadingAllTickets, setIsLoadingAllTickets] = useState(true);
  const [isLoadingMoreTickets, setIsLoadingMoreTickets] = useState(false);

  const fetchAllTickets = useCallback(async () => {
    try {
      const resp = await internalApi.get<IUserTickerResponseAPI>(`/tickets`, {
        params: {
          currentPage: 0,
          nextPage: appConfigs.api.pageLoads,
        },
      });

      setAllTickets(resp.data);
      setIsLoadingAllTickets(false);
    } catch (err) {
      setIsLoadingAllTickets(false);
    }
  }, []);

  async function handleSeachByName({ name, mode }: ISearchDataField) {
    try {
      setIsLoadingAllTickets(true);

      const resp = await internalApi.get<IUserTickerResponseAPI>("/tickets", {
        params: {
          name,
          currentPage: 0,
          nextPage: appConfigs.api.pageLoads,
        },
      });

      setAllTickets(resp.data);
      setIsLoadingAllTickets(false);
    } catch (err) {
      setIsLoadingAllTickets(false);
    }
  }

  async function handleLoadMore(name?: string) {
    try {
      name = name == "" ? undefined : name;
      setIsLoadingMoreTickets(true);

      const resp = await internalApi.get<IUserTickerResponseAPI>(`/tickets`, {
        params: {
          currentPage: allTickets.tickets.length,
          nextPage: appConfigs.api.pageLoads,
          name,
        },
      });

      if (resp.data.has) {
        setAllTickets((state) => ({
          ...state,
          has: resp.data.has,
          total: resp.data.total,
          tickets: [...state.tickets, ...resp.data.tickets],
        }));
      } else {
        setAllTickets((state) => ({
          ...state,
          has: false,
        }));
      }

      setIsLoadingMoreTickets(false);
    } catch (err) {
      setIsLoadingMoreTickets(false);
    }
  }

  useEffect(() => {
    fetchAllTickets();
  }, [fetchAllTickets]);

  return {
    fetchAllTickets,
    allTickets,
    handleLoadMore,
    isLoadingMoreTickets,
    handleSeachByName,
    isLoadingAllTickets,
  };
}
