import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { internalApi } from "@/http/axios/api";
import { IResourceNotificationAPI } from "@/http/interfaces/models/resources/IResourceNotifications";

import Image from "next/image";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import DateServices from "@/services/DateServices";
import LoadingMoreButton from "@/app/[locale]/app/@components/api-query-pages/LoadingMoreButton";

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
  const [isLoading, setIsloading] = useState(isLoadingNotification);

  // Controls
  const [canOpen, setCanOpen] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    setIsloading(isLoadingNotification);
  }, [isLoadingNotification]);

  function handleOpenAction(url: string, type: "blank" | "fix") {
    if (type == "fix") {
      router.push(url);
    } else {
      window.open(url, "_blank");
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
                  ? `(${allNotifications.notifications.length}/${allNotifications.total})`
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
      <div className="mt-4 flex w-full items-start gap-2.5 flex-col md:h-[50vh] h-[50vh] overflow-y-auto">
        {!isLoading && allNotifications.notifications.length > 0 && (
          <div className="flex flex-col gap-2.5 pb-4 w-full">
            {allNotifications.notifications.map((notification, i) => {
              return (
                <div
                  onMouseEnter={() => {
                    if (window.innerWidth > 764) {
                      setCanOpen(true);
                    }
                  }}
                  onClick={() => {
                    if (canOpen)
                      handleOpenAction(
                        notification.url,
                        notification.blank ? "blank" : "fix"
                      );
                  }}
                  key={i}
                  className={`${
                    notification.read
                      ? "dark:bg-slate-800/40 bg-slate-300/40"
                      : "dark:bg-slate-800/90 bg-slate-100"
                  } animate-fade cursor-pointer hover:bg-slate-300/40 dark:hover:bg-slate-800/40 rounded-xl flex flex-col gap-1 px-3.5 py-2 w-full`}
                >
                  <div className="flex items-center justify-between">
                    <h4
                      onClick={() => {
                        if (window.innerWidth <= 764) {
                          handleOpenAction(
                            notification.url,
                            notification.blank ? "blank" : "fix"
                          );
                        }
                      }}
                      className="text-[0.85rem] dark:text-white font-bold"
                    >
                      {notification.title}
                    </h4>
                  </div>
                  <div
                    onClick={() => {
                      if (window.innerWidth <= 764) {
                        handleOpenAction(
                          notification.url,
                          notification.blank ? "blank" : "fix"
                        );
                      }
                    }}
                  >
                    <h4 className="text-[0.85rem] text-slate-700 dark:text-slate-400">
                      {notification.description}
                    </h4>

                    <div className="flex items-center gap-2 mt-1.5">
                      <h4 className="text-[0.85rem] text-slate-500 dark:text-slate-400 ">
                        {DateServices.normalize(notification.created_at)}
                      </h4>

                      <button
                        onMouseEnter={() => {
                          setCanOpen(false);
                        }}
                        onClick={() => {
                          handleMarkAsRead("single", notification.id);
                        }}
                        className={`${
                          notification.read
                            ? "dark:text-slate-500 text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-800"
                            : "dark:text-yellow-700 text-yellow-500 hover:bg-yellow-200 dark:hover:bg-yellow-900/40"
                        } p-1.5 rounded-full flex items-center text-xs gap-2`}
                      >
                        {notification.read && (
                          <CTranslateTo
                            eng="Mas as unread"
                            pt="Marcar como não lida"
                          />
                        )}
                        {!notification.read && (
                          <CTranslateTo
                            eng="Mas as read"
                            pt="Marcar como lida"
                          />
                        )}
                        <ReactIcons.PiIcon.PiCircleFill size={8} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

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
              isLoading={isLoadMore}
              fetchMore={fetchMore}
            />
          </div>
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
        <div className="flex flex-col w-full gap-1.5 box-content mb-4 border-t border-slate-300 dark:border-slate-800 pt-4">
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
