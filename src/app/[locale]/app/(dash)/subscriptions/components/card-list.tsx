import { ISubscriptionResponseAPI } from "@/http/interfaces/models/subscriptions/ISubscription";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CurrencyServices from "@/services/CurrencyServices";
import DateServices from "@/services/DateServices";
import CardSubsStatus from "./card-status";
import LoadMoreContent from "../../../@components/api-query-pages/LoadMoreContent";

export default function SubsCard({
  subscriptions,
  isLoadingMore,
}: {
  isLoadingMore: boolean;
  subscriptions: ISubscriptionResponseAPI;
}) {
  return (
    <div className="flex flex-col w-full h-full px-1">
      {subscriptions.subs.map((prod, i) => {
        return (
          <div
            key={i}
            className="p-4 flex flex-col gap-2 border-b pb-2 border-slate-300 dark:border-slate-700/50"
          >
            <h4 className="dark:text-yellow-500 text-yellow-600 text-[0.9rem] font-bold">
              {prod.plan?.name}
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <h4 className="dark:text-white text-sm">
                <CTranslateTo eng="Amount:" pt="Montante:" />
              </h4>

              <h4 className="text-sm text-green-500">
                {`${CurrencyServices.decimal(Number(prod.amount))} Kz`}
              </h4>

              <h4 className="dark:text-white text-sm">
                <CTranslateTo eng="Signed at:" pt="Assinado em:" />
              </h4>
              <h4 className="text-sm dark:text-white text-nowrap">
                {DateServices.dateWithBars(
                  new Date(prod.created_at).toISOString()
                )}
              </h4>
              <h4 className="text-sm dark:text-white">
                <CTranslateTo eng="Expires At:" pt="Expira em:" />
              </h4>
              <h4 className="dark:text-white text-sm">
                {DateServices.dateWithBars(
                  new Date(prod.expires_at).toISOString()
                )}
              </h4>
              <h4 className="text-sm dark:text-white">
                <CTranslateTo eng="Status:" pt="Estado:" />
              </h4>
              <CardSubsStatus isExpired={prod.is_expired} />
            </div>
          </div>
        );
      })}

      <LoadMoreContent isLoading={isLoadingMore} />
    </div>
  );
}
