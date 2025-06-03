"use client";

import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import SubscriptionBox from "./components/SubscriptionBox";
import PageBase from "../@components/PageBase";
import useSubsTransactions from "@/hooks/api/useSubsTransactions";

export default function SubscriptionPage() {
  const { allSubs, handleLoadMore, isLoadingMoreSubsTrans, isLoadingAllSubs } =
    useSubsTransactions();

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.HiIcon.HiCreditCard size={18} />
          <CTranslateTo eng="Subscriptions" pt="Assinaturas" />
        </h4>
      </div>

      <SubscriptionBox
        fetcHasMore={handleLoadMore}
        isLoadingMore={isLoadingMoreSubsTrans}
        isLoading={isLoadingAllSubs}
        subscriptions={allSubs}
      />
    </PageBase>
  );
}
