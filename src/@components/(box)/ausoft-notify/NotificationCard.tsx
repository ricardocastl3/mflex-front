import { IResourceNotification } from "@/http/interfaces/models/resources/IResourceNotifications";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactIcons } from "@/utils/icons";

import DateServices from "@/services/DateServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function NotificationCard({
  notification,
  handleMarkAsRead,
  callback,
}: {
  callback?: () => void;
  handleMarkAsRead: (mode: string, id?: string) => void;
  notification: IResourceNotification;
}) {
  const [canOpen, setCanOpen] = useState(false);

  const router = useRouter();

  function handleOpenAction(url: string, type: "blank" | "fix") {
    if (callback) callback();
    if (type == "fix") {
      router.push(url);
    } else {
      window.open(url, "_blank");
    }
  }

  useEffect(() => {
    if (window.innerWidth > 764) {
      setCanOpen(true);
    }
  }, []);

  return (
    <div
      onMouseOver={() => {
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
      className={`${
        notification.read
          ? "dark:bg-slate-800/40 bg-slate-300/40"
          : "dark:bg-slate-800/90 bg-slate-100"
      } cursor-pointer hover:bg-slate-300/40 dark:hover:bg-slate-800/40 rounded-xl flex flex-col gap-1 px-3.5 py-2 w-full`}
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
      <div>
        <h4 className="text-[0.85rem] text-slate-700 dark:text-slate-400">
          {notification.description}
        </h4>

        <div className="flex items-center gap-2 mt-1.5">
          <h4 className="text-[0.85rem] text-slate-500 dark:text-slate-400 ">
            {DateServices.normalize(notification.created_at)}
          </h4>

          <button
            onMouseOver={() => {
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
              <CTranslateTo eng="Mas as unread" pt="Marcar como não lida" />
            )}
            {!notification.read && (
              <CTranslateTo eng="Mas as read" pt="Marcar como lida" />
            )}
            <ReactIcons.PiIcon.PiCircleFill size={8} />
          </button>
        </div>
      </div>
    </div>
  );
}
