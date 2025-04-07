"use client";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useTransferences from "@/hooks/api/useTransferences";
import TicketBox from "./components/TicketBox";

import { ReactIcons } from "@/utils/icons";

export default function TransferModal() {
  const {
    allTransfer,
    isLoadingAllTransfer,
    fetchAllTransfer,
    handleSeachByName,
  } = useTransferences({
    route: "transfer",
  });

  return (
    <div className="flex flex-col w-full md:h-[84vh] h-full overflow-y-auto md:pr-2 pr-0">
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.Hi2Icon.HiTag size={18}/>
          <CTranslateTo eng="My Tickets" pt="Meus Tickets" />
        </h4>
      </div>
      <TicketBox />
    </div>
  );
}
