"use client";

import { useEffect, useState } from "react";
import { IPayment } from "@/http/interfaces/models/IPayment";
import { useTransactionProvider } from "@/providers/features/TransactionProvider";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useOrganizerSales from "@/hooks/api/panels/organizer/useOrganizerSales";
import TransactionDashboard from "./box/TransactionDashboard";
import TransactionList from "./box/TransactionList";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";

export default function TransactionPage() {
  const {
    allTransactions,
    isLoadingAllTransactions,
    handleLoadMore,
    fetchAllTransactions,
    isLoadingMoreTransactions,
    handleSeachByName,
  } = useOrganizerSales();
  const { fetchTransaction } = useTransactionProvider();

  // Controls
  const [isLoadingBase, setIsLoadingBase] = useState(true);
  const [allBaseTransaction, setAllBaseTransaction] = useState<IPayment[]>([]);

  useEffect(() => {
    if (!isLoadingAllTransactions) {
      setAllBaseTransaction(allTransactions.transactions);
      setIsLoadingBase(false);
    }
  }, [isLoadingAllTransactions, allTransactions]);

  useEffect(() => {
    if (fetchTransaction) fetchAllTransactions();
  }, [fetchTransaction]);

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.AiICon.AiOutlineTransaction size={18} />
          <CTranslateTo eng="My Sales" pt="Minhas Vendas" />
        </h4>
      </div>

      <ContainerBase>
        <div className="pb-8 gap-4 flex flex-col">
          <TransactionDashboard
            isLoading={isLoadingBase && isLoadingAllTransactions}
            apiTransactions={allTransactions}
          />

          <TransactionList
            fetchMore={handleLoadMore}
            apiTransactions={allTransactions}
            isLoadingMore={isLoadingMoreTransactions}
            transactions={allBaseTransaction}
            fetchAll={fetchAllTransactions}
            handleSearchName={handleSeachByName}
            isLoading={isLoadingAllTransactions}
          />
        </div>
      </ContainerBase>
    </PageBase>
  );
}
