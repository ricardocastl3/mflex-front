import { internalApi } from "@/http/axios/api";
import { ITVMovieChannelsAPI } from "@/http/interfaces/models/tv/ITVMovie";
import { useCallback, useEffect, useState } from "react";

export default function useMyMovies() {
  const [allTVMovies, setAllTVMovies] = useState<
    ITVMovieChannelsAPI | undefined
  >();
  const [isLoadingAllTVMovies, setIsLoadingAllTVMovies] = useState(true);

  const fetchAllTVMovies = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        tvs: ITVMovieChannelsAPI;
      }>(`/movies`);

      setAllTVMovies(resp.data.tvs);
      setIsLoadingAllTVMovies(false);
    } catch (err) {
      setIsLoadingAllTVMovies(false);
    }
  }, []);

  const handleSeachByName = async (name?: string) => {
    try {
      name = name == "" ? undefined : name;
      setIsLoadingAllTVMovies(true);
      const resp = await internalApi.get<{
        tvs: ITVMovieChannelsAPI;
      }>("/movies", {
        params: {
          name,
        },
      });

      setAllTVMovies(resp.data.tvs);
      setIsLoadingAllTVMovies(false);
    } catch (err) {
      setIsLoadingAllTVMovies(false);
    }
  };

  useEffect(() => {
    fetchAllTVMovies();
  }, [fetchAllTVMovies]);

  return {
    fetchAllTVMovies,
    allTVMovies,
    isLoadingAllTVMovies,
    handleSeachByName,
  };
}
