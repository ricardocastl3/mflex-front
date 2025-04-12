import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IPodcast } from "@/http/interfaces/models/IPodCast";
import { useCallback, useEffect, useState } from "react";

export default function usePodcasts() {
  const [allPodcasts, setAllPodcasts] = useState<IPodcast[]>([]);
  const [isLoadingAllPodcasts, setIsLoadingAllPodcasts] = useState(true);

  const [hasMorePodcasts, setHasMorePodcasts] = useState(true);
  const [isLoadingMorePodcasts, setIsLoadingMorePodcasts] = useState(false);

  const fetchAllPodcasts = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        podcasts: IPodcast[];
      }>(`/podcasts`, {
        params: {
          currentPage: 0,
          nextPage: 4,
        },
      });

      if (resp.data.podcasts.length <= 0) setHasMorePodcasts(false);
      setAllPodcasts(resp.data.podcasts);
      setIsLoadingAllPodcasts(false);
    } catch (err) {
      setIsLoadingAllPodcasts(false);
    }
  }, []);

  async function handleSeachByName({
    name,
    mode,
    category_id,
  }: ISearchDataField) {
    try {
      setIsLoadingAllPodcasts(true);

      name = name == "" ? undefined : name;
      category_id = category_id == "" ? undefined : category_id;

      const resp = await internalApi.get<{
        podcasts: IPodcast[];
      }>(`/podcasts`, {
        params: { name, category_id, currentPage: 0, nextPage: 4 },
      });

      if (resp.data.podcasts.length > 0) {
        setHasMorePodcasts(true);
      }

      setAllPodcasts(resp.data.podcasts);
      setIsLoadingAllPodcasts(false);
    } catch (err) {
      setIsLoadingAllPodcasts(false);
    }
  }

  async function handleLoadMore({ name, mode, category_id }: ISearchDataField) {
    try {
      setIsLoadingMorePodcasts(true);
      name = name == "" ? undefined : name;

      const resp = await internalApi.get<{
        podcasts: IPodcast[];
      }>(`/podcasts`, {
        params: {
          name,
          category_id,
          currentPage: allPodcasts.length,
          nextPage: 4,
        },
      });

      if (resp.data.podcasts.length <= 0) {
        setHasMorePodcasts(false);
      } else {
        setAllPodcasts((state) => [...state, ...resp.data.podcasts]);
      }

      setIsLoadingMorePodcasts(false);
    } catch (err) {
      setIsLoadingMorePodcasts(false);
    }
  }

  useEffect(() => {
    fetchAllPodcasts();
  }, [fetchAllPodcasts]);

  return {
    handleLoadMore,
    hasMorePodcasts,
    fetchAllPodcasts,
    allPodcasts,
    isLoadingMorePodcasts,
    handleSeachByName,
    isLoadingAllPodcasts,
  };
}
