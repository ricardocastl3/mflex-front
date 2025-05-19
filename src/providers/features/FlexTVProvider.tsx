"use client";

import { ITVChannelSafed } from "@/http/interfaces/models/tv/ITVChannel";
import { createContext, ReactNode, useContext, useState } from "react";
import { ITVMovieSafed } from "@/http/interfaces/models/tv/ITVMovie";

interface IWatchTVProviderProps {
  selectedFlexTV: ITVChannelSafed | undefined;
  selectedFlexTVMovie: ITVMovieSafed | undefined;

  handleSelectFlexTV: (flexTV: ITVChannelSafed | undefined) => void;
  handleSelectFlexTVMovie: (flexTV: ITVMovieSafed | undefined) => void;
}

export const FlexTVContext = createContext({} as IWatchTVProviderProps);

export function useFlexTVProvider() {
  const context = useContext(FlexTVContext);
  return context;
}

export default function FlexTVProvider({ children }: { children: ReactNode }) {
  const [selectedFlexTV, setSelectedFlexTV] = useState<
    ITVChannelSafed | undefined
  >();

  const [selectedFlexTVMovie, setSelectedFlexTVMovie] = useState<
    ITVMovieSafed | undefined
  >();

  function handleSelectFlexTV(tv: ITVChannelSafed | undefined) {
    setSelectedFlexTV(tv);
  }

  function handleSelectFlexTVMovie(movie: ITVMovieSafed | undefined) {
    setSelectedFlexTVMovie(movie);
  }

  return (
    <FlexTVContext.Provider
      value={{
        handleSelectFlexTV,
        handleSelectFlexTVMovie,

        selectedFlexTVMovie,
        selectedFlexTV,
      }}
    >
      {children}
    </FlexTVContext.Provider>
  );
}
