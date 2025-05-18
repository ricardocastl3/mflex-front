import { IPlan } from "@/http/interfaces/models/IPlan";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useRouter } from "next/navigation";
import { langByCookies } from "@/http/axios/api";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ReactIcons } from "@/utils/icons";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import CurrencyServices from "@/services/CurrencyServices";
import SubsFeatureItem from "./SubsFeatureItem";

export default function SubsCard({
  plan,
  index,
}: {
  plan: IPlan;
  index: number;
}) {
  const { currentSubscription, userLogged } = useAuth();
  const { handleAddToastOnArray } = useAppProvider();
  const { handleOpenModal } = useModal();
  const { handleAddItemOnCheckout } = useCheckoutProvider();

  const router = useRouter();

  const isExpired = currentSubscription
    ? currentSubscription.subscription.is_expired
    : true;

  const samePlan =
    currentSubscription && currentSubscription.subscription.plan?.id == plan.id
      ? true
      : false;

  const buttonDisabled =
    (!isExpired && samePlan) ||
    (currentSubscription && userLogged?.is_trialed && plan.is_trial);

  function handleSubscribe() {
    try {
      if (!userLogged) {
        LocalStorageServices.resetAllKeys();
        LocalStorageServices.setKey(
          LocalStorageServices.keys.redirectToPricing,
          new Date().getTime()
        );
        router.push(`/${langByCookies}/sign-in`);
      } else {
        handleAddItemOnCheckout({
          type: "subs",
          amount: plan.amount,
          price: plan.id,
          monthly: "no",
        });

        handleOpenModal("angolan-payment-modal");
      }
    } catch (err) {
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <div
      className={`${
        index == 1
          ? "md:scale-110 scale-100 md:shadow-md shadow-none dark:md:shadow-slate-800"
          : ""
      } flex flex-col gap-4 bg-white dark:bg-transparent justify-between rounded-xl border border-white dark:border-slate-800 p-4`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="dark:text-base text-[0.9rem] font-bold text-yellow-600 dark:text-yellow-500">
            {plan.name}
          </h1>
          <h1 className="md:text-xl text-lg dark:text-slate-200 font-bold">
            {CurrencyServices.decimal(plan.amount)}
            {` Kz`}
            <b className="text-[0.9rem] ml-2  text-yellow-600 dark:text-yellow-500">
              {plan.is_trial ? (
                <CTranslateTo eng="for 5 days" pt="por 5 dias" />
              ) : (
                <CTranslateTo eng="for month" pt="por mês" />
              )}
            </b>
          </h1>
        </div>

        <div className="flex flex-col gap-1 border-t pt-4 border-slate-400/40 dark:border-slate-700/50">
          <h1 className="dark:text-white text-[0.95rem] font-bold">
            <CTranslateTo eng="Features:" pt="Recursos:" />
          </h1>
          <h1 className="dark:text-slate-400 text-slate-600 text-sm">
            <CTranslateTo
              eng="For this plan are included:"
              pt="Para este plano, estão incluídos:"
            />
          </h1>
          <div className="flex flex-col gap-2 ml-2 mt-2">
            {plan.features?.map((feature, i) => {
              return <SubsFeatureItem key={i} feature={feature} />;
            })}
          </div>
        </div>
      </div>
      <div className="w-full border-t pt-3 mt-3 border-slate-400/60 dark:border-slate-800">
        <AuSoftUI.UI.Button
          onClick={handleSubscribe}
          disabled={buttonDisabled ? true : false}
          className="w-full rounded-full pl-4 items-center font-bold"
          variant={buttonDisabled ? "outline" : "primary"}
        >
          <ReactIcons.HiIcon.HiOutlineArrowCircleUp size={15} />
          {!isExpired && samePlan && (
            <CTranslateTo eng="Your Current Plan" pt="Seu plano atual" />
          )}

          {currentSubscription && (
            <>
              {isExpired ? (
                <>
                  {!plan.is_trial && (
                    <CTranslateTo eng="Subscribe" pt="Assinar plano" />
                  )}

                  {userLogged?.is_trialed && plan.is_trial && (
                    <CTranslateTo
                      eng="Stage Test Done"
                      pt="Fase de testes concluída"
                    />
                  )}
                </>
              ) : (
                <>
                  {!userLogged?.is_trialed && !samePlan && (
                    <CTranslateTo
                      eng="Switch to this plan"
                      pt="Mudar para este plano"
                    />
                  )}

                  {userLogged?.is_trialed && !plan.is_trial && !samePlan && (
                    <CTranslateTo
                      eng="Switch to this plan"
                      pt="Mudar para este plano"
                    />
                  )}

                  {userLogged?.is_trialed && plan.is_trial && !samePlan && (
                    <CTranslateTo
                      eng="You have already used your trial plan."
                      pt="Já usou o seu plano de teste"
                    />
                  )}
                </>
              )}
            </>
          )}

          {!currentSubscription && (
            <CTranslateTo eng="Subscribe" pt="Assinar plano" />
          )}
        </AuSoftUI.UI.Button>
      </div>
    </div>
  );
}
