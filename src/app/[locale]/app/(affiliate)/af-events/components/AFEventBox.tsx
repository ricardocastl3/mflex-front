import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { IAffiliateCommissionsResponseAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import RowAFEvents from "./row-list";
import CardAFEvents from "./card-list";

export default function AFEventBox({
  affiliations,
  isLoading,
  isLoadingMore,
}: {
  isLoadingMore: boolean;
  isLoading: boolean;
  affiliations: IAffiliateCommissionsResponseAPI;
}) {
  const transfers = affiliations.commissions;

  return (
    <BaseBox className={`w-full pb-5`}>
      <div className="flex md:items-center items-start md:flex-row flex-col gap-4 py-1 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <h4 className="md:text-lg text-base font-bold dark:text-white md:px-2 px-1 md:py-2 py-3">
          <CTranslateTo eng="Registers" pt="Registos" />{" "}
          {` ${`(${affiliations.affiliations.length})`}`}
        </h4>
      </div>

      <AuSoftUI.Component.LoadingList
        overflow={false}
        height="h-[52vh]"
        isLoading={isLoading}
      />

      {transfers.length <= 0 && !isLoading && (
        <div className="md:pt-14 pt-12 md:pb-16 pb-16 py-12">
          <AuSoftUI.Component.ListEmpty
            hasAction={false}
            action_en="Create Group"
            action_pt="Criar Grupo"
            action_url="customers?create-group=true"
            description_en="All your affiliation events will be shown here"
            description_pt="Todos os seus eventos por afiliação serão mostrados aqui"
            title_en="No Result"
            title_pt="Nenhum Resultado"
          />
        </div>
      )}

      {transfers.length > 0 && !isLoading && (
        <>
          <div className="md:flex hidden">
            <RowAFEvents
              isLoadingMore={isLoadingMore}
              affiliations={affiliations}
            />
          </div>

          <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
            <CardAFEvents
              isLoadingMore={isLoadingMore}
              affiliations={affiliations}
            />
          </div>
        </>
      )}
    </BaseBox>
  );
}
