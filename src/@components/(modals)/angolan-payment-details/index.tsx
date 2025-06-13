import { useModal } from "@/providers/app/ModalProvider";
import { localImages } from "@/utils/images";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { langByCookies } from "@/http/axios/api";
import { useRouter, useSearchParams } from "next/navigation";

import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Image from "next/image";
import ReferencePayment from "./reference";
import MulticaixaPayment from "./multicaixa";
import PayPayPayment from "./paypay";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function AngolanPaymentDetailsModal() {
  //Contexts
  const { handleOpenModal } = useModal();
  const {
    selectedAngolanMethod,
    handleAddItemOnCheckout,
    selectedCheckoutTicket,
    handlePriceAmountSelected,
    itemPriceIdCheckoutSelected,
    isPurchased,
  } = useCheckoutProvider();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleCloseModal() {
    setIsLoading(true);
    handleAddItemOnCheckout(undefined);
    handlePriceAmountSelected(undefined);

    if (searchParams.has("sb")) router.push(`/${langByCookies}/pricing#start`);

    if (!isPurchased) handleOpenModal("");

    if (isPurchased) {
      if (selectedCheckoutTicket) {
        window.location.href = "/" + langByCookies + "/app/tickets";
        return;
      }

      if (!itemPriceIdCheckoutSelected) {
        handleOpenModal("");
        setIsLoading(false);
        return;
      }

      if (itemPriceIdCheckoutSelected.type == "donations") {
        handleOpenModal("art-gracefull-donate");
        return;
      }

      if (itemPriceIdCheckoutSelected.type == "subs") {
        if (selectedAngolanMethod != "reference") {
          if (LocalStorageServices.getWatchID()) {
            LocalStorageServices.redirectWatchTv();
            return;
          } else if (LocalStorageServices.getWatchMovieID()) {
            LocalStorageServices.redirectWatchMovie();
            return;
          } else if (LocalStorageServices.getFootballAITeam()) {
            LocalStorageServices.redirectFootballAITeam();
            return;
          } else if (LocalStorageServices.getAffiliateCode()) {
            LocalStorageServices.resetAllKeys();
          } else {
            window.location.href = "/" + langByCookies + "/artist";
            return;
          }
        }

        handleOpenModal("");
      }
    }
    setIsLoading(false);
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
