import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IOrganizerTransactionAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useOrganizerSales() {
  const [allTransactions, setAllTransactions] =
    useState<IOrganizerTransactionAPI>({
      has: false,
      total: 0,
      transactions: [],
      dash: {
        failed: 0,
        gain: 0,
        pending: 0,
        success: 0,
      },
    });

  const [isLoadingMoreTransactions, setIsLoadingMoreTransactions] =
    useState(false);

  const [isLoadingAllTransactions, setIsLoadingAllTransactions] =
    useState(true);

  const fetchAllTransactions = useCallback(async () => {
    try {
      const resp = await internalApi.get<IOrganizerTransactionAPI>(
        "/organizer/sales",
        {
          params: {
            currentPage: 0,
            nextPage: appConfigs.api.pageLoads,
          },
        }
      );

      setAllTransactions(resp.data);
      setIsLoadingAllTransactions(false);
    } catch (err) {
      setIsLoadingAllTransactions(false);
    }
  }, []);

  async function handleLoadMore({ name }: ISearchDataField) {
    try {
      setIsLoadingMoreTransactions(true);
      name = name == "" ? undefined : name;

      const resp = await internalApi.get<IOrganizerTransactionAPI>(
        `/organizer/sales`,
        {
          params: {
            name,
            currentPage: allTransactions.transactions.length,
            nextPage: appConfigs.api.pageLoads,
          },
        }
      );

      if (resp.data.has) {
        setAllTransactions((state) => ({
          has: resp.data.has,
          total: resp.data.total,
          dash: resp.data.dash,
          transactions: [...state.transactions, ...resp.data.transactions],
        }));
      } else {
        setAllTransactions((state) => ({
          ...state,
          has: resp.data.has,
        }));
      }

      setIsLoadingMoreTransactions(false);
    } catch (err) {
      setIsLoadingMoreTransactions(false);
    }
  }

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllTransactions(true);

      const resp = await internalApi.get<IOrganizerTransactionAPI>(
        "/organizer/sales",
        {
          params: { name, currentPage: 0, nextPage: appConfigs.api.pageLoads },
        }
      );

      setAllTransactions(resp.data);
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
    handleLoadMore,
    handleSeachByName,
    isLoadingMoreTransactions,
    isLoadingAllTransactions,
  };
}
