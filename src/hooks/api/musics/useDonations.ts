import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IMusicDonationResponseAPI } from "@/http/interfaces/models/artists/IMusicDonation";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useDonations({
  route,
}: {
  route: "artist" | "general";
}) {
  const [allDonations, setAllDonations] = useState<IMusicDonationResponseAPI>({
    donations: [],
    total: 0,
    has: false,
  });

  const [isLoadingAllDonations, setIsLoadingAllDonations] = useState(true);
  const [isLoadingMoreDonationsTrans, setIsLoadingMoreDonationsTrans] =
    useState(false);

  const apiRoutes = `/artists/donations`;

  const fetchAllDonations = useCallback(async () => {
    try {
      const resp = await internalApi.get<IMusicDonationResponseAPI>(apiRoutes, {
        params: {
          currentPage: allDonations.donations.length,
          nextPage: appConfigs.api.pageLoads,
          view: route,
        },
      });

      setAllDonations(resp.data);
      setIsLoadingAllDonations(false);
    } catch (err) {
      setIsLoadingAllDonations(false);
    }
  }, []);

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllDonations(true);

      name = name == "" ? undefined : name;

      const resp = await internalApi.get<IMusicDonationResponseAPI>(apiRoutes, {
        params: {
          name,
          currentPage: 0,
          nextPage: appConfigs.api.pageLoads,
          view: route,
        },
      });

      setAllDonations(resp.data);
      setIsLoadingAllDonations(false);
    } catch (err) {
      setIsLoadingAllDonations(false);
    }
  }

  async function handleLoadMore() {
    try {
      setIsLoadingMoreDonationsTrans(true);

      const resp = await internalApi.get<IMusicDonationResponseAPI>(apiRoutes, {
        params: {
          currentPage: allDonations.donations.length,
          nextPage: appConfigs.api.pageLoads,
          view: route,
        },
      });

      if (resp.data.has) {
        setAllDonations((state) => ({
          ...state,
          has: resp.data.has,
          total: resp.data.total,
          donations: [...state.donations, ...resp.data.donations],
        }));
      } else {
        setAllDonations((state) => ({
          ...state,
          has: false,
        }));
      }

      setIsLoadingMoreDonationsTrans(false);
    } catch (err) {
      setIsLoadingMoreDonationsTrans(false);
    }
  }

  useEffect(() => {
    fetchAllDonations();
  }, [fetchAllDonations]);

  return {
    fetchAllDonations,
    allDonations,
    handleLoadMore,
    isLoadingMoreDonationsTrans,
    isLoadingAllDonations,
    handleSeachByName,
  };
}
