import { ReactIcons } from "@/utils/icons";
import { IPayment } from "@/http/interfaces/models/IPayment";

import React from "react";
import DateServices from "@/services/DateServices";
import CardStatus from "./card-status";
import CurrencyServices from "@/services/CurrencyServices";
import CardMethod from "./card-method";

export default function CardTransaction({
  transactions,
}: {
  transactions: IPayment[];
}) {
  return (
    <>
      {transactions.map((transaction, i) => {
        return (
          <div
            key={i}
            className="px-4 flex flex-col border-b pb-2  border-slate-300 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-4">
              <h3 className="text-yellow-600 font-bold dark:text-yellow-400 text-sm py-2">
                {transaction.customer && (
                  <>
                    {`${transaction.customer?.first_name} ${transaction.customer?.last_name}`}
                  </>
                )}
                {!transaction.customer && <>{`${transaction.customer_name}`}</>}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <CardStatus status={transaction.status!} />
              <CardMethod
                method={transaction.payment_method}
                status={transaction.status}
                transaction={transaction}
              />
            </div>

            <div className="flex items-center gap-5 pb-2 mt-2">
              <h3 className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2 pb-0">
                <ReactIcons.PiIcon.PiCalendar size={12} className="mb-1" />
                {DateServices.dateWithBars(
                  new Date(transaction.created_at).toISOString()
                )}
              </h3>
              <h4 className="dark:text-green-400 text-green-700 text-sm">
                {CurrencyServices.formatWithCurrencyValue(
                  Number(transaction.amount),
                  "AOA"
                )}
              </h4>
              <h4 className="text-sm dark:text-white text-start">
                {transaction.customer && (
                  <>
                    {(transaction.customer?.profile?.phone_number == "" ||
                      !transaction.customer?.profile?.phone_number) &&
                      "----------------"}
                    {transaction.customer?.profile?.phone_number &&
                      transaction.customer?.profile?.phone_number != "" &&
                      transaction.customer?.profile?.phone_number.replace(
                        "+244",
                        "(+244) "
                      )}
                  </>
                )}
                {!transaction.customer && <>{transaction.customer_number}</>}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
}
