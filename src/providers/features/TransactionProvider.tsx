import { IPayment } from "@/http/interfaces/models/IPayment";
import { createContext, ReactNode, useContext, useState } from "react";

interface ITransactionProviderProps {
  selectedTransaction: IPayment | undefined;
  fetchTransaction: boolean;

  handleFetchTransactions: (mode: boolean) => void;
  handleSelectTransaction: (transaction: IPayment | undefined) => void;
}

export const TransactionContext = createContext(
  {} as ITransactionProviderProps
);

export function useTransactionProvider() {
  const context = useContext(TransactionContext);
  return context;
}

export default function TransactionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedTransaction, setSelectedTransaction] = useState<
    IPayment | undefined
  >();
  const [fetchTransaction, setFetchTransaction] = useState(false);

  function handleFetchTransactions(mode: boolean) {
    setFetchTransaction(mode);
  }

  function handleSelectTransaction(transaction: IPayment | undefined) {
    setSelectedTransaction(transaction);
  }

  return (
    <TransactionContext.Provider
      value={{
        handleSelectTransaction,
        selectedTransaction,
        fetchTransaction,
        handleFetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
