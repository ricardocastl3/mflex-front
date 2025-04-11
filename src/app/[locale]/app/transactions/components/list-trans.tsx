import React from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import DateServices from "@/services/DateServices";
import CardStatus from "./card-status";
import CurrencyServices from "@/services/CurrencyServices";
import CardMethod from "./card-method";

import { useAppProvider } from "@/providers/app/AppProvider";
import { IPayment } from "@/http/interfaces/models/IPayment";

export default function ListTransactions({
  transactions,
}: {
  transactions: IPayment[];
}) {
  const { openBanner } = useAppProvider();

  return (
    <div className="md:flex hidden w-full flex-col">
      <div
        className={`mx-4 grid grid-cols-7 dark:text-white font-bold  border-b pb-3 border-slate-200 dark:border-slate-700/60`}
      >
        <h3 className="text-sm col-span-2">
          <CTranslateTo eng="Name" pt="Nome" />
        </h3>
        <h3 className="text-sm text-start">
          <CTranslateTo eng="Type" pt="Tipo" />
        </h3>
        <h3 className="text-sm text-start">
          <CTranslateTo eng="Amount" pt="Montante" />
        </h3>
        <h3 className="text-sm text-start">
          <CTranslateTo eng="Phone" pt="Número de celular" />
        </h3>
        <h3 className="text-sm text-center">
          <CTranslateTo eng="Status" pt="Estado" />
        </h3>
        <h3 className="text-sm text-center">
          <CTranslateTo eng="Date" pt="Data" />
        </h3>
      </div>
      <div className={`pb-6`}>
        {transactions.map((transaction, i) => {
          return (
            <div
              key={i}
              className={`mx-2 grid grid-cols-7 rounded-xl px-2 items-center cursor-pointer py-3 hover:bg-slate-100 dark:hover:bg-slate-800/70`}
            >
              <h3 className="col-span-2 text-yellow-600 font-bold dark:text-yellow-400 text-sm py-2">
                {transaction.customer && (
                  <>
                    {`${transaction.customer?.first_name} ${transaction.customer?.last_name}`}
                  </>
                )}
                {!transaction.customer && <>{`${transaction.customer_name}`}</>}
              </h3>

              <div className="pr-16">
                <CardMethod
                  method={transaction.payment_method}
                  status={transaction.status}
                  transaction={transaction}
                />
              </div>

              <h4 className="dark:text-green-400 w-fit rounded-full text-green-700 text-sm text-start px-2 pt-1 bg-green-100 dark:bg-green-800/40">
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

              <div className="flex justify-center ">
                <CardStatus status={transaction.status!} />
              </div>

              <h4 className="dark:text-slate-200 text-sm text-center">
                {DateServices.dateWithBars(
                  new Date(transaction.created_at).toISOString()
                )}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
