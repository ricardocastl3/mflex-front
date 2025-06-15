"use client";

import { useTransactionProvider } from "@/providers/features/TransactionProvider";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PageBase from "../../@components/PageBase";
import GeneralDonationsBox from "./components/DonationBox";
import useDonations from "@/hooks/api/musics/useDonations";

export default function MyDonationsPage() {
  const {
    allDonations,
    isLoadingAllDonations,
    fetchAllDonations,
    handleLoadMore,
    isLoadingMoreDonationsTrans,
    handleSeachByName,
  } = useDonations({ route: "general" });

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.FaIcon.FaDonate size={18} />
          <CTranslateTo eng="My Donations" pt="Minhas Doações" />
        </h4>
      </div>

      <GeneralDonationsBox
        fetchMore={handleLoadMore}
        isLoadingMore={isLoadingMoreDonationsTrans}
        fetchAll={fetchAllDonations}
        handleSearchName={handleSeachByName}
        isLoading={isLoadingAllDonations}
        donationsAPI={allDonations}
      />
    </PageBase>
  );
}
