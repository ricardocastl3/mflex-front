import { ReactIcons } from "@/utils/icons";
import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useCallback, useEffect, useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useProductProvider } from "@/providers/features/ProductProvider";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";

import CurrencyServices from "@/services/CurrencyServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function TransferencePayment() {
  // Contexts
  const { handleAddToastOnArray } = useAppProvider();
  const { selectedProduct } = useProductProvider();
  const { selectedCustomerBuyed, itemPriceIdCheckoutSelected } =
    useCheckoutProvider();

  const [angolanDetail, setAngolanDetail] = useState<{
    iban: string;
    owner: string;
    bank: string;
    phone: string;
  }>({ owner: "", phone: "", iban: "", bank: "" });

  //Controls
  const [isLoading, setIsLoading] = useState(true);

  const handleGetRef = useCallback(async () => {
    try {
      const resp = await internalApi.post(`/payments/checkout/products`, {
        price: selectedProduct ? selectedProduct.id : undefined,
        subs: itemPriceIdCheckoutSelected
          ? itemPriceIdCheckoutSelected.price
          : undefined,
        angolan_method: "transference",
        payment_method: "angolan",
        customer: selectedCustomerBuyed?.customer,
        order_bumps: selectedCustomerBuyed?.order_bumbs,
        customer_email: selectedCustomerBuyed?.email,
        phone_number: selectedCustomerBuyed?.phone,
      });

      setAngolanDetail({
        owner: resp.data.owner,
        iban: resp.data.iban,
        phone: resp.data.phone,
        bank: resp.data.bank,
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
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
              <h4 className="pb-1 pt-1.5 px-3 cursor-pointer hover:bg-violet-200 hover:dark:bg-violet-950 bg-violet-200/45 md:w-fit w-full rounded-full dark:bg-violet-700/15 text-violet-800 dark:text-violet-400 text-[0.9rem] font-bold text-nowrap">
                <CTranslateTo eng="Owner: " pt="Titular da conta: " />{" "}
                {angolanDetail.owner}
              </h4>

              <AuSoftUI.Component.Clipboard
                body={
                  <h4 className="pb-1 pt-1.5 px-3 cursor-pointer hover:bg-violet-200 hover:dark:bg-violet-950 bg-violet-200/45 md:w-fit w-full rounded-full dark:bg-violet-700/15 text-violet-800 dark:text-violet-400 text-[0.9rem] font-bold text-nowrap">
                    <CTranslateTo eng="IBAN: " pt="IBAN: " />{" "}
                    {angolanDetail.iban}
                  </h4>
                }
                title_en="Copied IBAN"
                title_pt="IBAN Copiado"
                text={angolanDetail.iban}
              />
              <h4 className="pb-1 pt-1.5 px-3 bg-green-200/45 md:w-fit w-full rounded-full dark:bg-green-700/15 text-green-800 dark:text-green-400 text-[0.9rem] font-bold text-nowrap">
                <CTranslateTo eng="Money: " pt="Valor: " />
                {CurrencyServices.formatWithCurrencyValue(
                  Number(selectedCustomerBuyed?.amount),
                  "AOA"
                )}
              </h4>
              <h4 className="pb-1 pt-1.5 px-3 cursor-pointer hover:bg-violet-200 hover:dark:bg-violet-950 bg-violet-200/45 md:w-fit w-full rounded-full dark:bg-violet-700/15 text-violet-800 dark:text-violet-400 text-[0.9rem] font-bold text-nowrap">
                <CTranslateTo eng="Bank: " pt="Banco: " /> {angolanDetail.bank}
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
                  pt={`Efetue o pagamento e envie o comprovante para o WhatsApp: ${angolanDetail.phone} 🚀`}
                  eng={`Make the payment and send the receipt to WhatsApp: ${angolanDetail.phone} 🚀`}
                />
              </h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
