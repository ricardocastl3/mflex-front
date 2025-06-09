import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { useEffect, useState } from "react";
import { IAffiliateCommissionsResponseAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";
import { ITransfer } from "@/http/interfaces/models/ITransfer";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import RowCommissions from "./row-list";
import CardCommissions from "./card-list";
import LoadingMoreButton from "../../../@components/api-query-pages/LoadingMoreButton";

export default function CommissionsBox({
  affiliations,
  isLoading,
  fetchAll,
  handleSearchName,
  fetchMoreCommissions,
  isLoadingMore,
}: {
  fetchAll: () => void;
  fetchMoreCommissions: () => void;
  handleSearchName: (name: ISearchDataField) => void;
  isLoadingMore: boolean;
  isLoading: boolean;
  affiliations: IAffiliateCommissionsResponseAPI;
}) {
  // Controls
  const [commissionType, setCommissionType] = useState("all");
  const [transfers, setTransfers] = useState<ITransfer[]>(
    affiliations.commissions
  );

  useEffect(() => {
    let commissions: ITransfer[] = affiliations.commissions;

    if (commissionType == "all") {
      commissions = affiliations.commissions;
    }

    if (commissionType == "subs") {
      commissions = affiliations.commissions.filter(
        (i) => i.payment.event_name == "Comissão de subscrição"
      );
    }

    if (commissionType == "events") {
      commissions = affiliations.commissions.filter(
        (i) => i.payment.event_name != "Comissão de subscrição"
      );
    }
    setTransfers(commissions);
  }, [commissionType]);

  return (
    <BaseBox className={`w-full pb-5`}>
      <div className="flex md:items-center items-start md:flex-row flex-col gap-2 py-1 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <h4 className="md:text-lg text-base font-bold dark:text-white md:px-2 px-1 md:py-3 py-3">
          <CTranslateTo eng="Register" pt="Registos" />{" "}
          {` ${
            affiliations.has
              ? `(${affiliations.commissions.length}/${affiliations.total})`
              : `(${affiliations.total})`
          }`}
        </h4>
        {transfers.length > 0 && (
          <div className="md:w-[15vw] w-full">
            <AuSoftUI.UI.Select
              value={commissionType}
              onChange={(e) => {
                setCommissionType(e.target.value);
              }}
              className="w-full text-sm"
              weight={"sm"}
            >
              <option value={"all"} className="dark:bg-ausoft-slate-900">
                <CTranslateTo eng="All Commissions" pt="Todas comissões" />
              </option>
              <option value={"events"} className="dark:bg-ausoft-slate-900">
                <CTranslateTo eng="Events" pt="Eventos" />
              </option>
              <option value={"subs"} className="dark:bg-ausoft-slate-900">
                <CTranslateTo eng="Subscriptions" pt="Assinaturas" />
              </option>
            </AuSoftUI.UI.Select>
          </div>
        )}
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
            description_en="All created transfers will be shown here"
            description_pt="Todas as transferências criadas serão mostradas aqui"
            title_en="No Result"
            title_pt="Nenhum Resultado"
          />
        </div>
      )}

      {transfers.length > 0 && !isLoading && (
        <>
          <div className="md:flex hidden">
            <RowCommissions
              isLoadingMore={isLoadingMore}
              transfers={transfers}
            />
          </div>

          <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
            <CardCommissions
              isLoadingMore={isLoadingMore}
              transfers={transfers}
            />
          </div>
          <LoadingMoreButton
            fetchMore={fetchMoreCommissions}
            has={affiliations.has}
            isLoading={isLoadingMore}
          />
        </>
      )}
    </BaseBox>
  );
}
