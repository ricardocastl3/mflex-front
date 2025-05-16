"use client";

import { ITVChannelSafed } from "@/http/interfaces/models/ITVChannel";
import {  } from "@/http/interfaces/models/IWatchTV";
import { createContext, ReactNode, useContext, useState } from "react";

interface IWatchTVProviderProps {
  selectedFlexTV: ITVChannelSafed | undefined;

  handleSelectFlexTV: (flexTV: ITVChannelSafed | undefined) => void;
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

  function handleSelectFlexTV(merchant: ITVChannelSafed | undefined) {
    setSelectedFlexTV(merchant);
  }

  return (
    <FlexTVContext.Provider
      value={{
        handleSelectFlexTV,
        selectedFlexTV,
      }}
    >
      {children}
    </FlexTVContext.Provider>
  );
}
