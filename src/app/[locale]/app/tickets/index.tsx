"use client";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TicketBox from "./components/TicketBox";
import PageBase from "../cmps/PageBase";
import useTickets from "@/hooks/api/useTickets";

import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";

export default function TicketPage() {
  const { allTickets, isLoadingAllTickets, handleSeachByName } = useTickets();

  return (
    <PageBase>
      <div className="flex md:items-center items-stretch w-full justify-between md:flex-row flex-col gap-3 border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center  gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.Hi2Icon.HiTag size={18} />
          <CTranslateTo eng="My Tickets" pt="Meus Ingressos" />
        </h4>
        <div>
          <AuSoftUI.UI.TextField.Default
            weight={"sm"}
            onChange={(e) => handleSeachByName({ name: e.target.value })}
            className="md:w-[19rem] w-full font-bold rounded-full border-slate-400"
            placeholder="Ex: Formação Você Rei..."
          />
        </div>
      </div>
      <TicketBox isLoading={isLoadingAllTickets} tickets={allTickets} />
    </PageBase>
  );
}
