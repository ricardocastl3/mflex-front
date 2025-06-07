"use client";

import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAuth } from "@/providers/auth/AuthProvider";
import { Meteors } from "@/@components/(aceternity)/Meteors";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { internalApi } from "@/http/axios/api";
import { IPlan } from "@/http/interfaces/models/IPlan";
import { useModal } from "@/providers/app/ModalProvider";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";

import usePlan from "@/hooks/api/usePlan";
import HeroPlans from "./components/Hero";
import SubsCard from "./components/SubsCard";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function PricingPage() {
  const { isLoadingAllPlans, allPlans } = usePlan();
  const { isLoadingCurrentSubsUsage } = useAuth();
  const { handleOpenModal } = useModal();
  const { handleAddItemOnCheckout } = useCheckoutProvider();
  const { currentSubscription } = useAuth();

  function openSubsModal(plan: IPlan) {
    handleAddItemOnCheckout({
      type: "subs",
      amount: plan.amount,
      price: plan.id,
      monthly: "no",
    });
    handleOpenModal("angolan-payment-modal");
  }

  const searchParams = useSearchParams();
  const fetchTV = useCallback(
    async (id: string) => {
      try {
        const resp = await internalApi.get<{ sb: IPlan }>("/plans/sb", {
          params: { id },
        });
        const plan = resp.data.sb;

        if (currentSubscription) {
          if (currentSubscription.subscription.plan?.id != plan.id) {
            openSubsModal(plan);
          } else {
            if (
              currentSubscription?.subscription.plan?.flex_movie &&
              !currentSubscription.subscription.is_expired
            ) {
              LocalStorageServices.checkRedirects();
            } else {
              openSubsModal(plan);
            }
          }
        } else {
          openSubsModal(plan);
        }
      } catch (err) {}
    },
    [currentSubscription]
  );

  useEffect(() => {
    const id = searchParams.get("sb") || "";
    if (id == "") return;
    fetchTV(id);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <HeroPlans />
      <div className="relative">
        {(isLoadingAllPlans || isLoadingCurrentSubsUsage) && (
          <div className="p-4 flex w-full h-full justify-center items-center md:my-16 my-12">
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
            <div className="animate-fade flex items-center w-full h-full justify-center md:my-32 my-16">
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
            <div className="animate-fade flex flex-col gap-12 md:mx-36 mx-6 md:mt-24 mt-8 md:mb-24 mb-8">
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
