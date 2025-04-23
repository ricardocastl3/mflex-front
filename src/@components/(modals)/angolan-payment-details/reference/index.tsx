import { ReactIcons } from "@/utils/icons";
import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useCallback, useEffect, useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useModal } from "@/providers/app/ModalProvider";

import CurrencyServices from "@/services/CurrencyServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function ReferencePayment() {
  // Contexts
  const { handleOpenModal } = useModal();
  const { handleAddToastOnArray } = useAppProvider();
  const { selectedCustomerBuyed } = useCheckoutProvider();

  const [angolanDetail, setAngolanDetail] = useState<{
    reference: string;
    entity: string;
  }>({ entity: "", reference: "" });

  //Controls
  const [isLoading, setIsLoading] = useState(true);

  const handleGetRef = useCallback(async () => {
    try {
      const resp = await internalApi.post(`/payments/checkout/tickets`, {
        quantity: selectedCustomerBuyed?.quantity,
        price: selectedCustomerBuyed?.ticket_id,
        angolan_method: "reference",
        payment_method: "angolan",
      });
      setAngolanDetail({
        entity: resp.data.entity,
        reference: resp.data.reference,
      });
      setIsLoading(false);
    } catch (err) {
      CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
      handleOpenModal("angolan-payment-modal");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetRef();
  }, []);

  return (
    <div className="flex flex-col md:items-start items-center gap-4 pb-4">
      {isLoading && (
        <div className="animate-fade flex justify-center flex-col gap-4 items-center text-sm w-full py-12 dark:text-white text-slate-600">
          <ReactIcons.PiIcon.PiSpinner size={35} className="animate-spin" />
          <h4 className="text-[0.9rem]">
            <CTranslateTo
              eng="We are carrying out the operation..."
              pt="Estamos realizando a operação..."
            />
          </h4>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex flex-col w-full items-start py-4 px-4 gap-2 border-b border-slate-200 dark:border-slate-800">
            <h4 className="md:text-[0.9rem] text-[1.1rem] flex  gap-2 font-bold dark:text-white">
              <ReactIcons.PiIcon.PiShoppingCart size={15} className="mb-0.5" />
              <CTranslateTo pt="Produto" eng="Product" />
            </h4>
            <div className="flex flex-wrap items-center justify-between gap-2 w-full">
              <AuSoftUI.Component.Clipboard
                body={
                  <h4 className="pb-1 pt-1.5 px-3 cursor-pointer hover:bg-yellow-200 hover:dark:bg-yellow-950 bg-yellow-200/45 md:w-fit w-full rounded-full dark:bg-yellow-700/15 text-yellow-800 dark:text-yellow-400 text-[0.9rem] font-bold text-nowrap">
                    <CTranslateTo eng="Entity: " pt="Entidade: " />{" "}
                    {angolanDetail.entity}
                  </h4>
                }
                title_en="Copied Entity"
                title_pt="Entidade Copiada"
                text={angolanDetail.entity}
              />
              <AuSoftUI.Component.Clipboard
                body={
                  <h4 className="pb-1 pt-1.5 px-3 cursor-pointer hover:bg-yellow-200 hover:dark:bg-yellow-950 bg-yellow-200/45 md:w-fit w-full rounded-full dark:bg-yellow-700/15 text-yellow-800 dark:text-yellow-400 text-[0.9rem] font-bold text-nowrap">
                    <CTranslateTo eng="Reference: " pt="Referência: " />{" "}
                    {angolanDetail.reference}
                  </h4>
                }
                title_en="Copied Referece"
                title_pt="Referência Copiada"
                text={angolanDetail.reference}
              />
              <h4 className="pb-1 pt-1.5 px-3 bg-green-200/45 md:w-fit w-full rounded-full dark:bg-green-700/15 text-green-800 dark:text-green-400 text-[0.9rem] font-bold text-nowrap">
                <CTranslateTo eng="Money: " pt="Valor: " />
                {CurrencyServices.formatWithCurrencyValue(
                  Number(selectedCustomerBuyed?.amount),
                  "AOA"
                )}
              </h4>
            </div>
          </div>
          <div className="flex flex-col md:items-start items-center px-4 gap-2 w-full">
            <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/35 w-full">
              <h4 className="md:text-[0.9rem] text-base font-bold dark:text-white">
                <CTranslateTo pt="Como pagar ?" eng="How to pay?" />
              </h4>
              <h4 className="md:text-[0.9rem] text-sm dark:text-slate-300">
                <CTranslateTo
                  pt="No Multicaixa Express ou no ATM, selecione a opção: Pagamentos, em seguida, Pagamento por Referência, feito isso, insira as informações que estão cima, sobre, a entidade, referência e valor 🚀"
                  eng="At Multicaixa Express or ATM, select the option: Payments, then Payment by Reference, once this is done, enter the information above, about, the entity, reference and money 🚀"
                />
              </h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
