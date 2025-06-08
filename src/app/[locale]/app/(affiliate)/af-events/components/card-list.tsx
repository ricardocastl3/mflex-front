import { IAffiliateCommissionsResponseAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CardStatus from "./card-status";
import LoadMoreContent from "../../../@components/api-query-pages/LoadMoreContent";
import DateServices from "@/services/DateServices";

export default function CardAFEvents({
  isLoadingMore,
  affiliations,
}: {
  isLoadingMore: boolean;
  affiliations: IAffiliateCommissionsResponseAPI;
}) {
  return (
    <div className="flex flex-col w-full h-full px-1">
      {affiliations.affiliations.map((prod, i) => {
        return (
          <div
            key={i}
            className="p-4 flex flex-col gap-2 border-b pb-2 border-slate-300 dark:border-slate-700/50"
          >
            <h4 className="dark:text-white md:text-sm text-[0.9rem] font-bold">
              {prod.event?.title}
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <h4 className="dark:text-white text-sm">
                <CTranslateTo eng="Start At" pt="Data de início" />
              </h4>

              <h4 className="text-sm dark:text-white text-nowrap">
                {DateServices.dateWithBars(prod.event?.start_at.toString()!)}
              </h4>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <CardStatus date={prod.event?.start_at!} />
            </div>
          </div>
        );
      })}

      <LoadMoreContent isLoading={isLoadingMore} />
    </div>
  );
}
