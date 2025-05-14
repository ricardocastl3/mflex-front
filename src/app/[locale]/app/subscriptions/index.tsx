"use client";

import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import SubscriptionBox from "./components/SubscriptionBox";
import PageBase from "../cmps/PageBase";

import useSubscriptionTransactions from "@/hooks/api/useSubscriptionTransactions";

export default function SubscriptionPage() {
  const { allSubs, isLoadingAllSubs } = useSubscriptionTransactions();

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.HiIcon.HiCreditCard size={18} />
          <CTranslateTo eng="Subscriptions" pt="Assinaturas" />
        </h4>
      </div>

      <SubscriptionBox isLoading={isLoadingAllSubs} subscriptions={allSubs} />
    </PageBase>
  );
}
