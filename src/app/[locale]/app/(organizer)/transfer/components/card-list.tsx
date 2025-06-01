import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useState } from "react";
import { ITransfer } from "@/http/interfaces/models/ITransfer";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CardStatus from "./card-status";
import CurrencyServices from "@/services/CurrencyServices";

export default function ProductCard({ transfers }: { transfers: ITransfer[] }) {
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
  return (
    <div className="flex flex-col w-full h-full px-1">
      {transfers.map((prod, i) => {
        return (
          <div
            key={i}
            className="p-4 flex flex-col gap-2 border-b pb-2 border-slate-300 dark:border-slate-700/50"
          >
            <h4 className="dark:text-white md:text-sm text-[0.9rem] font-bold">
              {prod.payment.ticket?.event_ticket && (
                <>
                  {`${prod.payment.ticket.event_ticket.event.title} - `}
                  <b className="font-bold text-yellow-500 dark:text-yellow-400">
                    {prod.payment.ticket.event_ticket.name}
                  </b>
                </>
              )}

              {!prod.payment.ticket?.event_ticket && (
                <>
                  {`${prod.payment.event_name} - `}
                  <b className="font-bold text-yellow-500 dark:text-yellow-400">
                    {prod.payment.event_ticket_name}
                  </b>
                </>
              )}
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <h4 className="dark:text-white text-sm">
                <CTranslateTo eng="Real Money" pt="Montante Real" />
              </h4>

              <h4 className="text-sm text-green-500">
                {`${CurrencyServices.decimal(Number(prod.payment.amount))} Kz`}
              </h4>

              <h4 className="dark:text-white text-sm">
                <CTranslateTo eng="Sent Money" pt="Montante Enviado" />
              </h4>

              <h4 className="text-sm text-green-500">
                {`${CurrencyServices.decimal(
                  Number(prod.payment.amount) * Number(0.92)
                )} Kz`}
              </h4>
              <h4 className="dark:text-white text-sm">
                <CTranslateTo eng="Sent Fee" pt="Taxa de envio" />
              </h4>
              <h4 className="text-sm dark:text-white font-bold">8%</h4>
              <h4 className="dark:text-white text-sm">IBAN:</h4>

              <h4 className="text-sm dark:text-white text-nowrap">
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
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <CardStatus status={prod.status} />
              {prod.status == "failed" && (
                <button
                  onClick={() => handleResend(prod.id)}
                  className="text-blue-500 font-bold justify-self-center dark:text-blue-500 text-sm text-center"
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
