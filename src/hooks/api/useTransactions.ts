import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IPayment } from "@/http/interfaces/models/IPayment";
import { useCallback, useEffect, useState } from "react";

export default function useTransactions({
  route,
}: {
  route: "merchant" | "transaction";
}) {
  const [allTransactions, setAllTransactions] = useState<IPayment[]>([]);
  const [isLoadingAllTransactions, setIsLoadingAllTransactions] =
    useState(true);

  const fetchAllTransactions = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        transactions: IPayment[];
      }>("/payments/transactions", {
        params: { mode: route == "transaction" ? "merchant" : "all" },
      });

      setAllTransactions(resp.data.transactions);
      setIsLoadingAllTransactions(false);
    } catch (err) {
      setIsLoadingAllTransactions(false);
    }
  }, []);

  async function handleSeachByName({ name, mode }: ISearchDataField) {
    try {
      setIsLoadingAllTransactions(true);

      const resp = await internalApi.get<{
        transactions: IPayment[];
      }>("/payments/transactions", { params: { name, mode } });

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
