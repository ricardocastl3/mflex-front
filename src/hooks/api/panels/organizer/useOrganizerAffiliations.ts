import { internalApi } from "@/http/axios/api";
import { IAffiliation } from "@/http/interfaces/models/affiliate/IAffiliate";
import { useCallback, useEffect, useState } from "react";

export default function useOrganizerAffiliations() {
  const [allOrgAffiliations, setAllOrgAffiliations] = useState<IAffiliation[]>(
    []
  );

  const [isLoadingAllOrgAffiliations, setIsLoadingAllAffiliations] =
    useState(true);

  const fetchAllOrgAffiliations = useCallback(async () => {
    try {
      const resp = await internalApi.get<{ affiliations: IAffiliation[] }>(
        "/organizer/affiliations"
      );

      setAllOrgAffiliations(resp.data.affiliations);
      setIsLoadingAllAffiliations(false);
    } catch (err) {
      setIsLoadingAllAffiliations(false);
    }
  }, []);

  useEffect(() => {
    fetchAllOrgAffiliations();
  }, [fetchAllOrgAffiliations]);

  return {
    fetchAllOrgAffiliations,
    allOrgAffiliations,
    isLoadingAllOrgAffiliations,
  };
}
