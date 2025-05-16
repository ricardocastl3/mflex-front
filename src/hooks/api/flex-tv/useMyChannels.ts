import { internalApi } from "@/http/axios/api";
import { ITVCategoryChannels } from "@/http/interfaces/models/ITVChannel";
import { useCallback, useEffect, useState } from "react";

export default function useMyChannels() {
  const [allTVChannels, setAllTVChannels] = useState<
    ITVCategoryChannels | undefined
  >();
  const [isLoadingAllTVChannels, setIsLoadingAllTVChannels] = useState(true);

  const fetchAllTVChannels = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        tvs: ITVCategoryChannels;
      }>(`/streams/me`);

      setAllTVChannels(resp.data.tvs);
      setIsLoadingAllTVChannels(false);
    } catch (err) {
      setIsLoadingAllTVChannels(false);
    }
  }, []);

  const handleSeachByName = async (name?: string) => {
    try {
      name = name == "" ? undefined : name;
      setIsLoadingAllTVChannels(true);
      const resp = await internalApi.get<{
        tvs: ITVCategoryChannels;
      }>("/streams/me", {
        params: {
          name,
        },
      });

      setAllTVChannels(resp.data.tvs);
      setIsLoadingAllTVChannels(false);
    } catch (err) {
      setIsLoadingAllTVChannels(false);
    }
  };

  useEffect(() => {
    fetchAllTVChannels();
  }, [fetchAllTVChannels]);

  return {
    fetchAllTVChannels,
    allTVChannels,
    isLoadingAllTVChannels,
    handleSeachByName,
  };
}
