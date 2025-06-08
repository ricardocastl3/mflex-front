import { IAffiliateCommissionsResponseAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CardStatus from "./card-status";
import LoadMoreContent from "../../../@components/api-query-pages/LoadMoreContent";
import DateServices from "@/services/DateServices";

export default function RowAFEvents({
  isLoadingMore,
  affiliations,
}: {
  isLoadingMore: boolean;
  affiliations: IAffiliateCommissionsResponseAPI;
}) {
  return (
    <div className="flex flex-col w-full px-2">
      <div className="grid grid-cols-4 w-full p-4 border-b border-slate-200 dark:border-slate-800">
        <h4 className="font-bold dark:text-white text-sm col-span-2">
          <CTranslateTo eng="Name" pt="Nome" />
        </h4>

        <h4 className="font-bold dark:text-white text-sm">
          <CTranslateTo eng="Start At" pt="Data de início" />
        </h4>

        <h4 className="font-bold dark:text-white text-sm">
          <CTranslateTo eng="Status" pt="Estado" />
        </h4>
      </div>
      <div className="w-full">
        {affiliations.affiliations.map((prod, i) => {
          return (
            <div
              key={i}
              className="p-4 items-center grid grid-cols-4 w-full cursor-pointer hover:bg-slate-100 rounded-lg dark:hover:bg-slate-700/50"
            >
              <h4 className="text-sm dark:text-white col-span-2 pr-5">
                {prod.event?.title}
              </h4>

              <h4 className="text-sm dark:text-white text-nowrap">
                {DateServices.dateWithBars(prod.event?.start_at.toString()!)}
              </h4>

              <CardStatus date={prod.event?.start_at!} />
            </div>
          );
        })}

        <LoadMoreContent isLoading={isLoadingMore} />
      </div>
    </div>
  );
}
