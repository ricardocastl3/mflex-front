import { internalApi } from "@/http/axios/api";
import { IPlan } from "@/http/interfaces/models/IPlan";
import { useEffect, useState } from "react";

export default function usePlans() {
  const [allPlans, setAllPlans] = useState<IPlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);

  async function fecthPlans() {
    try {
      const resp = await internalApi.get<{ plans: IPlan[] }>("/plans");
      setIsLoadingPlans(false);
      setAllPlans(resp.data.plans);
    } catch (err) {
      setIsLoadingPlans(false);
    }
  }

  useEffect(() => {
    fecthPlans();
  }, []);
  return {
    isLoadingPlans,
    allPlans,
  };
}
