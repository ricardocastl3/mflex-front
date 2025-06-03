"use client";

import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useState } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TicketBox from "./components/TicketBox";
import PageBase from "../@components/PageBase";
import useTickets from "@/hooks/api/useTickets";

export default function TicketPage() {
  const {
    allTickets,
    handleLoadMore,
    isLoadingMoreTickets,
    isLoadingAllTickets,
    handleSeachByName,
  } = useTickets();

  const [searchField, setSearchField] = useState("");

  return (
    <PageBase>
      <div className="flex md:items-center items-stretch w-full justify-between md:flex-row flex-col gap-3 border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center  gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.Hi2Icon.HiTag size={18} />
          <CTranslateTo eng="My Tickets" pt="Meus Ingressos" />
          {`${
            allTickets.has
              ? ` (${allTickets.tickets.length}/${allTickets.total})`
              : ` (${allTickets.tickets.length})`
          }`}
        </h4>
        <div>
          <AuSoftUI.UI.TextField.Default
            value={searchField}
            weight={"sm"}
            onChange={(e) => {
              setSearchField(e.target.value);
              handleSeachByName({ name: e.target.value });
            }}
            className="md:w-[19rem] w-full font-bold rounded-full border-slate-400"
            placeholder="Ex: Formação Você Rei..."
          />
        </div>
      </div>
      <TicketBox
        isLoadingMore={isLoadingMoreTickets}
        fetchMore={() => handleLoadMore(searchField)}
        isLoading={isLoadingAllTickets}
        ticketsAPI={allTickets}
      />
    </PageBase>
  );
}
