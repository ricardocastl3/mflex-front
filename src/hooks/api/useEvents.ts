import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IEvent } from "@/http/interfaces/models/IEvent";
import { useCallback, useEffect, useState } from "react";

export default function useEvents({ route }: { route: "app" | "public" }) {
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [isLoadingAllEvents, setIsLoadingAllEvents] = useState(true);

  const fetchAllEvents = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        events: IEvent[];
      }>(`/events${route == "app" ? "/me" : ""}`);

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

      const resp = await internalApi.get<{
        events: IEvent[];
      }>(`/events${mode == "app" ? "/me" : ""}`, {
        params: { name, category_id },
      });

      setAllEvents(resp.data.events);
      setIsLoadingAllEvents(false);
    } catch (err) {
      setIsLoadingAllEvents(false);
    }
  }

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  return {
    fetchAllEvents,
    allEvents,
    handleSeachByName,
    isLoadingAllEvents,
  };
}
