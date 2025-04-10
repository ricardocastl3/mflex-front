import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IEvent } from "@/http/interfaces/models/IEvent";
import { useCallback, useEffect, useState } from "react";

export default function useEvents({ route }: { route: "app" | "public" }) {
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [isLoadingAllEvents, setIsLoadingAllEvents] = useState(true);

  const [hasMoreEvents, setHasMoreEvents] = useState(true);
  const [isLoadingMoreEvents, setIsLoadingMoreEvents] = useState(false);

  const fetchAllEvents = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        events: IEvent[];
      }>(`/events${route == "app" ? "/me" : ""}`, {
        params: {
          currentPage: 0,
          nextPage: 4,
        },
      });

      setAllEvents(resp.data.events);
      setIsLoadingAllEvents(false);
    } catch (err) {
      setIsLoadingAllEvents(false);
    }
  }, []);

  async function handleSeachByName({
    name,
    mode,
    category_id,
  }: ISearchDataField) {
    try {
      setIsLoadingAllEvents(true);

      name = name == "" ? undefined : name;
      category_id = category_id == "" ? undefined : category_id;

      const resp = await internalApi.get<{
        events: IEvent[];
      }>(`/events${mode == "app" ? "/me" : ""}`, {
        params: { name, category_id, currentPage: 0, nextPage: 4 },
      });

      if (resp.data.events.length > 0) {
        setHasMoreEvents(true);
      }

      setAllEvents(resp.data.events);
      setIsLoadingAllEvents(false);
    } catch (err) {
      setIsLoadingAllEvents(false);
    }
  }

  async function handleLoadMore({ name, mode, category_id }: ISearchDataField) {
    try {
      setIsLoadingMoreEvents(true);
      name = name == "" ? undefined : name;

      const resp = await internalApi.get<{
        events: IEvent[];
      }>(`/events${mode == "app" ? "/me" : ""}`, {
        params: {
          name,
          category_id,
          currentPage: allEvents.length,
          nextPage: 4,
        },
      });

      if (resp.data.events.length <= 0) {
        setHasMoreEvents(false);
      } else {
        setAllEvents((state) => [...state, ...resp.data.events]);
      }

      setIsLoadingMoreEvents(false);
    } catch (err) {
      setIsLoadingMoreEvents(false);
    }
  }

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  return {
    handleLoadMore,
    hasMoreEvents,
    fetchAllEvents,
    allEvents,
    isLoadingMoreEvents,
    handleSeachByName,
    isLoadingAllEvents,
  };
}
