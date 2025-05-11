import { internalApi } from "@/http/axios/api";
import { ILeagues } from "@/http/interfaces/models/IFixtures";
import { useCallback, useEffect, useState } from "react";

export default function useFixtures() {
  const [allFixtures, setAllFixtures] = useState<ILeagues[]>([]);
  const [isLoadingAllFixtures, setIsLoadingAllFixtures] = useState(true);

  const fetchAllFixtures = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        leagues: ILeagues[];
      }>(`/football/events`, {
        params: {
          date: new Date().toISOString(),
        },
      });

      setAllFixtures(resp.data.leagues);
      setIsLoadingAllFixtures(false);
    } catch (err) {
      setIsLoadingAllFixtures(false);
    }
  }, []);

  async function handleSeachByName({
    date,
    teamName,
  }: {
    date?: Date | string;
    teamName?: string;
  }) {
    try {
      setIsLoadingAllFixtures(true);

      const resp = await internalApi.get<{
        leagues: ILeagues[];
      }>(`/football/events`, {
        params: { date, teamName },
      });

      setAllFixtures(resp.data.leagues);
      setIsLoadingAllFixtures(false);
    } catch (err) {
      setIsLoadingAllFixtures(false);
    }
  }

  useEffect(() => {
    fetchAllFixtures();
  }, [fetchAllFixtures]);

  return {
    fetchAllFixtures,
    allFixtures,
    handleSeachByName,
    isLoadingAllFixtures,
  };
}
