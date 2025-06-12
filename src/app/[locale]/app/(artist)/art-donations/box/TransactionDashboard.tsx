import { ReactIcons } from "@/utils/icons";
import { IOrganizerTransactionAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";

import React, { useEffect, useState } from "react";
import CardDashboard from "./card";

export default function TransactionDashboard({
  apiTransactions,
  isLoading,
}: {
  apiTransactions: IOrganizerTransactionAPI;
  isLoading: boolean;
}) {
  const [transaDetail, setTransDetail] = useState<{
    pending: number;
    failed: number;
    success: number;
    earns: number;
  }>({
    failed: 0,
    pending: 0,
    success: 0,
    earns: 0,
  });

  useEffect(() => {
    if (!isLoading) {
      const pending = apiTransactions.transactions.filter(
        (i) => i.status == "pending"
      ).length;
      const success = apiTransactions.transactions.filter(
        (i) => i.status == "success"
      ).length;
      const failed = apiTransactions.transactions.filter(
        (i) => i.status == "failed"
      ).length;
      const earns = apiTransactions.transactions
        .filter((i) => i.status == "success")
        .reduce((acc, current) => acc + Number(current.amount), 0);

      setTransDetail({ failed, pending, success, earns });
    }
  }, [isLoading, apiTransactions]);

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
        {isLoading && (
          <>
            {Array.from({ length: 4 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="rounded-xl md:p-16 p-5 bg-slate-300 dark:bg-slate-700/50 animate-pulse"
                ></div>
              );
            })}
          </>
        )}

        {!isLoading && (
          <>
            <CardDashboard
              Icon={ReactIcons.BiIcon.BiMoney}
              iconColor="text-green-500 dark:text-green-300"
              title_en="Earns"
              title_pt="Ganhos"
              value={apiTransactions.dash.gain}
              currency={true}
            />

            <CardDashboard
              Icon={ReactIcons.BiIcon.BiSolidCaretUpCircle}
              iconColor="text-green-500 dark:text-green-300"
              title_en="Success"
              title_pt="Sucesso"
              value={apiTransactions.dash.success}
            />

            <CardDashboard
              Icon={ReactIcons.BiIcon.BiCaretDownCircle}
              iconColor="text-red-500 dark:text-red-300"
              title_en="Cancel"
              title_pt="Canceladas"
              value={apiTransactions.dash.failed}
            />

            <CardDashboard
              Icon={ReactIcons.BiIcon.BiSolidCaretUpCircle}
              iconColor="text-yellow-500 dark:text-yellow-300"
              title_en="Pending"
              title_pt="Pendentes"
              value={apiTransactions.dash.pending}
            />
          </>
        )}
      </div>
    </div>
  );
}
