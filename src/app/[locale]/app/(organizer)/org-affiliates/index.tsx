"use client";

import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import OrgAffiliateBox from "./components/OrgAffiliateBox";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";
import useOrganizerAffiliations from "@/hooks/api/panels/organizer/useOrganizerAffiliations";

export default function OrgAffiliationsPage() {
  const { allOrgAffiliations, isLoadingAllOrgAffiliations } =
    useOrganizerAffiliations();

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.FaIcon.FaUserAlt size={18} />
          <CTranslateTo eng="Affiliates" pt="Afiliados" />
        </h4>
      </div>

      <ContainerBase>
        <OrgAffiliateBox
          isLoadingMore={false}
          isLoading={isLoadingAllOrgAffiliations}
          affiliations={allOrgAffiliations}
        />
      </ContainerBase>
    </PageBase>
  );
}
