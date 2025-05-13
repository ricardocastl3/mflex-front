import { internalApi } from "@/http/axios/api";
import { IPlan } from "@/http/interfaces/models/IPlan";
import { useCallback, useEffect, useState } from "react";

export default function usePlan() {
  const [allPlans, setAllPlans] = useState<IPlan[]>([]);
  const [isLoadingAllPlans, setIsLoadingAllPlans] = useState(true);

  const fetchAllPlans = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        plans: IPlan[];
      }>(`/plans`);

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
