import { internalApi } from "@/http/axios/api";
import { IPlan } from "@/http/interfaces/models/IPlan";
import { useCallback, useEffect, useState } from "react";

export default function usePlan({ route }: { route: "musics" | "flex" }) {
  const [allPlans, setAllPlans] = useState<IPlan[]>([]);
  const [isLoadingAllPlans, setIsLoadingAllPlans] = useState(true);

  const apiRoutes = route == "flex" ? "/plans" : "/artists/plans";

  const fetchAllPlans = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        plans: IPlan[];
      }>(apiRoutes);

      setAllPlans(resp.data.plans);
      setIsLoadingAllPlans(false);
    } catch (err) {
      setIsLoadingAllPlans(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPlans();
  }, [fetchAllPlans]);

  return {
    fetchAllPlans,
    allPlans,
    isLoadingAllPlans,
  };
}
