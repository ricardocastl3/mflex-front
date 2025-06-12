import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { useEffect, useState } from "react";
import { IMusicDonationResponseAPI } from "@/http/interfaces/models/artists/IMusicDonation";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import RowDonationsTranfers from "./row-list";
import CardOrganizerDonadonations from "./card-list";
import ContainerBase from "../../@components/ContainerBase";
import LoadingMoreButton from "../../@components/api-query-pages/LoadingMoreButton";

export default function GeneralDonationsBox({
  donationsAPI,
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
  donationsAPI: IMusicDonationResponseAPI;
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

  const donations = donationsAPI.donations;

  return (
    <ContainerBase>
      <BaseBox className={`w-full pb-5`}>
        <div className="flex md:items-center items-start md:flex-row flex-col gap-4 py-1 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
          <h4 className="md:text-lg text-base font-bold dark:text-white md:px-2 px-1 md:py-2 py-3">
            <CTranslateTo eng="Register" pt="Registos" />
            {`${
              donationsAPI.has
                ? ` (${donationsAPI.donations.length}/${donationsAPI.total})`
                : ` (${donationsAPI.donations.length})`
            }`}
          </h4>
        </div>

        <AuSoftUI.Component.LoadingList
          overflow={false}
          height="h-[52vh]"
          isLoading={isLoading}
        />

        {donations.length <= 0 && !isLoading && (
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

        {donations.length > 0 && !isLoading && (
          <>
            <div className="md:flex hidden">
              <RowDonationsTranfers
                isLoadingMore={isLoadingMore}
                donationsAPI={donationsAPI}
              />
            </div>

            <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
              <CardOrganizerDonadonations
                isLoadingMore={isLoadingMore}
                donationsAPI={donationsAPI}
              />
            </div>

            <LoadingMoreButton
              fetchMore={fetchMore}
              has={donationsAPI.has}
              isLoading={isLoadingMore}
            />
          </>
        )}
      </BaseBox>
    </ContainerBase>
  );
}
