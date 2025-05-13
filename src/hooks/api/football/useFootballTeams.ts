import { internalApi } from "@/http/axios/api";
import { IFootballAPITeam } from "@/http/interfaces/models/football/IFootballAPITeam";
import { useCallback, useEffect, useState } from "react";

export default function useFootballTeams() {
  const [allFootballTeams, setAllFootballTeams] = useState<IFootballAPITeam[]>(
    []
  );
  const [isLoadingAllFootballTeams, setIsLoadingAllFootballTeams] =
    useState(true);

  const fetchAllFootballTeams = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        teams: IFootballAPITeam[];
      }>(`/football/tms`, {
        params: {
          date: new Date().toISOString(),
        },
      });

      setAllFootballTeams(resp.data.teams);
      setIsLoadingAllFootballTeams(false);
    } catch (err) {
      setIsLoadingAllFootballTeams(false);
    }
  }, []);

  async function handleSeachByName({ name }: { name?: string }) {
    try {
      setIsLoadingAllFootballTeams(true);

      const resp = await internalApi.get<{
        teams: IFootballAPITeam[];
      }>(`/football/tms`, {
        params: { name },
      });

      setAllFootballTeams(resp.data.teams);
      setIsLoadingAllFootballTeams(false);
    } catch (err) {
      setIsLoadingAllFootballTeams(false);
    }
  }

  useEffect(() => {
    fetchAllFootballTeams();
  }, [fetchAllFootballTeams]);

  return {
    fetchAllFootballTeams,
    allFootballTeams,
    handleSeachByName,
    isLoadingAllFootballTeams,
  };
}
