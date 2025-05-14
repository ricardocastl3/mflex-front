import { internalApi } from "@/http/axios/api";
import { ISubscription } from "@/http/interfaces/models/subscriptions/ISubscription";
import { useCallback, useEffect, useState } from "react";

export default function useSubscriptionTransactions() {
  const [allSubs, setAllSubs] = useState<ISubscription[]>([]);

  const [isLoadingAllSubs, setIsLoadingAllSubs] = useState(true);

  const fetchAllSubs = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        subs: ISubscription[];
      }>(`/subs/all`);

      setAllSubs(resp.data.subs);
      setIsLoadingAllSubs(false);
    } catch (err) {
      setIsLoadingAllSubs(false);
    }
  }, []);

  useEffect(() => {
    fetchAllSubs();
  }, [fetchAllSubs]);

  return {
    fetchAllSubs,
    allSubs,
    isLoadingAllSubs,
  };
}
