"use client";

import { IMusic } from "@/http/interfaces/models/artists/IMusic";
import { createContext, ReactNode, useContext, useState } from "react";

interface IMusicProviderProps {
  selectedMusic: IMusic | undefined;
  fetchMusic: boolean;
  isPlayingMusic: boolean;
  playerSeekSeconds: number;
  playerSeekSecondsByClick: number;

  handleIsPlayingMusic: (mode: boolean) => void;
  handleFetchMusic: (mode: boolean) => void;
  handleSelectMusic: (music: IMusic | undefined) => void;
  seekPlayerSeconds: (seconds: number) => void;
  clickSeekPlayerSeconds: (seconds: number) => void;
}

export const MusicContext = createContext({} as IMusicProviderProps);

export function useMusicProvider() {
  const context = useContext(MusicContext);
  return context;
}

export default function MusicProvider({ children }: { children: ReactNode }) {
  const [selectedMusic, setSelectedMusic] = useState<IMusic | undefined>();
  const [playerSeekSeconds, setPlayerSeekSeconds] = useState(0);
  const [playerSeekSecondsByClick, setPlayerSeekSecondsByClick] = useState(0);

  const [fetchMusic, setFetchMusic] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  function handleIsPlayingMusic(mode: boolean) {
    setIsPlayingMusic(mode);
  }

  function handleFetchMusic(mode: boolean) {
    setFetchMusic(mode);
  }

  function handleSelectMusic(music: IMusic | undefined) {
    setSelectedMusic(music);
  }

  function seekPlayerSeconds(seconds: number) {
    setPlayerSeekSeconds(seconds);
  }

  function clickSeekPlayerSeconds(seconds: number) {
    setPlayerSeekSecondsByClick(seconds);
  }

  return (
    <MusicContext.Provider
      value={{
        handleSelectMusic,
        handleIsPlayingMusic,
        seekPlayerSeconds,
        clickSeekPlayerSeconds,
        playerSeekSeconds,
        playerSeekSecondsByClick,
        isPlayingMusic,
        selectedMusic,
        fetchMusic,
        handleFetchMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
