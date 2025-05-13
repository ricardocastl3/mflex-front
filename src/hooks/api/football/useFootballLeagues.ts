import { internalApi } from "@/http/axios/api";
import { IFootballLeague } from "@/http/interfaces/models/football/IFootballLeague";
import { useCallback, useEffect, useState } from "react";

export default function useFootballLeagues() {
  const [allFootballLeagues, setAllFootballLeagues] = useState<
    IFootballLeague[]
  >([]);
  const [isLoadingAllFootballLeagues, setIsLoadingAllFootballLeagues] =
    useState(true);

  const fetchAllFootballLeagues = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        leagues: IFootballLeague[];
      }>(`/football/lgs`);

      setAllFootballLeagues(resp.data.leagues);
      setIsLoadingAllFootballLeagues(false);
    } catch (err) {
      setIsLoadingAllFootballLeagues(false);
    }
  }, []);

  async function handleSeachByName({ name }: { name?: string }) {
    try {
      setIsLoadingAllFootballLeagues(true);

      const resp = await internalApi.get<{
        leagues: IFootballLeague[];
      }>(`/football/lgs`, {
        params: { name },
      });

      setAllFootballLeagues(resp.data.leagues);
      setIsLoadingAllFootballLeagues(false);
    } catch (err) {
      setIsLoadingAllFootballLeagues(false);
    }
  }

  useEffect(() => {
    fetchAllFootballLeagues();
  }, [fetchAllFootballLeagues]);

  return {
    fetchAllFootballLeagues,
    allFootballLeagues,
    handleSeachByName,
    isLoadingAllFootballLeagues,
  };
}
