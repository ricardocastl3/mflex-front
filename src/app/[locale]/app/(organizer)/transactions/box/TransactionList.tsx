import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { langByCookies } from "@/http/axios/api";
import { methodTransactions, statusTransaction } from "../utils/vars";
import { useEffect, useState } from "react";
import { useAppProvider } from "@/providers/app/AppProvider";
import { IPayment } from "@/http/interfaces/models/IPayment";
import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { IOrganizerTransactionAPI } from "@/http/interfaces/models/transactions/ITransactionsAPI";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import ListTransactions from "../components/list-trans";
import CardTransaction from "../components/card-trans";
import LoadingMoreButton from "../../../@components/api-query-pages/LoadingMoreButton";

export default function TransactionList({
  transactions,
  isLoading,
  isLoadingMore,
  fetchAll,
  fetchMore,
  handleSearchName,
  apiTransactions,
}: {
  fetchAll: () => void;
  handleSearchName: (name: ISearchDataField) => void;
  isLoading: boolean;
  isLoadingMore: boolean;
  fetchMore: () => void;
  transactions: IPayment[];
  apiTransactions: IOrganizerTransactionAPI;
}) {
  const { openBanner } = useAppProvider();

  // Controls
  const [searchName, setSearchName] = useState("");
  const [canSearch, setCanSearch] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("all");
  const [transactionMethod, setTransactionMethod] = useState("all");
  const [transactionBase, setTransactionBase] = useState<IPayment[]>([]);

  // Debounced search effect
  useEffect(() => {
    if (!canSearch) return;

    const handler = setTimeout(() => {
      if (searchName === "") {
        fetchAll();
        setTransactionStatus("all");
      } else {
        handleSearchName({
          name: searchName,
        });
      }
      setCanSearch(false);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchName, canSearch, fetchAll, handleSearchName]);

  // Combined filter effect
  useEffect(() => {
    const filteredTransactions = apiTransactions.transactions
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .filter((transaction) => {
        const statusMatch =
          transactionStatus === "all" ||
          transaction.status === transactionStatus;

        const methodMatch =
          transactionMethod === "all" ||
          transaction.payment_method === transactionMethod;

        return statusMatch && methodMatch;
      });

    setTransactionBase(filteredTransactions);
  }, [transactionStatus, transactionMethod, apiTransactions]);

  return (
    <BaseBox
      className={`${
        openBanner
          ? "md:min-h-fit min-h-fit md:max-h-fit max-h-full"
          : "md:min-h-fit min-h-fit md:max-h-fit max-h-full"
      }  pt-4 md:pb-4 pb-4 md:px-2 px-0.5 md:mt-4 mt-4 md:mb-4 mb-4`}
    >
      <div className="flex md:items-center items-start md:flex-row flex-col gap-4 pb-4 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <h4 className="md:text-lg text-base font-bold dark:text-white">
          <CTranslateTo eng="Registers" pt="Registros" />
          {`${
            apiTransactions.has
              ? ` (${transactionBase.length}/${apiTransactions.total})`
              : ` (${transactionBase.length})`
          }`}
        </h4>
        <div
          className={`flex items-center md:flex-row flex-col gap-2 md:w-[30rem] w-full`}
        >
          <AuSoftUI.UI.TextField.Default
            value={searchName}
            onChange={(e) => {
              if (!canSearch) setCanSearch(true);
              setSearchName(e.target.value);
            }}
            weight={"sm"}
            placeholder={
              langByCookies == "en"
                ? "Name or cellphone..."
                : "Ex: Nome ou número de celular..."
            }
            className={`w-full text-sm font-bold`}
          />

          <AuSoftUI.UI.Select
            value={transactionStatus}
            onChange={(e) => {
              setTransactionStatus(e.target.value);
            }}
            weight={"sm"}
            className=" md:w-[220px] w-full px-[15px] md:text-sm text-[0.85rem] font-bold"
          >
            <option value={"all"} className="dark:bg-ausoft-slate-950">
              <CTranslateTo eng="All" pt="Todas" />
            </option>
            {statusTransaction.map((_, i) => {
              return (
                <option
                  key={i}
                  value={_.value}
                  className="dark:bg-ausoft-slate-950"
                >
                  <CTranslateTo eng={_.title_en} pt={_.title_pt} />
                </option>
              );
            })}
          </AuSoftUI.UI.Select>
          <AuSoftUI.UI.Select
            value={transactionMethod}
            onChange={(e) => {
              setTransactionMethod(e.target.value);
            }}
            weight={"sm"}
            className=" md:w-[220px] w-full px-[15px] md:text-sm text-[0.85rem] font-bold"
          >
            <option value={"all"} className="dark:bg-ausoft-slate-950">
              <CTranslateTo eng="All" pt="Todas" />
            </option>
            {methodTransactions.map((_, i) => {
              return (
                <option
                  key={i}
                  value={_.value}
                  className="dark:bg-ausoft-slate-950"
                >
                  <CTranslateTo eng={_.title_en} pt={_.title_pt} />
                </option>
              );
            })}
          </AuSoftUI.UI.Select>
        </div>
      </div>

      <AuSoftUI.Component.LoadingList
        overflow={false}
        height="h-[52vh]"
        isLoading={isLoading}
      />

      {transactions.length <= 0 && !isLoading && (
        <div className="md:pt-14 pt-12 md:pb-16 pb-16 py-12">
          <AuSoftUI.Component.ListEmpty
            hasAction={false}
            action_en="Create Group"
            action_pt="Criar Grupo"
            action_url="customers?create-group=true"
            description_en="All created payments will be shown here"
            description_pt="Todos os pagamentos criados serão mostrados aqui"
            title_en="No Result"
            title_pt="Nenhum Resultado"
          />
        </div>
      )}

      {transactions.length > 0 && !isLoading && (
        <>
          <div className="md:flex hidden">
            <ListTransactions
              isLoadingMore={isLoadingMore}
              transactions={transactionBase}
            />
          </div>

          <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
            <CardTransaction
              isLoadingMore={isLoadingMore}
              transactions={transactionBase}
            />
          </div>

          <LoadingMoreButton
            fetchMore={fetchMore}
            has={apiTransactions.has}
            isLoading={isLoadingMore}
          />
        </>
      )}
    </BaseBox>
  );
}
