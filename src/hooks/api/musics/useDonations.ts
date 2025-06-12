import { internalApi } from "@/http/axios/api";
import { ISubscriptionResponseAPI } from "@/http/interfaces/models/subscriptions/ISubscription";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useDonations() {
  const [allSubs, setAllSubs] = useState<ISubscriptionResponseAPI>({
    subs: [],
    total: 0,
    has: false,
  });

  const [isLoadingAllSubs, setIsLoadingAllSubs] = useState(true);
  const [isLoadingMoreSubsTrans, setIsLoadingMoreSubsTrans] = useState(false);

  const fetchAllSubs = useCallback(async () => {
    try {
      const resp = await internalApi.get<ISubscriptionResponseAPI>(
        `/subs/all`,
        {
          params: {
            currentPage: allSubs.subs.length,
            nextPage: appConfigs.api.pageLoads,
          },
        }
      );

      setAllSubs(resp.data);
      setIsLoadingAllSubs(false);
    } catch (err) {
      setIsLoadingAllSubs(false);
    }
  }, []);

  async function handleLoadMore() {
    try {
      setIsLoadingMoreSubsTrans(true);

      const resp = await internalApi.get<ISubscriptionResponseAPI>(
        `/subs/all`,
        {
          params: {
            currentPage: allSubs.subs.length,
            nextPage: appConfigs.api.pageLoads,
          },
        }
      );

      if (resp.data.has) {
        setAllSubs((state) => ({
          ...state,
          has: resp.data.has,
          total: resp.data.total,
          subs: [...state.subs, ...resp.data.subs],
        }));
      } else {
        setAllSubs((state) => ({
          ...state,
          has: false,
        }));
      }

      setIsLoadingMoreSubsTrans(false);
    } catch (err) {
      setIsLoadingMoreSubsTrans(false);
    }
  }

  useEffect(() => {
    fetchAllSubs();
  }, [fetchAllSubs]);

  return {
    fetchAllSubs,
    allSubs,
    handleLoadMore,
    isLoadingMoreSubsTrans,
    isLoadingAllSubs,
  };
}
