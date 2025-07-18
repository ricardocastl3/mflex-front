"use client";

import { use, useCallback, useEffect, useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useResourceProvider } from "@/providers/features/ResourceProvider";
import { ITVMovie } from "@/http/interfaces/models/tv/ITVMovie";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";

import CommentContainer from "../../components/comments/CommentContainer";
import MVBoardContent from "./components/MVBoardContent";
import HeroTVMovie from "./components/Hero";
import MVSkeleton from "./components/MVSkeleton";
import MVBoardRelated from "./components/MVBoardRelated";
import MVBoardOthers from "./components/MVBoardOthers";
import useMyMovies from "@/hooks/api/flex-tv/useMyMovies";

type Props = {
  params: Promise<{ id: string }>;
};

export default function PreviewNew({ params }: Props) {
  const pars = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<ITVMovie | undefined>();
  const [allMovieSafed, setAllMovieSafed] = useState<ITVMovie[]>([]);

  const { handleSelectFlexTVMovie } = useFlexTVProvider();
  const { fetchResource } = useResourceProvider();
  const { isLoadingAllTVMovies, allTVMovies } = useMyMovies();

  const fetchMovie = useCallback(async () => {
    try {
      const resp = await internalApi.get("/movies/mv", {
        params: {
          id: pars.id,
        },
      });
      handleSelectFlexTVMovie(resp.data.mv);
      setSelectedMovie(resp.data.mv);
      setIsLoading(false);
    } catch (err) {
      window.location.href = `/${langByCookies}/flex-movie`;
    }
  }, []);

  useEffect(() => {
    if (fetchResource) fetchMovie();
  }, [fetchResource]);

  useEffect(() => {
    if (isLoadingAllTVMovies) return;

    const movies: ITVMovie[] = [];

    const cats = allTVMovies.map((cat) => cat.tv_movies);

    cats.forEach((mv) => {
      movies.push(...mv);
    });

    setAllMovieSafed(movies);
  }, [allTVMovies, isLoadingAllTVMovies]);

  useEffect(() => {
    fetchMovie();
  }, []);

  if (isLoading || isLoadingAllTVMovies) {
    return (
      <div className="flex flex-col">
        <div className="relative">
          <HeroTVMovie route="slug" />
          <div className="absolute inset-0 justify-center flex items-center">
            <ReactIcons.PiIcon.PiSpinner
              size={40}
              className="animate-spin text-white"
            />
          </div>
        </div>
        <MVSkeleton />
      </div>
    );
  }

  if (selectedMovie && !isLoading && !isLoadingAllTVMovies)
    return (
      <div className="flex flex-col gap-8 w-full items-stretch">
        <div className="relative md:flex hidden">
          <HeroTVMovie route="slug" />
          <div className="w-full flex z-20 absolute inset-0 justify-center items-center">
            <div className="md:w-[60vw] w-[90vw] md:px-8 p-4 text-center">
              <h1 className="md:text-[1.8rem] text-2xl md:leading-[3rem] leading-[2rem] text-center text-white">
                {selectedMovie.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-8 md:px-[3rem] px-0">
          <MVBoardContent movie={selectedMovie} />
          <MVBoardRelated
            displayMode="desktop"
            movieElement={selectedMovie}
            movies={allMovieSafed}
          />
          <div className="md:px-0 px-5">
            <CommentContainer displayMode="mobile" resource={selectedMovie} />
          </div>
        </div>

        <MVBoardRelated
          displayMode="mobile"
          movieElement={selectedMovie}
          movies={allMovieSafed}
        />

        <CommentContainer displayMode="desktop" resource={selectedMovie} />

        <MVBoardOthers movieElement={selectedMovie} movies={allMovieSafed} />
      </div>
    );
}
