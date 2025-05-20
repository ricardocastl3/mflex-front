import { internalApi } from "@/http/axios/api";
import { ITVMovieChannelsAPI } from "@/http/interfaces/models/tv/ITVMovie";
import { useCallback, useEffect, useState } from "react";

export default function useMyMovies() {
  const [allTVMovies, setAllTVMovies] = useState<
    ITVMovieChannelsAPI[]
  >([]);
  const [isLoadingAllTVMovies, setIsLoadingAllTVMovies] = useState(true);

  const fetchAllTVMovies = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        movies: ITVMovieChannelsAPI[];
      }>(`/movies`);

      setAllTVMovies(resp.data.movies);
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
        movies: ITVMovieChannelsAPI[];
      }>("/movies", {
        params: {
          name,
        },
      });

      setAllTVMovies(resp.data.movies);
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
