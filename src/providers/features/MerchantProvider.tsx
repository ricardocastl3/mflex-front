import { IUserResponse } from "@/http/interfaces/responses/IUserResponse";
import { createContext, ReactNode, useContext, useState } from "react";

interface IMerchantProviderProps {
  selectedMerchant: IUserResponse | undefined;
  fetchMerchant: boolean;

  handleFetchMerchant: (mode: boolean) => void;
  handleSelectMerchant: (merchant: IUserResponse | undefined) => void;
}

export const MerchantContext = createContext({} as IMerchantProviderProps);

export function useMerchantProvider() {
  const context = useContext(MerchantContext);
  return context;
}

export default function MerchantProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedMerchant, setSelectedMerchant] = useState<
    IUserResponse | undefined
  >();
  const [fetchMerchant, setFetchMerchant] = useState(false);

  function handleFetchMerchant(mode: boolean) {
    setFetchMerchant(mode);
  }

  function handleSelectMerchant(merchant: IUserResponse | undefined) {
    setSelectedMerchant(merchant);
  }

  return (
    <MerchantContext.Provider
      value={{
        handleSelectMerchant,
        selectedMerchant,
        fetchMerchant,
        handleFetchMerchant,
      }}
    >
      {children}
    </MerchantContext.Provider>
  );
}
