"use client";

import { useTransactionProvider } from "@/providers/features/TransactionProvider";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PageBase from "../@components/PageBase";
import OrganizerTransferBox from "./components/TransferBox";
import useOrganizerTransfers from "@/hooks/api/panels/organizer/useOrganizerTransfers";

export default function MyDonationsPage() {
  const { fetchTransaction } = useTransactionProvider();
  const {
    allTransfer,
    isLoadingAllTransfer,
    fetchAllTransfer,
    handleLoadMore,
    isLoadingMoreTransfers,
    handleSeachByName,
  } = useOrganizerTransfers();

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.FaIcon.FaDonate size={18} />
          <CTranslateTo eng="My Donations" pt="Minhas Doações" />
        </h4>
      </div>

      <OrganizerTransferBox
        fetchMore={() => handleLoadMore({ name: "" })}
        isLoadingMore={isLoadingMoreTransfers}
        fetchAll={fetchAllTransfer}
        handleSearchName={handleSeachByName}
        isLoading={isLoadingAllTransfer}
        transfersAPI={allTransfer}
      />
    </PageBase>
  );
}
