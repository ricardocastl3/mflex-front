import { useAppProvider } from "@/providers/app/AppProvider";
import { internalApi } from "@/http/axios/api";
import { useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { IOrganizerTransferResponseAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CardStatus from "./card-status";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CurrencyServices from "@/services/CurrencyServices";
import LoadMoreContent from "../../@components/api-query-pages/LoadMoreContent";

export default function RowOrganizerTranfers({
  transfersAPI,
  isLoadingMore,
}: {
  isLoadingMore: boolean;
  transfersAPI: IOrganizerTransferResponseAPI;
}) {
  const { handleAddToastOnArray } = useAppProvider();
  const { userLogged } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function handleResend(id: string) {
    try {
      setIsLoading(true);
      await internalApi.post("/payments/transfer-rs", {
        id,
      });
      window.location.href = "";
    } catch (err) {
      setIsLoading(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  const transfers = transfersAPI.transfers;

  return (
    <div className="flex flex-col w-full px-2">
      <div className="grid grid-cols-10 w-full p-4 border-b border-slate-200 dark:border-slate-800">
        <h4 className="font-bold dark:text-white text-sm col-span-3">
          <CTranslateTo eng="Name" pt="Nome" />
        </h4>
        <h4 className="font-bold dark:text-white text-sm col-span-2">
          <CTranslateTo eng="IBAN" pt="IBAN" />
        </h4>

        <h4 className="font-bold dark:text-white text-sm">
          <CTranslateTo eng="Real money" pt="M. Real" />
        </h4>
        <h4 className="font-bold dark:text-white text-sm w-fit">
          <CTranslateTo eng="Fee" pt="Taxa" />
        </h4>
        <h4 className="font-bold dark:text-white text-sm">
          <CTranslateTo eng="Sent money" pt="M. Enviado" />
        </h4>

        <h4 className="font-bold dark:text-white text-sm">
          <CTranslateTo eng="Status" pt="Estado" />
        </h4>

        <h4 className="font-bold dark:text-white text-sm text-center">
          <CTranslateTo eng="Action" pt="Ação" />
        </h4>
      </div>
      <div className="w-full">
        {transfers.map((prod, i) => {
          return (
            <div
              key={i}
              className="p-4 items-center grid grid-cols-10 w-full cursor-pointer hover:bg-slate-100 rounded-lg dark:hover:bg-slate-700/50"
            >
              <h4 className="text-sm dark:text-white col-span-3 pr-5">
                {prod.payment.ticket?.event_ticket && (
                  <>
                    {`${prod.payment.ticket.event_ticket.event.title} - `}
                    <b className="font-bold dark:text-yellow-400 text-yellow-500">
                      {prod.payment.ticket.event_ticket.name}
                    </b>
                  </>
                )}

                {!prod.payment.ticket?.event_ticket && (
                  <>
                    {`${prod.payment.event_name} - `}
                    <b className="font-bold dark:text-yellow-400 text-yellow-500">
                      {prod.payment.event_ticket_name}
                    </b>
                  </>
                )}
              </h4>

              <h4 className="text-sm dark:text-white text-nowrap col-span-2">
                {!prod.iban && (
                  <>
                    {
                      userLogged?.financial.filter((i) => i.type == "iban")[0]
                        .iban
                    }
                  </>
                )}
                {prod.iban}
              </h4>

              <h4 className="text-sm text-green-500">
                {`${CurrencyServices.decimal(Number(prod.payment.amount))} Kz`}
              </h4>

              <h4 className="text-sm dark:text-white font-bold w-fit">8%</h4>

              <h4 className="text-sm text-green-500">
                {`${CurrencyServices.decimal(
                  Number(prod.payment.amount) * Number(0.92)
                )} Kz`}
              </h4>

              <CardStatus status={prod.status} />

              {prod.status == "failed" && (
                <button
                  onClick={() => handleResend(prod.id)}
                  className="text-yellow-500 font-bold justify-self-center dark:text-yellow-500 text-sm text-center"
                >
                  {isLoading && (
                    <ReactIcons.PiIcon.PiSpinner
                      size={18}
                      className="animate-spin"
                    />
                  )}

                  {!isLoading && <CTranslateTo eng="Resend" pt="Reenviar" />}
                </button>
              )}

              {prod.status == "success" && (
                <h4 className="dark:text-slate-600 text-center">----------</h4>
              )}
            </div>
          );
        })}

        <LoadMoreContent isLoading={isLoadingMore} />
      </div>
    </div>
  );
}
