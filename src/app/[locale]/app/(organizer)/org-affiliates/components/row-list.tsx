import { IAffiliation } from "@/http/interfaces/models/affiliate/IAffiliate";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LoadMoreContent from "../../../@components/api-query-pages/LoadMoreContent";

export default function RowOrgAffiliates({
  isLoadingMore,
  affiliations,
}: {
  isLoadingMore: boolean;
  affiliations: IAffiliation[];
}) {
  return (
    <div className="flex flex-col w-full px-2">
      <div className="grid grid-cols-4 w-full p-4 border-b border-slate-200 dark:border-slate-800">
        <h4 className="font-bold dark:text-white text-sm col-span-2">
          <CTranslateTo eng="Name" pt="Nome" />
        </h4>

        <h4 className="font-bold dark:text-white text-sm">
          <CTranslateTo eng="Affiliate" pt="Afiliado" />
        </h4>
      </div>
      <div className="w-full">
        {affiliations.map((prod, i) => {
          return (
            <div
              key={i}
              className="p-4 items-center grid grid-cols-4 w-full cursor-pointer hover:bg-slate-100 rounded-lg dark:hover:bg-slate-700/50"
            >
              <h4 className="text-sm dark:text-white col-span-2 pr-5">
                {prod.event?.title}
              </h4>
              <h4 className="text-sm font-bold dark:text-yellow-400 text-yellow-500 col-span-2 pr-5">
                {`${prod.affiliate?.first_name} ${prod.affiliate?.last_name}`}
              </h4>
            </div>
          );
        })}

        <LoadMoreContent isLoading={isLoadingMore} />
      </div>
    </div>
  );
}
