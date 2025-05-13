import { IPlan } from "@/http/interfaces/models/IPlan";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useRouter } from "next/navigation";
import { langByCookies } from "@/http/axios/api";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useModal } from "@/providers/app/ModalProvider";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import CurrencyServices from "@/services/CurrencyServices";

export default function SubsCard({ plan }: { plan: IPlan }) {
  const { currentSubscription, userLogged } = useAuth();

  const { handleAddToastOnArray } = useAppProvider();
  const { handleOpenModal } = useModal();
  const { handleAddItemOnCheckout } = useCheckoutProvider();

  const router = useRouter();

  function handleSubscribe() {
    try {
      if (!userLogged) {
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
    <div className="flex flex-col gap-4 justify-between border border-yellow-600 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold dark:text-white">{plan.name}</h1>
          <h1 className="text-base dark:text-slate-200 font-bold">
            {CurrencyServices.decimal(plan.amount)}
            {"Kz"}
          </h1>
        </div>

        <div>
          {plan.features?.map((feature, i) => {
            return (
              <div key={i} className="flex items-center gap-4">
                <h1 className="text-base dark:text-slate-200">
                  {feature.name}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-2 w-full">
        <AuSoftUI.UI.Button
          onClick={handleSubscribe}
          className="w-full"
          variant={"primary"}
        >
          <CTranslateTo eng="Subscribe" pt="Subscrever" />
        </AuSoftUI.UI.Button>
      </div>
    </div>
  );
}
