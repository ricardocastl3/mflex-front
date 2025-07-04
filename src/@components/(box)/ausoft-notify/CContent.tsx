import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";
import { useEffect, useState } from "react";
import {
  IResourceNotification,
  IResourceNotificationAPI,
} from "@/http/interfaces/models/resources/IResourceNotifications";
import { subDays } from "date-fns";
import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";

import Image from "next/image";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LoadingMoreButton from "@/app/[locale]/app/@components/api-query-pages/LoadingMoreButton";
import NotificationCard from "./NotificationCard";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function AuSoftNotifyDropdownContent({
  callback,
  isLoadingNotification,
  allNotifications,
  reload,
  hasMore,
  isLoadMore,
  fetchMore,
}: {
  reload: () => void;
  fetchMore: () => void;
  isLoadMore: boolean;
  isLoadingNotification: boolean;
  hasMore: boolean;
  allNotifications: IResourceNotificationAPI;
  callback?: () => void;
}) {
  // Contexts
  const { handleAddToastOnArray } = useAppProvider();

  // Controls
  const [safedNotification, setSafedNotification] = useState<
    IResourceNotification[]
  >([]);

  const [isLoading, setIsloading] = useState(isLoadingNotification);

  useEffect(() => {
    setIsloading(isLoadingNotification);
    setSafedNotification(allNotifications.notifications);
  }, [isLoadingNotification]);

  async function handleMarkAsRead(mode: string, id?: string) {
    try {
      setIsloading(true);
      await internalApi.post("/notify/read", {
        mode,
        id,
      });
      setIsloading(false);
      reload();
    } catch (err) {
      setIsloading(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <div className="md:w-[360px] w-[82vw]">
      <div className="flex items-start gap-2.5 pb-2.5 border-b justify-between border-slate-300 dark:border-slate-700/60">
        <div className="flex items-center justify-between gap-2.5">
          <AuSoftUI.Component.AuSoftLogo size={26} style="" />

          <div className="flex items-center gap-2">
            <h3 className="md:text-[0.85rem] text-md font-bold text-slate-800 dark:text-white">
              <CTranslateTo pt="Notificações" eng="Notifications" />{" "}
            </h3>
            <div className="px-1 text-sm font-bold rounded-full dark:text-yellow-500 text-yellow-600 bg-yellow-200 dark:bg-yellow-800/40">
              {` ${
                allNotifications.total != allNotifications.notifications.length
                  ? `(${
                      allNotifications.notifications.length >= 100
                        ? "+99"
                        : allNotifications.notifications.length
                    }/${
                      allNotifications.total >= 100
                        ? "+99"
                        : allNotifications.total
                    })`
                  : allNotifications.total >= 100
                  ? "+99"
                  : allNotifications.total
              }`}
            </div>
          </div>
        </div>
        {callback && (
          <button
            onClick={callback}
            className="rounded-md  hover:opacity-80 text-slate-800 dark:text-slate-200"
          >
            <ReactIcons.BiIcon.BiX size={25} className="mb-1.5" />
          </button>
        )}
      </div>
      <div className="mt-4 flex w-full items-start gap-2.5 flex-col md:h-[55vh] h-[50vh] overflow-y-auto md:pr-1 pr-0">
        {!isLoading && allNotifications.notifications.length > 0 && (
          <>
            <div className="flex flex-col gap-2.5 pb-4 w-full">
              {allNotifications.notifications.filter(
                (i) =>
                  new Date(i.created_at).toISOString().split("T")[0] ==
                  new Date().toISOString().split("T")[0]
              ).length > 0 && (
                <>
                  <h1 className="mb-1 font-bold text-slate-600 dark:text-slate-400 text-xs">
                    <CTranslateTo eng="Today" pt="Hoje" />
                  </h1>

                  {allNotifications.notifications
                    .filter(
                      (i) =>
                        new Date(i.created_at).toISOString().split("T")[0] ==
                        new Date().toISOString().split("T")[0]
                    )
                    .map((notification, i) => {
                      return (
                        <NotificationCard
                          key={i}
                          callback={callback}
                          notification={notification}
                          handleMarkAsRead={handleMarkAsRead}
                        />
                      );
                    })}
                </>
              )}

              {allNotifications.notifications.filter(
                (i) =>
                  new Date(i.created_at).toISOString().split("T")[0] ==
                  subDays(new Date(), 1).toISOString().split("T")[0]
              ).length > 0 && (
                <>
                  <h1 className="mb-1 font-bold text-slate-600 dark:text-slate-400 text-xs">
                    <CTranslateTo eng="Yesterday" pt="Ontem" />
                  </h1>

                  {allNotifications.notifications
                    .filter(
                      (i) =>
                        new Date(i.created_at).toISOString().split("T")[0] ==
                        subDays(new Date(), 1).toISOString().split("T")[0]
                    )
                    .map((notification, i) => {
                      return (
                        <NotificationCard
                          key={i}
                          callback={callback}
                          notification={notification}
                          handleMarkAsRead={handleMarkAsRead}
                        />
                      );
                    })}
                </>
              )}

              {allNotifications.notifications.filter(
                (i) =>
                  new Date(i.created_at).getTime() <
                  subDays(new Date(), 2).getTime()
              ).length > 0 && (
                <>
                  <h1 className="mb-1 font-bold text-slate-600 dark:text-slate-400 text-xs">
                    <CTranslateTo eng="Previous Day" pt="Dias anteriores" />
                  </h1>

                  {allNotifications.notifications
                    .filter(
                      (i) =>
                        new Date(i.created_at).getTime() <
                        subDays(new Date(), 2).getTime()
                    )
                    .map((notification, i) => {
                      return (
                        <NotificationCard
                          key={i}
                          callback={callback}
                          notification={notification}
                          handleMarkAsRead={handleMarkAsRead}
                        />
                      );
                    })}
                </>
              )}

              {isLoadMore && (
                <div className="w-full">
                  <AuSoftUI.Component.LoadingList
                    overflow={false}
                    isLoading={isLoadMore}
                  />
                </div>
              )}
              <LoadingMoreButton
                has={hasMore}
                size="sm"
                isLoading={isLoadMore}
                fetchMore={fetchMore}
              />
            </div>
          </>
        )}

        {!isLoading && allNotifications.notifications.length <= 0 && (
          <div className="animate-fade flex flex-col gap-4 w-full h-full md:pb-0 pb-8">
            <div className="flex md:pt-8 pt-16 w-full justify-center gap-4 items-center flex-col">
              <Image
                src={localImages.vectors.emptyBox}
                width={60}
                height={60}
                alt="Notify not found"
              />
              <div className="flex flex-col items-center gap-2">
                <h4 className="text-base font-bold text-yellow-500 dark:text-yellow-600">
                  <CTranslateTo eng="No notifications" pt="Sem notificações" />
                </h4>
                <h4 className="text-sm dark:text-white">
                  <CTranslateTo
                    eng="You don't have notifications yet"
                    pt="Você não tem notificações de momento"
                  />
                </h4>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="w-full">
            <AuSoftUI.Component.LoadingList
              overflow={false}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
      {!isLoading && allNotifications.unreads > 0 && (
        <div className="flex flex-col w-full gap-1.5 box-content mb-2 border-t border-slate-300 dark:border-slate-800 pt-4">
          <button
            onClick={() => handleMarkAsRead("all")}
            className="appearance-none dark:text-yellow-500 text-yellow-800 text-sm font-bold hover:text-yellow-900 hover:dark:text-yellow-700"
          >
            <CTranslateTo eng="Mark all as read" pt="Marcar todas como lidas" />
          </button>
        </div>
      )}
    </div>
  );
}
