import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LoadingVal from "./LoadindVal";
import useTickets from "@/hooks/api/useTickets";

export default function CardTicket() {
  const { allTickets, isLoadingAllTickets } = useTickets();

  return (
    <BaseBox className="p-4">
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base dark:text-white font-bold">
            <CTranslateTo eng="My Tickets" pt="Meus Ingressos" />
          </h1>
          <ReactIcons.HiIcon.HiTicket size={12} className="dark:text-white" />
        </div>
        <LoadingVal isLoading={isLoadingAllTickets} val={allTickets.total} />
      </div>
    </BaseBox>
  );
}
