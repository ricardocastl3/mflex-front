import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { internalApi } from "@/http/axios/api";
import { IResourceNotification } from "@/http/interfaces/models/resources/IResourceNotifications";

import Image from "next/image";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import DateServices from "@/services/DateServices";

export default function AuSoftNotifyDropdownContent({
  callback,
  isLoadingNotification,
  allNotifications,
  reload,
}: {
  reload: () => void;
  isLoadingNotification: boolean;
  allNotifications: IResourceNotification[];
  callback?: () => void;
}) {
  // Contexts
  const { userLogged } = useAuth();
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
    <div className="md:w-[300px] w-[82vw]">
      <div className="flex items-start gap-2.5 pb-2.5 border-b justify-between border-slate-300 dark:border-slate-700/60">
        <div className="flex items-center justify-between gap-2.5">
          <AuSoftUI.Component.AuSoftLogo size={26} style="" />

          <h3 className="md:text-[0.85rem] text-md font-bold text-slate-800 dark:text-white mt-1">
            <CTranslateTo pt="Notificações" eng="Notifications" />
          </h3>
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
        {!isLoading && allNotifications.length > 0 && (
          <div className="flex flex-col gap-2.5 pb-4 w-full">
            {allNotifications.map((notification, i) => {
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
                      : "dark:bg-slate-800 bg-slate-100"
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
                    <AuSoftUI.Component.ToolTip
                      body={
                        <button
                          onMouseEnter={() => {
                            setCanOpen(false);
                          }}
                          onClick={() => {
                            handleMarkAsRead("single", notification.id);
                          }}
                          className={`${
                            notification.read
                              ? "dark:text-slate-700 text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-800"
                              : "dark:text-yellow-700 text-yellow-500 hover:bg-yellow-200 dark:hover:bg-yellow-900/40"
                          } p-1.5 rounded-full `}
                        >
                          <ReactIcons.PiIcon.PiSpinner size={8} />
                        </button>
                      }
                      description_en={
                        notification.read ? "Mark as unread" : "Mark as read"
                      }
                      description_pt={`${
                        notification.read
                          ? "Marcar como não lida"
                          : "Marcar como lida"
                      }`}
                      width="w-fit"
                      customStyle="top-0"
                    />
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
                    <h4 className="text-[0.85rem] text-slate-500 dark:text-slate-400 mt-1.5">
                      {DateServices.normalize(notification.created_at)}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && allNotifications.length <= 0 && (
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
          <div className="flex flex-col gap-4 w-full md:pt-24 pt-20 items-center justify-center text-slate-600 dark:text-slate-500">
            <ReactIcons.CgIcon.CgSpinnerTwo
              size={50}
              className="animate-spin"
            />
          </div>
        )}
      </div>
      {!isLoading &&
        allNotifications.filter((item) => !item.read).length > 0 && (
          <div className="flex flex-col w-full gap-1.5 mt-4 box-content">
            <button
              onClick={() => handleMarkAsRead("all")}
              className="appearance-none dark:text-yellow-500 text-yellow-800 text-sm font-bold hover:text-yellow-900 hover:dark:text-yellow-700"
            >
              <CTranslateTo
                eng="Mark all as read"
                pt="Marcar todas como lidas"
              />
            </button>
          </div>
        )}
    </div>
  );
}
