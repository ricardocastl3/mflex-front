import { internalApi } from "@/http/axios/api";
import { IFixtureAPI } from "@/http/interfaces/models/football/IFixturesAPI";
import { useCallback, useEffect, useState } from "react";

export default function useFootballTeamPlayers({
  team,
  side,
}: {
  team: IFixtureAPI;
  side: "away" | "home";
}) {
  const [allFootballPlayers, setAllFootballPlayers] = useState<
    IFootballPlayerFullStats | undefined
  >();
  const [isLoadingAllFootballPlayers, setIsLoadingAllFootballPlayers] =
    useState(true);

  const fetchAllFootballPlayers = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        team: IFootballPlayerFullStats | undefined;
      }>(`/football/ply`, {
        params: {
          ft: team.fixture.id,
          team: side == "away" ? team.teams.away.id : team.teams.home.id,
        },
      });

      setAllFootballPlayers(
        resp.data.team == null ? undefined : resp.data.team
      );
      setIsLoadingAllFootballPlayers(false);
    } catch (err) {
      setIsLoadingAllFootballPlayers(false);
    }
  }, []);

  useEffect(() => {
    fetchAllFootballPlayers();
  }, [fetchAllFootballPlayers]);

  return {
    fetchAllFootballPlayers,
    allFootballPlayers,
    isLoadingAllFootballPlayers,
  };
}
