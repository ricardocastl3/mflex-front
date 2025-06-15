import { ISubscriptionResponseAPI } from "@/http/interfaces/models/subscriptions/ISubscription";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CurrencyServices from "@/services/CurrencyServices";
import DateServices from "@/services/DateServices";
import CardSubsStatus from "./card-status";
import LoadMoreContent from "../../../@components/api-query-pages/LoadMoreContent";

export default function SubsList({
  subscriptions,
  isLoadingMore,
}: {
  isLoadingMore: boolean;
  subscriptions: ISubscriptionResponseAPI;
}) {
  return (
    <div className="flex flex-col w-full px-2">
      <div className="grid grid-cols-5 w-full p-4 border-b border-slate-200 dark:border-slate-800">
        <h4 className="font-bold dark:text-white text-sm">
          <CTranslateTo eng="Name" pt="Nome" />
        </h4>

        <h4 className="font-bold dark:text-white text-sm">
          <CTranslateTo eng="Amount" pt="Montante" />
        </h4>

        <h4 className="font-bold dark:text-white text-sm">
          <CTranslateTo eng="Status" pt="Estado" />
        </h4>

        <h4 className="font-bold dark:text-white text-sm ">
          <CTranslateTo eng="Signed" pt="Assinado" />
        </h4>
        <h4 className="font-bold dark:text-white text-sm ">
          <CTranslateTo eng="Expires At" pt="Expira em" />
        </h4>
      </div>
      <div className="w-full">
        {subscriptions.subs.map((prod, i) => {
          return (
            <div
              key={i}
              className="p-4 items-center grid grid-cols-5 w-full cursor-pointer hover:bg-slate-100 rounded-lg dark:hover:bg-slate-700/50"
            >
              <h4 className="text-sm dark:text-yellow-500 text-yellow-600 pr-5 font-bold">
                {prod.plan?.name}
              </h4>

              <h4 className="text-sm text-green-500">
                {`${CurrencyServices.decimal(Number(prod?.amount))} Kz`}
              </h4>

              <CardSubsStatus isExpired={prod.is_expired} />

              <h4 className="dark:text-white text-sm">
                {DateServices.dateWithBars(
                  new Date(prod.created_at).toISOString()
                )}
              </h4>

              <h4 className="dark:text-white text-sm">
                {DateServices.dateWithBars(
                  new Date(prod.expires_at).toISOString()
                )}
              </h4>
            </div>
          );
        })}

        <LoadMoreContent isLoading={isLoadingMore} />
      </div>
    </div>
  );
}
