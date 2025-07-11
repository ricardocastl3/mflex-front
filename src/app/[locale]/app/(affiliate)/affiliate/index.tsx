"use client";

import { ReactIcons } from "@/utils/icons";
import { affiliateServices } from "./components/services";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useAppProvider } from "@/providers/app/AppProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";
import CardAffiliateItem from "./components/card-items";

export default function OrganizerPage() {
  const { userLogged } = useAuth();
  const { affiliateConfigs } = useAppProvider();

  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.MdIcon.MdDashboard size={18} />
          <CTranslateTo eng="Affiliate Dashboard" pt="Painel do afiliado" />
        </h4>
      </div>

      <ContainerBase>
        <div className="md:p-4 p-0.5 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
              {affiliateServices
                .filter((i) => i.type == "menu")
                .map((service, i) => {
                  return <CardAffiliateItem service={service} key={i} />;
                })}
            </div>
          </div>
          {userLogged?.profile?.affiliate_active && affiliateConfigs && (
            <div className="pt-4 flex flex-col gap-4 border-t border-slate-300 dark:border-slate-800">
              <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                {affiliateServices
                  .filter((i) => i.type == "manual" || i.type == "tutorial")
                  .map((service, i) => {
                    return <CardAffiliateItem service={service} key={i} />;
                  })}
              </div>
            </div>
          )}
        </div>
      </ContainerBase>
    </PageBase>
  );
}
