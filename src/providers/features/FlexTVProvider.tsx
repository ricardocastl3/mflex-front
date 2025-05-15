"use client";

import { IWatchTV } from "@/http/interfaces/models/IWatchTV";
import { createContext, ReactNode, useContext, useState } from "react";

interface IWatchTVProviderProps {
  selectedFlexTV: IWatchTV | undefined;

  handleSelectFlexTV: (flexTV: IWatchTV | undefined) => void;
}

export const FlexTVContext = createContext({} as IWatchTVProviderProps);

export function useFlexTVProvider() {
  const context = useContext(FlexTVContext);
  return context;
}

export default function FlexTVProvider({ children }: { children: ReactNode }) {
  const [selectedFlexTV, setSelectedFlexTV] = useState<IWatchTV | undefined>();

  function handleSelectFlexTV(merchant: IWatchTV | undefined) {
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
