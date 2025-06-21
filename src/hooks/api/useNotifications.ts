import { internalApi } from "@/http/axios/api";
import { IResourceNotificationAPI } from "@/http/interfaces/models/resources/IResourceNotifications";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useNotifications() {
  const [allNotifications, setAllNotifications] =
    useState<IResourceNotificationAPI>({
      notifications: [],
      reads: 0,
      total: 0,
      unreads: 0,
    });
  const [isLoadingAllNotifications, setIsLoadingAllNotifications] =
    useState(true);

  const [hasMoreNotifications, setHasMoreNotifications] = useState(true);
  const [isLoadingMoreNotifications, setIsLoadingMoreNotifications] =
    useState(false);

  const fetchAllNotifications = useCallback(async () => {
    try {
      const resp = await internalApi.get<IResourceNotificationAPI>(`/notify`, {
        params: {
          currentPage: 0,
          nextPage: appConfigs.api.pageLoads,
        },
      });

      if (
        resp.data.notifications.length <= 0 ||
        resp.data.notifications.length == resp.data.total
      ) {
        setHasMoreNotifications(false);
      } else {
        setHasMoreNotifications(true);
      }

      setAllNotifications(resp.data);
      setIsLoadingAllNotifications(false);
    } catch (err) {
      setIsLoadingAllNotifications(false);
    }
  }, []);

  async function handleLoadMore() {
    try {
      setIsLoadingMoreNotifications(true);

      const resp = await internalApi.get<IResourceNotificationAPI>(`/notify`, {
        params: {
          currentPage: allNotifications?.notifications.length,
          nextPage: appConfigs.api.pageLoads,
        },
      });

      if (
        resp.data.notifications.length <= 0 ||
        resp.data.notifications.length == resp.data.total
      ) {
        setHasMoreNotifications(false);
      } else {
        setHasMoreNotifications(true);
        setAllNotifications((state) => ({
          ...state,
          notifications: [...state?.notifications, ...resp.data.notifications],
        }));
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
