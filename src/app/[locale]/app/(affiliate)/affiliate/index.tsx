"use client";

import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TransferBox from "./components/TransferBox";
import PageBase from "../../components/PageBase";
import ContainerBase from "../../components/ContainerBase";
import BoxAffliateInfo from "./box-aff-info";
import useAffiliations from "@/hooks/api/useAffiliations";

export default function TransferModal() {
  const {
    allAffiliations,
    allCommisions,
    isLoadingAllAffiliations,
    fetchAllAffiliations,
    handleSeachByName,
  } = useAffiliations();

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.MdIcon.MdDashboard size={18} />
          <CTranslateTo eng="Affliate Dashboard" pt="Painel do afiliado" />
        </h4>
      </div>

      <ContainerBase>
        <BoxAffliateInfo
          affiliations={allAffiliations}
          commissions={allCommisions}
        />
        <TransferBox
          fetchAll={fetchAllAffiliations}
          handleSearchName={handleSeachByName}
          isLoading={isLoadingAllAffiliations}
          transfers={allCommisions}
        />
      </ContainerBase>
    </PageBase>
  );
}
