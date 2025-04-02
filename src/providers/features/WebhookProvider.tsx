import { IWebhook } from "@/http/interfaces/models/IWebhook";
import { createContext, ReactNode, useContext, useState } from "react";

interface IWebhookProviderProps {
  selectedWebhook: IWebhook | undefined;
  fetchWebhook: boolean;

  handleFetchWebhook: (mode: boolean) => void;
  handleSelectWebhook: (product: IWebhook | undefined) => void;
}

export const ProductContext = createContext({} as IWebhookProviderProps);

export function useWebhookProvider() {
  const context = useContext(ProductContext);
  return context;
}

export default function WebhookProvider({ children }: { children: ReactNode }) {
  const [selectedWebhook, setSelectedWebhook] = useState<
    IWebhook | undefined
  >();
  const [fetchWebhook, setFetchWebhook] = useState(false);

  function handleFetchWebhook(mode: boolean) {
    setFetchWebhook(mode);
  }

  function handleSelectWebhook(product: IWebhook | undefined) {
    setSelectedWebhook(product);
  }

  return (
    <ProductContext.Provider
      value={{
        handleSelectWebhook,
        selectedWebhook,
        fetchWebhook,
        handleFetchWebhook,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
