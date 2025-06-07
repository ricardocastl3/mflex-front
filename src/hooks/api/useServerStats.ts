import { internalApi } from "@/http/axios/api";
import { IAffiliateConfigs } from "@/http/interfaces/models/affiliate/IAffiliateConfigs";
import { IServerStats } from "@/http/interfaces/models/IServerStats";
import { IUserResponse } from "@/http/interfaces/responses/IUserResponse";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useCallback, useEffect, useState } from "react";

export default function useServerStats({
  user,
}: {
  user: IUserResponse | undefined;
}) {
  const [isLoadingAffConfigs, setIsLoadingAffConfigs] = useState(true);
  const [isLoadingServerStats, setIsLoadingServerStats] = useState(true);

  // Contexts
  const { handleAffiliateConfigs, handleServerStats } = useAppProvider();

  const fetchAllServerStats = useCallback(async () => {
    try {
      setIsLoadingServerStats(true);
      const resp = await internalApi.get<{
        stats: IServerStats | undefined;
      }>("/stats/sv");

      handleServerStats(resp.data.stats);
      setIsLoadingServerStats(false);
    } catch (err) {
      setIsLoadingServerStats(false);
    }
  }, []);

  const fetchAffiliateConfigs = useCallback(async () => {
    try {
      setIsLoadingAffConfigs(true);
      const resp = await internalApi.get<{
        configs: IAffiliateConfigs | undefined;
      }>("/stats/aff");

      handleAffiliateConfigs(resp.data.configs);
      setIsLoadingAffConfigs(false);
    } catch (err) {
      setIsLoadingAffConfigs(false);
    }
  }, []);

  useEffect(() => {
    fetchAllServerStats();
  }, []);

  useEffect(() => {
    if (user && user.profile?.affiliate_active) fetchAffiliateConfigs();
  }, [user]);

  return {
    fetchAllServerStats,
    fetchAffiliateConfigs,

    isLoadingAffConfigs,
    isLoadingServerStats,
  };
}
