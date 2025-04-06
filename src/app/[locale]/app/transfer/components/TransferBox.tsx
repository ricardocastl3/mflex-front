import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useEffect, useState } from "react";
import { ITransfer } from "@/http/interfaces/models/ITransfer";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import ProductList from "./row-list";
import ProductCard from "./card-list";

export default function TransferBox({
  transfers,
  isLoading,
  fetchAll,
  handleSearchName,
}: {
  fetchAll: () => void;
  handleSearchName: (name: ISearchDataField) => void;
  isLoading: boolean;
  transfers: ITransfer[];
}) {
  const { openBanner } = useAppProvider();

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

  return (
    <BaseBox
      className={`${
        openBanner
          ? "md:min-h-fit min-h-fit md:max-h-fit max-h-full"
          : "md:min-h-fit min-h-fit md:max-h-fit max-h-full"
      }  overflow-y-auto pt-4 md:pb-4 pb-4 md:px-2 px-0.5 md:mt-4 mt-4 w-full md:mb-0 mb-12`}
    >
      <div className="flex md:items-center items-start md:flex-row flex-col gap-4 py-1 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <h4 className="md:text-lg text-base font-bold dark:text-white">
          <CTranslateTo eng="Register" pt="Registos" /> ({transfers.length})
        </h4>
      </div>

      <AuSoftUI.Component.LoadingList isLoading={isLoading} />

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
            <ProductList transfers={transfers} />
          </div>

          <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
            <ProductCard transfers={transfers} />
          </div>
        </>
      )}
    </BaseBox>
  );
}
