import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { useEffect, useState } from "react";
import { IOrganizerTransferResponseAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import RowOrganizerTranfers from "./row-list";
import CardOrganizerTransfers from "./card-list";
import ContainerBase from "../../@components/ContainerBase";
import LoadingMoreButton from "../../@components/api-query-pages/LoadingMoreButton";

export default function OrganizerTransferBox({
  transfersAPI,
  isLoading,
  fetchAll,
  handleSearchName,
  fetchMore,
  isLoadingMore,
}: {
  fetchAll: () => void;
  fetchMore: () => void;
  handleSearchName: (name: ISearchDataField) => void;
  isLoading: boolean;
  isLoadingMore: boolean;
  transfersAPI: IOrganizerTransferResponseAPI;
}) {
  // Controls
  const [searchName, setSearchName] = useState("");
  const [canSearch, setCanSearch] = useState(false);

  // Debounced search effect
  useEffect(() => {
    if (!canSearch) return;

    const handler = setTimeout(() => {
      if (searchName === "") {
        fetchAll();
      } else {
        handleSearchName({ name: searchName });
      }
      setCanSearch(false);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchName, canSearch]);

  const transfers = transfersAPI.transfers;

  return (
    <ContainerBase>
      <BaseBox className={`w-full pb-5`}>
        <div className="flex md:items-center items-start md:flex-row flex-col gap-4 py-1 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
          <h4 className="md:text-lg text-base font-bold dark:text-white md:px-2 px-1 md:py-2 py-3">
            <CTranslateTo eng="Register" pt="Registos" />
            {`${
              transfersAPI.has
                ? ` (${transfersAPI.transfers.length}/${transfersAPI.total})`
                : ` (${transfersAPI.transfers.length})`
            }`}
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
              description_en="All donations you make will be shown here."
              description_pt="Todas as doações que fizeres serão mostradas aqui"
              title_en="No Result"
              title_pt="Nenhum Resultado"
            />
          </div>
        )}

        {transfers.length > 0 && !isLoading && (
          <>
            <div className="md:flex hidden">
              <RowOrganizerTranfers
                isLoadingMore={isLoadingMore}
                transfersAPI={transfersAPI}
              />
            </div>

            <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
              <CardOrganizerTransfers
                isLoadingMore={isLoadingMore}
                transfersAPI={transfersAPI}
              />
            </div>

            <LoadingMoreButton
              fetchMore={fetchMore}
              has={transfersAPI.has}
              isLoading={isLoadingMore}
            />
          </>
        )}
      </BaseBox>
    </ContainerBase>
  );
}
