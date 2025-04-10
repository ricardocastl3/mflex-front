import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IPayment } from "@/http/interfaces/models/IPayment";
import { useCallback, useEffect, useState } from "react";

export default function useTransactions() {
  const [allTransactions, setAllTransactions] = useState<IPayment[]>([]);
  const [isLoadingAllTransactions, setIsLoadingAllTransactions] =
    useState(true);

  const fetchAllTransactions = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        transactions: IPayment[];
      }>("/payments/transactions");

      setAllTransactions(resp.data.transactions);
      setIsLoadingAllTransactions(false);
    } catch (err) {
      setIsLoadingAllTransactions(false);
    }
  }, []);

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllTransactions(true);

      const resp = await internalApi.get<{
        transactions: IPayment[];
      }>("/payments/transactions", { params: { name } });

      setAllTransactions(resp.data.transactions);
      setIsLoadingAllTransactions(false);
    } catch (err) {
      setIsLoadingAllTransactions(false);
    }
  }

  useEffect(() => {
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  return {
    fetchAllTransactions,
    allTransactions,
    handleSeachByName,
    isLoadingAllTransactions,
  };
}
