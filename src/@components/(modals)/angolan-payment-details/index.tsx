import { useModal } from "@/providers/app/ModalProvider";
import { localImages } from "@/utils/images";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { useRouter } from "next/navigation";
import { langByCookies } from "@/http/axios/api";

import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Image from "next/image";
import ReferencePayment from "./reference";
import MulticaixaPayment from "./multicaixa";
import PayPayPayment from "./paypay";
import TransferencePayment from "./transference";

export default function AngolanPaymentDetailsModal() {
  //Contexts
  const { handleOpenModal } = useModal();
  const { selectedAngolanMethod, isPurchased } = useCheckoutProvider();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleCloseModal() {
    /*
    router.push(
      `/${langByCookies}/payments?tab=${
        itemPriceIdCheckoutSelected?.type == "others"
          ? "others"
          : itemPriceIdCheckoutSelected?.type == "packs"
          ? "ausoft-coins"
          : "subscriptions"
      }
    );*/

    if (selectedAngolanMethod != "reference" && !isPurchased)
      handleOpenModal("");

    if (selectedAngolanMethod == "reference" || isPurchased)
      window.location.href = "/" + langByCookies + "/purchase";
  }

  return (
    <BaseModal callbackClose={() => handleCloseModal()} customDesktop="pb-2">
      <div className="md:w-[40vw] w-[90vw]">
        <div className="p-4 border-b pb-2 border-slate-300 dark:border-slate-800 flex items-center gap-4">
          <Image
            src={
              selectedAngolanMethod == "reference"
                ? localImages.logos.multicaixaReference
                : selectedAngolanMethod == "paypay"
                ? localImages.logos.paypayLogo
                : localImages.logos.multicaixaExpress
            }
            height={35}
            width={35}
            alt="ícone de pagamento do meio"
            className="rounded-lg"
          />
          <h3 className="text-md font-bold dark:text-white">
            <CTranslateTo pt="Detalhes do Pagamento" eng="Payment Details" />
          </h3>
        </div>

        <div
          className={`${
            selectedAngolanMethod == "express" ? "h-[60vh] overflow-y-auto" : ""
          } w-full h-full`}
        >
          {selectedAngolanMethod == "reference" && <ReferencePayment />}

          {selectedAngolanMethod == "express" && <MulticaixaPayment />}

          {selectedAngolanMethod == "paypay" && <PayPayPayment />}
        </div>

        <div className="p-4 border-t border-slate-300 dark:border-slate-800">
          <AuSoftUI.UI.Button
            onClick={() => handleCloseModal()}
            className="rounded-full w-full justify-center"
            variant={"primary"}
            disabled={isLoading}
          >
            {isLoading && (
              <ReactIcons.PiIcon.PiSpinner size={18} className="animate-spin" />
            )}

            {!isLoading && <CTranslateTo pt="Fechar" eng="Close" />}
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </BaseModal>
  );
}
