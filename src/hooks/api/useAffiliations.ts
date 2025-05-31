import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IAffiliate } from "@/http/interfaces/models/IAffiliate";
import { ITransfer } from "@/http/interfaces/models/ITransfer";
import { useCallback, useEffect, useState } from "react";

export default function useAffiliations() {
  const [allAffiliations, setAllAffiliations] = useState<IAffiliate[]>([]);
  const [allCommisions, setAllCommisions] = useState<ITransfer[]>([]);
  const [isLoadingAllAffiliations, setIsLoadingAllAffiliations] =
    useState(true);

  const fetchAllAffiliations = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        success: boolean;
        commissions: ITransfer[];
        affiliations: IAffiliate[];
      }>("/affiliate/me");

      setAllCommisions(resp.data.commissions);
      setAllAffiliations(resp.data.affiliations);
      setIsLoadingAllAffiliations(false);
    } catch (err) {
      setIsLoadingAllAffiliations(false);
    }
  }, []);

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllAffiliations(true);

      const resp = await internalApi.get<{
        success: boolean;
        commissions: ITransfer[];
        affiliations: IAffiliate[];
      }>("/affiliate/me", { params: { name } });

      setAllCommisions(resp.data.commissions);
      setAllAffiliations(resp.data.affiliations);
      setIsLoadingAllAffiliations(false);
    } catch (err) {
      setIsLoadingAllAffiliations(false);
    }
  }

  useEffect(() => {
    fetchAllAffiliations();
  }, [fetchAllAffiliations]);

  return {
    fetchAllAffiliations,
    allAffiliations,
    allCommisions,
    handleSeachByName,
    isLoadingAllAffiliations,
  };
}
