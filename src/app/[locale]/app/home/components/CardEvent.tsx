import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useEvents from "@/hooks/api/useEvents";
import LoadingVal from "./LoadindVal";

export default function CardEvent() {
  const { allEvents, isLoadingAllEvents } = useEvents({ route: "app" });
  return (
    <BaseBox className="p-4">
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base dark:text-white font-bold">
            <CTranslateTo eng="Events" pt="Eventos" />
          </h1>
          <ReactIcons.HiIcon.HiTicket size={15} className="text-cyan-500" />
        </div>

        <LoadingVal isLoading={isLoadingAllEvents} val={allEvents.length} />
      </div>
    </BaseBox>
  );
}
