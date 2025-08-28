import { useModal } from "@/providers/app/ModalProvider";
import { useEffect, useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";

import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PaymentCard from "./components/payment-card";

export default function AngolanPaymentModal() {
  // Contexts
  const { handleOpenModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);
  const {
    selectedAngolanMethod,
    handleAddItemOnCheckout,
    handlePriceAmountSelected,
    handleSelectAngolanMethod,
    handleIsPurchased,
  } = useCheckoutProvider();

  function handleClose() {
    handleAddItemOnCheckout(undefined);
    handlePriceAmountSelected(undefined);
    handleOpenModal("");
  }

  useEffect(() => {
    handleSelectAngolanMethod("reference");
    handleIsPurchased(false);
  }, []);

  return (
    <BaseModal callbackClose={handleClose}>
      <div className="md:w-[50vw] w-[90vw]">
        <div className="p-4 border-b pb-2 border-slate-300 dark:border-slate-800 flex items-center gap-2">
          <AuSoftUI.Component.AuSoftLogo size={36} style="mb-1" />
          <h3 className="text-md font-bold dark:text-white">
            <CTranslateTo
              pt="Como deseja pagar?"
              eng="How do you want to pay?"
            />
          </h3>
        </div>
        <div className="py-6 grid md:grid-cols-3 grid-cols-1 gap-4 px-4">
          <PaymentCard
            active={true}
            isLoading={isLoading}
            isSelected={selectedAngolanMethod == "reference" ? true : false}
            method="reference"
            title_en="Reference Payment"
            title_pt="Pagamento por Referência"
          />
          <PaymentCard
            active={false}
            isLoading={isLoading}
            isSelected={selectedAngolanMethod == "express" ? true : false}
            method="express"
            title_en="MultiCaixa Express"
            title_pt="MultiCaixa Express"
          />
          <PaymentCard
            active={true}
            isLoading={isLoading}
            isSelected={selectedAngolanMethod == "paypay" ? true : false}
            method="paypay"
            title_en="PayPay"
            title_pt="PayPay"
          />
        </div>
        <div className="p-4 border-t flex items-center md:flex-row flex-col-reverse gap-4 border-slate-300 dark:border-slate-800">
          <AuSoftUI.UI.Button
            disabled={isLoading}
            onClick={handleClose}
            className="rounded-full w-full justify-center"
            variant={"outline"}
          >
            <CTranslateTo pt="Cancelar" eng="Cancel" />
          </AuSoftUI.UI.Button>

          <AuSoftUI.UI.Button
            disabled={isLoading}
            onClick={() => handleOpenModal("angolan-details")}
            className="rounded-full w-full justify-center"
            variant={"primary"}
          >
            <CTranslateTo pt="Confirmar" eng="Confirm" />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </BaseModal>
  );
}
