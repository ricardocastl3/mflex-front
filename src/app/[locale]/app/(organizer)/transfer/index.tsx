"use client";

import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useTransferences from "@/hooks/api/useTransferences";
import TransferBox from "./components/TransferBox";
import PageBase from "../../@components/PageBase";

export default function TransferPage() {
  const {
    allTransfer,
    isLoadingAllTransfer,
    fetchAllTransfer,
    handleSeachByName,
  } = useTransferences();

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.AiICon.AiOutlineMoneyCollect size={18} />
          <CTranslateTo eng="Transfer" pt="Transferências" />
        </h4>
      </div>

      <TransferBox
        fetchAll={fetchAllTransfer}
        handleSearchName={handleSeachByName}
        isLoading={isLoadingAllTransfer}
        transfers={allTransfer}
      />
    </PageBase>
  );
}
