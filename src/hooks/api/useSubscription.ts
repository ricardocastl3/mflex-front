import { internalApi } from "@/http/axios/api";
import { ISubscriptionUsage } from "@/http/interfaces/models/subscriptions/ISubscriptionUsage";
import { useCallback, useEffect, useState } from "react";

export default function useSubscription() {
  const [currentSubsUsage, setCurrentSubsUsage] = useState<
    ISubscriptionUsage | undefined
  >();
  const [isLoadingCurrentSubsUsage, setIsLoadingCurrentSubsUsage] =
    useState(true);

  const fetchCurrentSubsUsage = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        subscription: ISubscriptionUsage;
      }>(`/subs/me`);

      setCurrentSubsUsage(resp.data.subscription);
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
    isLoadingCurrentSubsUsage,
  };
}
