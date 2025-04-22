"use client";

import { useEffect, useState } from "react";
import { IPayment } from "@/http/interfaces/models/IPayment";
import { useTransactionProvider } from "@/providers/features/TransactionProvider";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useTransactions from "@/hooks/api/useTransactions";
import TransactionDashboard from "./box/TransactionDashboard";
import TransactionList from "./box/TransactionList";
import PageBase from "../cmps/PageBase";
import ContainerBase from "../cmps/ContainerBase";

export default function TransactionPage() {
  const {
    allTransactions,
    isLoadingAllTransactions,
    fetchAllTransactions,
    handleSeachByName,
  } = useTransactions();

  // Controls
  const [isLoadingBase, setIsLoadingBase] = useState(true);
  const [allBaseTransaction, setAllBaseTransaction] = useState<IPayment[]>([]);
  const { fetchTransaction } = useTransactionProvider();

  useEffect(() => {
    if (!isLoadingAllTransactions) {
      setAllBaseTransaction(allTransactions);
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
          <CTranslateTo eng="Transactions" pt="Transações" />
        </h4>
      </div>

      <ContainerBase>
        <div className="pb-8 gap-4 flex flex-col">
          <TransactionDashboard
            isLoading={isLoadingBase && isLoadingAllTransactions}
            transactions={allBaseTransaction}
          />

          <TransactionList
            local="transaction"
            rawTransactions={allTransactions}
            setTransactions={setAllBaseTransaction}
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
