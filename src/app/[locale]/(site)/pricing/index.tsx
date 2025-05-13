"use client";

import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";

import usePlan from "@/hooks/api/usePlan";
import HeroPlans from "./components/Hero";
import SubsCard from "./components/SubsCard";

export default function NewsPage() {
  const { isLoadingAllPlans, allPlans } = usePlan();

  return (
    <div className="flex flex-col gap-4">
      <HeroPlans />
      <div className="md:m-32 m-6">
        {isLoadingAllPlans && (
          <div className="p-4 flex justify-center items-center">
            <div>
              <ReactIcons.CgIcon.CgSpinner
                size={30}
                className="dark:text-white animate-spin"
              />
            </div>
          </div>
        )}

        {!isLoadingAllPlans && allPlans.length <= 0 && (
          <div className="flex items-center w-full h-full justify-center">
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

        {!isLoadingAllPlans && allPlans.length > 0 && (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {allPlans.map((plan, i) => {
              return <SubsCard plan={plan} key={i} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
