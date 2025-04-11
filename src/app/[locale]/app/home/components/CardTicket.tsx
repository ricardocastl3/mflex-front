import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useEventTickets from "@/hooks/api/useEventTickets";
import LoadingVal from "./LoadindVal";

export default function CardTicket() {
  const { allTickets, isLoadingAllTickets } = useEventTickets();

  return (
    <BaseBox className="p-4">
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <h1 className="text-base dark:text-white font-bold">
            <CTranslateTo eng="Tickets" pt="Ingressos" />
          </h1>
          <ReactIcons.HiIcon.HiTicket size={12} className="dark:text-white" />
        </div>
        <LoadingVal isLoading={isLoadingAllTickets} val={allTickets.length} />
      </div>
    </BaseBox>
  );
}
