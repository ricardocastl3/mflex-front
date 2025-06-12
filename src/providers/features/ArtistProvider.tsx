"use client";

import { IUserResponse } from "@/http/interfaces/responses/IUserResponse";
import { createContext, ReactNode, useContext, useState } from "react";

interface IArtistProviderProps {
  selectedArtist: IUserResponse | undefined;
  fetchArtist: boolean;

  handleFetchArtist: (mode: boolean) => void;
  handleSelectArtist: (artist: IUserResponse | undefined) => void;
}

export const ArtistContext = createContext({} as IArtistProviderProps);

export function useArtistProvider() {
  const context = useContext(ArtistContext);
  return context;
}

export default function ArtistProvider({ children }: { children: ReactNode }) {
  const [selectedArtist, setSelectedArtist] = useState<
    IUserResponse | undefined
  >();

  const [fetchArtist, setFetchArtist] = useState(false);

  function handleFetchArtist(mode: boolean) {
    setFetchArtist(mode);
  }

  function handleSelectArtist(artist: IUserResponse | undefined) {
    setSelectedArtist(artist);
  }

  return (
    <ArtistContext.Provider
      value={{
        handleSelectArtist,
        selectedArtist,
        fetchArtist,
        handleFetchArtist,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
}
