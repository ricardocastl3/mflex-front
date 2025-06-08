import { IAffiliation } from "@/http/interfaces/models/affiliate/IAffiliate";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LoadMoreContent from "../../../@components/api-query-pages/LoadMoreContent";

export default function CardOrgAffiliates({
  isLoadingMore,
  affiliations,
}: {
  isLoadingMore: boolean;
  affiliations: IAffiliation[];
}) {
  return (
    <div className="flex flex-col w-full h-full px-1">
      {affiliations.map((prod, i) => {
        return (
          <div
            key={i}
            className="p-4 flex flex-col gap-2 border-b pb-2 border-slate-300 dark:border-slate-700/50"
          >
            <h4 className="dark:text-white md:text-sm text-[0.9rem] font-bold">
              {prod.event?.title}
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <h4 className="dark:text-yellow-400 text-yellow-500 font-bold text-sm">
                <CTranslateTo eng="Affiliate:" pt="Afiliado:" />
              </h4>

              <h4 className="text-sm font-bold dark:text-yellow-400 text-yellow-500 text-nowrap">
                {`${prod.affiliate?.first_name} ${prod.affiliate?.last_name}`}
              </h4>
            </div>
          </div>
        );
      })}

      <LoadMoreContent isLoading={isLoadingMore} />
    </div>
  );
}
