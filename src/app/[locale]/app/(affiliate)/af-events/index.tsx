"use client";

import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import AFEventBox from "./components/AFEventBox";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";
import useAffiliationsCommissions from "@/hooks/api/panels/affiliate/useAffiliations";

export default function AFEventPage() {
  const {
    allAffiliationsAPI,
    isLoadingAllAffiliations,
    isLoadingMoreCommissions,
  } = useAffiliationsCommissions();

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.MdIcon.MdDashboard size={18} />
          <CTranslateTo eng="Events" pt="Eventos" />
        </h4>
      </div>

      <ContainerBase>
        <AFEventBox
          isLoadingMore={isLoadingMoreCommissions}
          isLoading={isLoadingAllAffiliations}
          affiliations={allAffiliationsAPI}
        />
      </ContainerBase>
    </PageBase>
  );
}
