import { internalApi } from "@/http/axios/api";
import { IMusicSubscription } from "@/http/interfaces/models/artists/IMusicSubscription";
import { ISubscriptionUsage } from "@/http/interfaces/models/subscriptions/ISubscriptionUsage";
import { useCallback, useEffect, useState } from "react";

export default function useSubscription() {
  const [currentSubsUsage, setCurrentSubsUsage] = useState<
    ISubscriptionUsage | undefined
  >();

  const [currentMusicSubsUsage, setCurrentMusicSubsUsage] = useState<
    IMusicSubscription | undefined
  >();

  const [isLoadingCurrentSubsUsage, setIsLoadingCurrentSubsUsage] =
    useState(true);

  const fetchCurrentSubsUsage = useCallback(async () => {
    try {
      setIsLoadingCurrentSubsUsage(true);

      const resp = await internalApi.get<{
        subscription: ISubscriptionUsage;
        artist: IMusicSubscription;
      }>(`/subs/me`);

      setCurrentSubsUsage(resp.data.subscription);
      setCurrentMusicSubsUsage(resp.data.artist);
      setIsLoadingCurrentSubsUsage(false);
    } catch (err) {
      setIsLoadingCurrentSubsUsage(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentSubsUsage();
  }, [fetchCurrentSubsUsage]);

  return {
    fetchCurrentSubsUsage,
    currentSubsUsage,
    currentMusicSubsUsage,
    isLoadingCurrentSubsUsage,
  };
}
