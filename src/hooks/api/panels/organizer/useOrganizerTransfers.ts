import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IOrganizerTransferResponseAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useOrganizerTransfers() {
  const [allTransfer, setAllTransfer] = useState<IOrganizerTransferResponseAPI>(
    { has: false, total: 0, transfers: [] }
  );
  const [isLoadingAllTransfer, setIsLoadingAllTransfer] = useState(true);

  const [isLoadingMoreTransfers, setIsLoadingMoreTransfers] = useState(false);

  const fetchAllTransfer = useCallback(async () => {
    try {
      const resp = await internalApi.get<IOrganizerTransferResponseAPI>(
        "/organizer/transfers",
        {
          params: {
            currentPage: 0,
            nextPage: appConfigs.api.pageLoads,
          },
        }
      );

      setAllTransfer(resp.data);
      setIsLoadingAllTransfer(false);
    } catch (err) {
      setIsLoadingAllTransfer(false);
    }
  }, []);

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllTransfer(true);

      const resp = await internalApi.get<IOrganizerTransferResponseAPI>(
        "/organizer/transfers",
        {
          params: { name, currentPage: 0, nextPage: appConfigs.api.pageLoads },
        }
      );

      setAllTransfer(resp.data);
      setIsLoadingAllTransfer(false);
    } catch (err) {
      setIsLoadingAllTransfer(false);
    }
  }

  async function handleLoadMore({ name }: ISearchDataField) {
    try {
      setIsLoadingMoreTransfers(true);
      name = name == "" ? undefined : name;

      const resp = await internalApi.get<IOrganizerTransferResponseAPI>(
        `/organizer/transfers`,
        {
          params: {
            name,
            currentPage: allTransfer.transfers.length,
            nextPage: appConfigs.api.pageLoads,
          },
        }
      );

      if (resp.data.has) {
        setAllTransfer((state) => ({
          has: resp.data.has,
          total: resp.data.total,
          transfers: [...state.transfers, ...resp.data.transfers],
        }));
      } else {
        setAllTransfer((state) => ({
          ...state,
          has: resp.data.has,
        }));
      }

      setIsLoadingMoreTransfers(false);
    } catch (err) {
      setIsLoadingMoreTransfers(false);
    }
  }

  useEffect(() => {
    fetchAllTransfer();
  }, [fetchAllTransfer]);

  return {
    fetchAllTransfer,
    allTransfer,
    handleLoadMore,
    handleSeachByName,
    isLoadingMoreTransfers,
    isLoadingAllTransfer,
  };
}
