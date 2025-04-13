import { IPayment } from "@/http/interfaces/models/IPayment";
import { ReactIcons } from "@/utils/icons";

import React, { useEffect, useState } from "react";
import CardDashboard from "./card";

export default function TransactionDashboard({
  transactions,
  isLoading,
}: {
  transactions: IPayment[];
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
      const pending = transactions.filter((i) => i.status == "pending").length;
      const success = transactions.filter((i) => i.status == "success").length;
      const failed = transactions.filter((i) => i.status == "failed").length;
      const earns = transactions
        .filter((i) => i.status == "success")
        .reduce((acc, current) => acc + Number(current.amount), 0);

      setTransDetail({ failed, pending, success, earns });
    }
  }, [isLoading, transactions]);

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-4 grid-cols-4 md:gap-4 gap-2">
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
              value={transaDetail.earns}
              currency={true}
            />

            <CardDashboard
              Icon={ReactIcons.BiIcon.BiSolidCaretUpCircle}
              iconColor="text-green-500 dark:text-green-300"
              title_en="Success"
              title_pt="Sucesso"
              value={transaDetail.success}
            />

            <CardDashboard
              Icon={ReactIcons.BiIcon.BiCaretDownCircle}
              iconColor="text-red-500 dark:text-red-300"
              title_en="Cancel"
              title_pt="Canceladas"
              value={transaDetail.failed}
            />

            <CardDashboard
              Icon={ReactIcons.BiIcon.BiSolidCaretUpCircle}
              iconColor="text-yellow-500 dark:text-yellow-300"
              title_en="Pending"
              title_pt="Pendentes"
              value={transaDetail.pending}
            />
          </>
        )}
      </div>
    </div>
  );
}
