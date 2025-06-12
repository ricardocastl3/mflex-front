import { ReactIcons } from "@/utils/icons";
import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useCallback, useEffect, useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";

import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useSocketProvider } from "@/providers/auth/SocketProvider";
import { useModal } from "@/providers/app/ModalProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CurrencyServices from "@/services/CurrencyServices";
import CircularProgress from "@/services/circular-progress";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function PayPayPayment() {
  // Contexts
  const { handleAddToastOnArray } = useAppProvider();
  const { socketEvent } = useSocketProvider();
  const {
    selectedCustomerBuyed,
    handleIsPurchased,
    isPurchased,
    itemPriceIdCheckoutSelected,
  } = useCheckoutProvider();

  const { handleOpenModal } = useModal();

  const [alreadyPay, setAlreadyPay] = useState(false);
  const [alreadySentRequest, setAlreadySentRequest] = useState("");
  const [seconds, setSeconds] = useState(59);

  const [angolanDetail, setAngolanDetail] = useState<{
    link: string;
  }>({ link: process.env.MFLEX_NEXT_PUBLIC_URL });

  //Controls
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenPayPay, setIsOpenPayPay] = useState(false);

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

  const handleGetRef = useCallback(async () => {
    try {
      const url =
        itemPriceIdCheckoutSelected &&
        (itemPriceIdCheckoutSelected.type == "subs"
          ? "subs"
          : itemPriceIdCheckoutSelected.type == "donations"
          ? "donations"
          : "tickets");

      const resp = await internalApi.post(`/payments/checkout/${url}`, {
        price: details?.price,
        quantity: details?.quantity,
        angolan_method: "paypay",
        payment_method: "angolan",
        amount: itemPriceIdCheckoutSelected?.amount || undefined,
        d: socketEvent?.metadata,
        btag: LocalStorageServices.getAffiliateCode() || undefined,
      });

      setAlreadySentRequest(resp.data.d);
      setAngolanDetail({ link: resp.data.link });
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

  useEffect(() => {
    if (alreadySentRequest != "") {
      let count = 59;
      const interval = setInterval(async () => {
        count--;
        setSeconds(count);

        if (count <= 0 && !isPurchased) {
          clearInterval(interval);
          if (socketEvent?.name == "") {
            await internalApi.post("/payments/cg", {
              h: alreadySentRequest,
            });
          }
          handleOpenModal("");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [alreadySentRequest]);

  useEffect(() => {
    if (socketEvent?.name == "reference-pay") {
      handleIsPurchased(true);
      LocalStorageServices.checkRedirects();
    }
  }, [socketEvent]);

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

      {!isLoading &&
        !alreadyPay &&
        alreadySentRequest != "" &&
        !isPurchased && (
          <>
            <div className="flex flex-col px-4 gap-2 w-full h-[60vh] overflow-y-auto">
              {!isLoading && alreadySentRequest && (
                <div className="md:py-8 py-4 flex justify-center flex-col gap-4 items-center w-full md:px-8 px-4">
                  <div className="md:w-[15vw] w-[20vw]">
                    <CircularProgress percentage={seconds} />
                  </div>
                  <div>
                    <h4 className="text-sm dark:text-white text-slate-600 text-center">
                      <CTranslateTo
                        eng="Make your payment using the paypay app, see the instructions below:"
                        pt="Realize o seu pagamento, usando o aplicativo paypay, vê as instruções abaixo: "
                      />
                    </h4>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-4 p-4 rounded-lg  w-full">
                <div className="w-full justify-center flex-col flex h-full mt-4">
                  <div className="rounded-full flex justify-center relative w-full h-full">
                    <div className="bg-white rounded-xl p-1">
                      <AuSoftUI.Component.QRcode
                        url={`${angolanDetail.link}`}
                        size={190}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full items-center justify-center text-center">
                  <h4 className="pb-1 pt-1.5 px-3 bg-green-200/45 md:w-fit w-full rounded-full dark:bg-green-700/15 text-green-800 dark:text-green-400 text-[0.9rem] font-bold text-nowrap">
                    <CTranslateTo eng="Money: " pt="Valor: " />{" "}
                    {CurrencyServices.formatWithCurrencyValue(
                      Number(details?.amount),
                      "AOA"
                    )}
                  </h4>
                  <h4 className="dark:text-white text-lg font-bold">
                    <CTranslateTo
                      eng="Pay using QRCode 👇"
                      pt="Pague usando QRCode 👇"
                    />
                  </h4>

                  <h4 className="text-[1rem] text-violet-800 dark:text-violet-400">
                    <CTranslateTo
                      eng="Open your PayPay application, click on the `Scan` button, and read the QRcode below:"
                      pt="Abra o seu aplicativo da PayPay, clique no botão `Scanear`, e leia o QRcode acima:"
                    />
                  </h4>
                </div>
                {window.innerWidth <= 765 && (
                  <div className="w-full flex justify-center">
                    <AuSoftUI.UI.Button
                      onClick={() => {
                        setIsOpenPayPay(true);
                        window.location.href = `${angolanDetail.link}`;
                      }}
                      className="rounded-full px-4"
                      variant={"primary"}
                      disabled={isOpenPayPay}
                    >
                      {!isOpenPayPay && (
                        <CTranslateTo
                          eng="Pay using PayPay Application"
                          pt="Pagar usando a PayPay no meu celular"
                        />
                      )}

                      <AuSoftUI.Component.isFormSubmitting
                        isSubmitting={isOpenPayPay}
                      />
                    </AuSoftUI.UI.Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

      {!isLoading && isPurchased && (
        <div className="animate-fade flex flex-col w-full justify-center items-center gap-4 text-center md:px-12 px-8 py-8">
          <div className="p-3 rounded-full text-violet-600 bg-violet-200 dark:bg-violet-800/30 dark:text-violet-500">
            <ReactIcons.AiICon.AiOutlineCheck size={35} />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <h4 className="text-[1.2rem] font-bold text-violet-600 dark:text-violet-500">
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
    </div>
  );
}
