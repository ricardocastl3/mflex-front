import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { ITransfer } from "@/http/interfaces/models/ITransfer";
import { useCallback, useEffect, useState } from "react";

export default function useTransferences({
  route,
}: {
  route: "merchant" | "transfer";
}) {
  const [allTransfer, setAllTransfer] = useState<ITransfer[]>([]);
  const [isLoadingAllTransfer, setIsLoadingAllTransfer] = useState(true);

  const fetchAllTransfer = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        transfers: ITransfer[];
      }>("/payments/transfer", {
        params: {
          mode: route == "merchant" ? "all" : undefined,
        },
      });

      setAllTransfer(resp.data.transfers);
      setIsLoadingAllTransfer(false);
    } catch (err) {
      setIsLoadingAllTransfer(false);
    }
  }, []);

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllTransfer(true);

      const resp = await internalApi.get<{
        transfers: ITransfer[];
      }>("/payments/transfer", {
        params: { name, mode: route == "merchant" ? "all" : undefined },
      });

      setAllTransfer(resp.data.transfers);
      setIsLoadingAllTransfer(false);
    } catch (err) {
      setIsLoadingAllTransfer(false);
    }
  }

  useEffect(() => {
    fetchAllTransfer();
  }, [fetchAllTransfer]);

  return {
    fetchAllTransfer,
    allTransfer,
    handleSeachByName,
    isLoadingAllTransfer,
  };
}
