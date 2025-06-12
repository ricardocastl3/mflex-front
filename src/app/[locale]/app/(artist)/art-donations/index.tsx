"use client";

import { useEffect, useState } from "react";
import { useTransactionProvider } from "@/providers/features/TransactionProvider";
import { ReactIcons } from "@/utils/icons";
import { IMusicDonation } from "@/http/interfaces/models/artists/IMusicDonation";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TransactionDashboard from "./box/TransactionDashboard";
import TransactionList from "./box/TransactionList";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";
import useDonations from "@/hooks/api/musics/useDonations";

export default function MusicDonationPage() {
  const {
    allDonations,
    isLoadingAllDonations,
    handleLoadMore,
    fetchAllDonations,
    isLoadingMoreDonationsTrans,
    handleSeachByName,
  } = useDonations({ route: "artist" });
  const { fetchTransaction } = useTransactionProvider();

  // Controls
  const [isLoadingBase, setIsLoadingBase] = useState(true);
  const [allBaseTransaction, setAllBaseTransaction] = useState<
    IMusicDonation[]
  >([]);

  useEffect(() => {
    if (!isLoadingAllDonations) {
      setAllBaseTransaction(allDonations.donations);
      setIsLoadingBase(false);
    }
  }, [isLoadingAllDonations, allDonations]);

  useEffect(() => {
    if (fetchTransaction) fetchAllDonations();
  }, [fetchTransaction]);

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.FaIcon.FaDonate size={18} />
          <CTranslateTo eng="Music Donations" pt="Doações Musicais" />
        </h4>
      </div>

      <ContainerBase>
        <div className="pb-8 gap-4 flex flex-col">
          <TransactionDashboard
            isLoading={isLoadingBase && isLoadingAllDonations}
            apiTransactions={allDonations}
          />

          <TransactionList
            fetchMore={handleLoadMore}
            apiTransactions={allDonations}
            isLoadingMore={isLoadingMoreDonationsTrans}
            donations={allBaseTransaction}
            fetchAll={fetchAllDonations}
            handleSearchName={handleSeachByName}
            isLoading={isLoadingAllDonations}
          />
        </div>
      </ContainerBase>
    </PageBase>
  );
}
