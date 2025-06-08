import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { IAffiliation } from "@/http/interfaces/models/affiliate/IAffiliate";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import RowOrgAffiliates from "./row-list";
import CardOrgAffiliates from "./card-list";

export default function OrgAffiliateBox({
  affiliations,
  isLoading,
  isLoadingMore,
}: {
  isLoadingMore: boolean;
  isLoading: boolean;
  affiliations: IAffiliation[];
}) {
  return (
    <BaseBox className={`w-full pb-5`}>
      <div className="flex md:items-center items-start md:flex-row flex-col gap-4 py-1 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <h4 className="md:text-lg text-base font-bold dark:text-white md:px-2 px-1 md:py-2 py-3">
          <CTranslateTo eng="Registers" pt="Registos" />{" "}
          {` ${`(${affiliations.length})`}`}
        </h4>
      </div>

      <AuSoftUI.Component.LoadingList
        overflow={false}
        height="h-[52vh]"
        isLoading={isLoading}
      />

      {affiliations.length <= 0 && !isLoading && (
        <div className="md:pt-14 pt-12 md:pb-16 pb-16 py-12">
          <AuSoftUI.Component.ListEmpty
            hasAction={false}
            action_en="Create Group"
            action_pt="Criar Grupo"
            action_url="customers?create-group=true"
            description_en="All your affiliates will be shown here"
            description_pt="Todos os seus afiliados serão mostrados aqui"
            title_en="No Result"
            title_pt="Nenhum Resultado"
          />
        </div>
      )}

      {affiliations.length > 0 && !isLoading && (
        <>
          <div className="md:flex hidden">
            <RowOrgAffiliates
              isLoadingMore={isLoadingMore}
              affiliations={affiliations}
            />
          </div>

          <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
            <CardOrgAffiliates
              isLoadingMore={isLoadingMore}
              affiliations={affiliations}
            />
          </div>
        </>
      )}
    </BaseBox>
  );
}
