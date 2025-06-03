import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IAffiliateCommissionsResponseAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useAffiliationsCommissions() {
  const [allAffiliationsAPI, setallAffiliationsAPI] =
    useState<IAffiliateCommissionsResponseAPI>({
      affiliations: [],
      commissions: [],
      has: false,
      success: false,
      total: 0,
      dash: {
        gain: 0,
      },
    });

  const [isLoadingAllAffiliations, setIsLoadingAllAffiliations] =
    useState(true);

  const [isLoadingMoreCommissions, setIsLoadingMoreCommissions] =
    useState(false);

  const fetchAllAffiliations = useCallback(async () => {
    try {
      const resp = await internalApi.get<IAffiliateCommissionsResponseAPI>(
        "/affiliate/commissions",
        {
          params: {
            currentPage: 0,
            nextPage: appConfigs.api.pageLoads,
          },
        }
      );

      setallAffiliationsAPI(resp.data);
      setIsLoadingAllAffiliations(false);
    } catch (err) {
      setIsLoadingAllAffiliations(false);
    }
  }, []);

  async function handleLoadMore({ name }: ISearchDataField) {
    try {
      setIsLoadingMoreCommissions(true);
      name = name == "" ? undefined : name;

      const resp = await internalApi.get<IAffiliateCommissionsResponseAPI>(
        `/affiliate/commissions`,
        {
          params: {
            name,
            currentPage: allAffiliationsAPI.commissions.length,
            nextPage: appConfigs.api.pageLoads,
          },
        }
      );

      if (resp.data.has) {
        setallAffiliationsAPI((state) => ({
          ...state,
          dash: resp.data.dash,
          commissions: [...state.commissions, ...resp.data.commissions],
        }));
      } else {
        setallAffiliationsAPI((state) => ({
          ...state,
          has: resp.data.has,
        }));
      }
      setIsLoadingMoreCommissions(false);
    } catch (err) {
      setIsLoadingMoreCommissions(false);
    }
  }

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllAffiliations(true);
      const resp = await internalApi.get<IAffiliateCommissionsResponseAPI>(
        "/affiliate/commissions",
        {
          params: {
            name,
            currentPage: allAffiliationsAPI.commissions.length,
            nextPage: appConfigs.api.pageLoads,
          },
        }
      );
      setallAffiliationsAPI(resp.data);
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
    allAffiliationsAPI,
    handleLoadMore,
    isLoadingMoreCommissions,
    handleSeachByName,
    isLoadingAllAffiliations,
  };
}
