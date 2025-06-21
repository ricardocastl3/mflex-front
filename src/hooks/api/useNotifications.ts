import { internalApi } from "@/http/axios/api";
import { IResourceNotification } from "@/http/interfaces/models/resources/IResourceNotifications";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useNotifications() {
  const [allNotifications, setAllNotifications] = useState<
    IResourceNotification[]
  >([]);
  const [isLoadingAllNotifications, setIsLoadingAllNotifications] =
    useState(true);

  const [hasMoreNotifications, setHasMoreNotifications] = useState(true);
  const [isLoadingMoreNotifications, setIsLoadingMoreNotifications] =
    useState(false);

  const fetchAllNotifications = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        notifications: IResourceNotification[];
      }>(`/notify`, {
        params: {
          currentPage: 0,
          nextPage: appConfigs.api.pageLoads,
        },
      });

      if (resp.data.notifications.length <= 0) setHasMoreNotifications(false);

      setAllNotifications(resp.data.notifications);
      setIsLoadingAllNotifications(false);
    } catch (err) {
      setIsLoadingAllNotifications(false);
    }
  }, []);

  async function handleLoadMore() {
    try {
      setIsLoadingMoreNotifications(true);

      const resp = await internalApi.get<{
        notifications: IResourceNotification[];
      }>(`/notify`, {
        params: {
          currentPage: allNotifications.length,
          nextPage: appConfigs.api.pageLoads,
        },
      });

      if (resp.data.notifications.length <= 0) {
        setHasMoreNotifications(false);
      } else {
        setAllNotifications((state) => [...state, ...resp.data.notifications]);
      }

      setIsLoadingMoreNotifications(false);
    } catch (err) {
      setIsLoadingMoreNotifications(false);
    }
  }

  useEffect(() => {
    fetchAllNotifications();
  }, [fetchAllNotifications]);

  return {
    handleLoadMore,
    hasMoreNotifications,
    fetchAllNotifications,
    allNotifications,
    isLoadingMoreNotifications,
    isLoadingAllNotifications,
  };
}
