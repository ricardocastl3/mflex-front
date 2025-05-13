import { internalApi } from "@/http/axios/api";
import { ISubscriptionUsage } from "@/http/interfaces/models/subscriptions/ISubscriptionUsage";
import { useCallback, useEffect, useState } from "react";

export default function useSubscription({ loadUser }: { loadUser: boolean }) {
  const [currentSubsUsage, setCurrentSubsUsage] = useState<
    ISubscriptionUsage | undefined
  >();
  const [isLoadingCurrentSubsUsage, setIsLoadingCurrentSubsUsage] =
    useState(true);

  const fetchCurrentSubsUsage = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        subs: ISubscriptionUsage;
      }>(`/subs/me`);

      setCurrentSubsUsage(resp.data.subs);
      setIsLoadingCurrentSubsUsage(false);
    } catch (err) {
      setIsLoadingCurrentSubsUsage(false);
    }
  }, []);

  useEffect(() => {
    if (!loadUser) fetchCurrentSubsUsage();
  }, [loadUser]);

  return {
    fetchCurrentSubsUsage,
    currentSubsUsage,
    isLoadingCurrentSubsUsage,
  };
}
