import { AuSoftUI } from "@/@components/(ausoft)";
import { useEffect, useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";
import { internalApi } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useSocketProvider } from "@/providers/auth/SocketProvider";
import { useModal } from "@/providers/app/ModalProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CurrencyServices from "@/services/CurrencyServices";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CircularProgress from "@/services/circular-progress";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function MulticaixaPayment() {
  // Contexts
  const { socketEvent } = useSocketProvider();

  const { handleAddToastOnArray } = useAppProvider();
  const {
    selectedCustomerBuyed,
    itemPriceIdCheckoutSelected,
    handleIsPurchased,
    isPurchased,
  } = useCheckoutProvider();
  const { userLogged } = useAuth();
  const { handleOpenModal } = useModal();

  const [alreadySent, setAlreadySent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [seconds, setSeconds] = useState(59);

  const [phoneNumber, setPhoneNumber] = useState(
    userLogged?.profile?.phone_number ? userLogged.profile.phone_number : "+244"
  );

  const details: { amount?: number; quantity?: number; price?: string } =
    itemPriceIdCheckoutSelected
      ? {
          amount: itemPriceIdCheckoutSelected.amount,
          price: itemPriceIdCheckoutSelected.price,
        }
      : {
          amount: selectedCustomerBuyed?.amount,
          price: selectedCustomerBuyed?.ticket_id,
          quantity: selectedCustomerBuyed?.quantity,
        };

  async function handleBuy() {
    try {
      setIsLoading(true);

      const url = itemPriceIdCheckoutSelected
        ? itemPriceIdCheckoutSelected.type == "subs"
          ? "subs"
          : itemPriceIdCheckoutSelected.type == "donations"
          ? "donations"
          : "tickets"
        : "tickets";

      const resp = await internalApi.post(`/payments/checkout/${url}`, {
        quantity: details.quantity,
        price: details.price,
        angolan_method: "multicaixa",
        payment_method: "angolan",
        phone_number: phoneNumber,
        amount: itemPriceIdCheckoutSelected?.amount || undefined,
        btag: LocalStorageServices.getAffiliateCode() || undefined,
        d: socketEvent?.user_id,
      });

      setAlreadySent(resp.data.d);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  useEffect(() => {
    if (alreadySent != "") {
      let count = 59;
      const interval = setInterval(async () => {
        count--;
        setSeconds(count);

        if (count <= 0 && !isPurchased) {
          clearInterval(interval);
          if (socketEvent?.name == "") {
            await internalApi.post("/payments/cg", {
              h: alreadySent,
            });
          }
          handleOpenModal("");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [alreadySent, isPurchased]);

  useEffect(() => {
    if (socketEvent?.name == "reference-pay") {
      handleIsPurchased(true);
      LocalStorageServices.checkRedirects();
    }
  }, [socketEvent]);

  return (
    <div className="flex flex-col md:items-start items-center gap-4 pb-4 pt-2">
      {!isLoading && !alreadySent && !isPurchased && (
        <div className="flex flex-col w-full md:items-start items-center py-4 px-5 gap-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-center flex-col gap-2 w-full">
            <h4 className="pb-1 pt-1.5 px-3 bg-orange-200/45 w-fit rounded-full dark:bg-orange-700/15 text-orange-800 dark:text-orange-400 text-[0.9rem] font-bold text-nowrap">
              <CTranslateTo eng="Money: " pt="Valor: " />{" "}
              {CurrencyServices.formatWithCurrencyValue(
                Number(details?.amount),
                "AOA"
              )}
            </h4>
            <h4 className="md:text-[0.9rem] text-[1.05rem] flex text-center gap-2 font-bold dark:text-white">
              <CTranslateTo
                pt="Confirme o seu número de celular"
                eng="Confirm your CellPhone"
              />
            </h4>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <AuSoftUI.UI.TextField.Default
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder="Ex: 945784638..."
              weight={"lg"}
              className="w-full text-center text-base"
            />
            <AuSoftUI.UI.Button
              onClick={() => handleBuy()}
              className="w-full text-center justify-center dark:focus:ring-orange-500 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-800 dark:bg-orange-700 font-bold"
              variant={"primary"}
              size={"lg"}
            >
              <CTranslateTo eng="Pay" pt="Realizar Pagamento" />
            </AuSoftUI.UI.Button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="animate-fade flex justify-center flex-col gap-4 items-center text-sm w-full py-8 dark:text-white text-slate-600">
          <ReactIcons.PiIcon.PiSpinner size={35} className="animate-spin" />
          <h4 className="text-[0.9rem]">
            <CTranslateTo
              eng="We are carrying out the operation..."
              pt="Estamos realizando a operação..."
            />
          </h4>
        </div>
      )}

      {!isLoading && isPurchased && (
        <div className="animate-fade flex flex-col w-full justify-center items-center gap-4 text-center md:px-12 px-8 py-8">
          <div className="p-3 rounded-full text-orange-600 bg-orange-200 dark:bg-orange-800/30 dark:text-orange-500">
            <ReactIcons.AiICon.AiOutlineCheck size={35} />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <h4 className="text-[1.2rem] font-bold text-orange-600 dark:text-orange-500">
              <CTranslateTo eng="Success!" pt="Sucesso!" />
            </h4>
            <h4 className="text-[0.9rem] dark:text-slate-300 text-slate-600">
              <CTranslateTo
                eng="Congratulations, your payment was successful!"
                pt="Parabéns seu pagamento foi realizado com sucesso!"
              />
            </h4>
          </div>
        </div>
      )}

      {!isLoading && alreadySent != "" && !isPurchased && (
        <div className="md:py-8 py-4 flex justify-center flex-col gap-4 items-center w-full md:px-8 px-4">
          <div className="md:w-[15vw] w-[20vw]">
            <CircularProgress percentage={seconds} />
          </div>
          <div>
            <h4 className="text-base dark:text-white text-slate-600 text-center">
              <CTranslateTo
                eng="Make your payment, using your multicaixa express app"
                pt="Realize o seu pagamento, usando o aplicativo multicaixa express"
              />
            </h4>
          </div>
        </div>
      )}

      {alreadySent == "" && !isPurchased && (
        <div className="flex flex-col md:items-start items-center px-4 gap-2 w-full">
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/35 w-full">
            <h4 className="md:text-[0.9rem] text-base font-bold dark:text-white">
              <CTranslateTo pt="Observação" eng="Observation" />
            </h4>
            <h4 className="md:text-[0.9rem] text-sm  dark:text-slate-300">
              <CTranslateTo
                pt="O número de celular, precisa ser o mesmo registrado no seu aplicativo Multicaixa Express 🚀"
                eng="The cell phone number must be the same as the one registered in your Multicaixa Express application 🚀"
              />
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}
