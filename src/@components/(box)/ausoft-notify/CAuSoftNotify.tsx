import { ReactIcons } from "@/utils/icons";

import CContent from "./CContent";
import ADropdownBase from "@/@components/(ausoft)/ADropdownBase";
import useNotifications from "@/hooks/api/useNotifications";

export function CAuSoftNotify() {
  const { allNotifications, isLoadingAllNotifications, fetchAllNotifications } =
    useNotifications();

  return (
    <>
      <ADropdownBase
        trigger={
          <div className="relative">
            <span className="flex p-2 cursor-pointer rounded-full border dark:border-none border-slate-300 dark:text-white text-sm font-bold bg-white dark:bg-slate-800">
              <ReactIcons.Hi2Icon.HiBell size={20} />
            </span>
            {allNotifications.filter((item) => !item.read).length > 0 && (
              <span className="absolute -top-1 -right-1 pb-[0.02rem] pl-1.5 pr-[0.32rem] pt-[0.1rem] bg-red-600 rounded-full dark:bg-red-600 text-white text-xs font-bold">
                {allNotifications.filter((item) => !item.read).length}
              </span>
            )}
          </div>
        }
        MobileContent={(call) => {
          return (
            <CContent
              reload={() => fetchAllNotifications()}
              callback={() => call.callback()}
              allNotifications={allNotifications}
              isLoadingNotification={isLoadingAllNotifications}
            />
          );
        }}
        DesktopContent={
          <CContent
            reload={() => fetchAllNotifications()}
            allNotifications={allNotifications}
            isLoadingNotification={isLoadingAllNotifications}
          />
        }
      />
    </>
  );
}
