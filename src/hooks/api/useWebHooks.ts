import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IWebhook } from "@/http/interfaces/models/IWebhook";
import { useCallback, useEffect, useState } from "react";

export default function useWebhooks() {
  const [allWebhook, setAllWebhook] = useState<IWebhook[]>([]);
  const [isLoadingAllWebhook, setIsLoadingAllWebhook] = useState(true);

  const fetchAllWebhooks = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        webhooks: IWebhook[];
      }>("/wb");

      setAllWebhook(resp.data.webhooks);
      setIsLoadingAllWebhook(false);
    } catch (err) {
      setIsLoadingAllWebhook(false);
    }
  }, []);

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllWebhook(true);

      const resp = await internalApi.get<{
        webhooks: IWebhook[];
      }>("/wb", { params: { name } });

      setAllWebhook(resp.data.webhooks);
      setIsLoadingAllWebhook(false);
    } catch (err) {
      setIsLoadingAllWebhook(false);
    }
  }

  useEffect(() => {
    fetchAllWebhooks();
  }, [fetchAllWebhooks]);

  return {
    fetchAllWebhooks,
    allWebhook,
    handleSeachByName,
    isLoadingAllWebhook,
  };
}
