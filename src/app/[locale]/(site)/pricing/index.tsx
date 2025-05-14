"use client";

import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAuth } from "@/providers/auth/AuthProvider";
import { Meteors } from "@/@components/(aceternity)/Meteors";

import usePlan from "@/hooks/api/usePlan";
import HeroPlans from "./components/Hero";
import SubsCard from "./components/SubsCard";

export default function NewsPage() {
  const { isLoadingAllPlans, allPlans } = usePlan();
  const { isLoadingCurrentSubsUsage } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <HeroPlans />
      <div className="relative">
        {(isLoadingAllPlans || isLoadingCurrentSubsUsage) && (
          <div className="p-4 flex justify-center items-center">
            <div>
              <ReactIcons.CgIcon.CgSpinner
                size={30}
                className="dark:text-white animate-spin"
              />
            </div>
          </div>
        )}

        {!isLoadingAllPlans &&
          allPlans.length <= 0 &&
          !isLoadingCurrentSubsUsage && (
            <div className="flex items-center w-full h-full justify-center md:m-32 m-6">
              <AuSoftUI.Component.ListEmpty
                action_en="Get In Touch"
                action_pt="Entrar em contacto"
                action_url="https://wa.me/244954974069?text=Olá, preciso de ajuda com a plataforma"
                description_en="OOops! The plans were not loaded correctly, please refresh the page, if the error persists please contact us!"
                description_pt="OOops! Os planos não foram carregados corretamente, atualize a página, caso o error persistir entre em contacto conosco!"
                title_en="Unavailable Plans"
                title_pt="Planos Indisponíveis"
                action_blank
                hasAction
              />
            </div>
          )}

        {!isLoadingAllPlans &&
          allPlans.length > 0 &&
          !isLoadingCurrentSubsUsage && (
            <div className="flex flex-col gap-12 md:mx-36 mx-6 md:mt-16 mt-8 md:mb-16 mb-8">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {allPlans.map((plan, i) => {
                  return <SubsCard plan={plan} index={i} key={i} />;
                })}
              </div>
            </div>
          )}

        {window.innerWidth > 765 && <Meteors number={5} />}
      </div>
    </div>
  );
}
