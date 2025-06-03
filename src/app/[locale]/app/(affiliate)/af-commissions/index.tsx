"use client";

import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CommissionsBox from "./components/CommissionsBox";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";
import BoxAffliateInfo from "./box-aff-info";
import useAffiliationsCommissions from "@/hooks/api/panels/affiliate/useAffiliations";

export default function TransferModal() {
  const {
    allAffiliationsAPI,
    isLoadingAllAffiliations,
    fetchAllAffiliations,
    handleLoadMore,
    isLoadingMoreCommissions,
    handleSeachByName,
  } = useAffiliationsCommissions();

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.MdIcon.MdDashboard size={18} />
          <CTranslateTo eng="Commissions" pt="Comissões" />
        </h4>
      </div>

      <ContainerBase>
        <BoxAffliateInfo affiliations={allAffiliationsAPI} />
        <CommissionsBox
          fetchMoreCommissions={() => handleLoadMore({ name: "" })}
          isLoadingMore={isLoadingMoreCommissions}
          fetchAll={fetchAllAffiliations}
          handleSearchName={handleSeachByName}
          isLoading={isLoadingAllAffiliations}
          affiliations={allAffiliationsAPI}
        />
      </ContainerBase>
    </PageBase>
  );
}
