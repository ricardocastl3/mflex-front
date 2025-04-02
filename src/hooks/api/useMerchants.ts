import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IUserResponse } from "@/http/interfaces/responses/IUserResponse";
import { useCallback, useEffect, useState } from "react";

export default function useMerchants() {
  const [allMerchants, setAllMerchants] = useState<IUserResponse[]>([]);
  const [isLoadingAllMerchants, setIsLoadingAllMerchants] = useState(true);

  const fetchAllMerchants = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        all: IUserResponse[];
      }>("/users/merchants");

      setAllMerchants(resp.data.all);
      setIsLoadingAllMerchants(false);
    } catch (err) {
      setIsLoadingAllMerchants(false);
    }
  }, []);

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllMerchants(true);

      const resp = await internalApi.get<{
        all: IUserResponse[];
      }>("/users/merchants", { params: { name } });

      setAllMerchants(resp.data.all);
      setIsLoadingAllMerchants(false);
    } catch (err) {
      setIsLoadingAllMerchants(false);
    }
  }

  useEffect(() => {
    fetchAllMerchants();
  }, [fetchAllMerchants]);

  return {
    fetchAllMerchants,
    allMerchants,
    handleSeachByName,
    isLoadingAllMerchants,
  };
}
