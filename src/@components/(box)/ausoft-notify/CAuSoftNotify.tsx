import { ReactIcons } from "@/utils/icons";

import CContent from "./CContent";
import ADropdownBase from "@/@components/(ausoft)/ADropdownBase";
import useNotifications from "@/hooks/api/useNotifications";

export function CAuSoftNotify() {
  const {
    allNotifications,
    handleLoadMore,
    hasMoreNotifications,
    isLoadingMoreNotifications,
    isLoadingAllNotifications,
    fetchAllNotifications,
  } = useNotifications();

  return (
    <>
      <ADropdownBase
        trigger={
          <div className="relative">
            <span className="flex p-2 cursor-pointer rounded-full border dark:border-none border-slate-300 dark:text-white text-sm font-bold bg-white dark:bg-slate-800">
              <ReactIcons.Hi2Icon.HiBell size={16} />
            </span>
            {allNotifications.unreads > 0 && (
              <span className="absolute -top-1 -right-1 pb-[0.02rem] pl-1.5 pr-[0.32rem] pt-[0.1rem] bg-red-600 rounded-full dark:bg-red-600 text-white text-xs font-bold">
                {allNotifications.unreads}
              </span>
            )}
          </div>
        }
        MobileContent={(call) => {
          return (
            <CContent
              fetchMore={handleLoadMore}
              hasMore={hasMoreNotifications}
              isLoadMore={isLoadingMoreNotifications}
              reload={() => fetchAllNotifications()}
              callback={() => call.callback()}
              allNotifications={allNotifications}
              isLoadingNotification={isLoadingAllNotifications}
            />
          );
        }}
        DesktopContent={
          <CContent
            fetchMore={handleLoadMore}
            hasMore={hasMoreNotifications}
            isLoadMore={isLoadingMoreNotifications}
            reload={() => fetchAllNotifications()}
            allNotifications={allNotifications}
            isLoadingNotification={isLoadingAllNotifications}
          />
        }
      />
    </>
  );
}
