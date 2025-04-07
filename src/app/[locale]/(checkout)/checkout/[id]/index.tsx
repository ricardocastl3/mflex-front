"use client";

import { internalApi, langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import { use, useCallback, useEffect, useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { useTicketProvider } from "@/providers/features/TicketProvider";
import { ITicket } from "@/http/interfaces/models/ITicket";

import LogoSpinner from "@/app/onload-pages/spinner/LogoSpinner";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import COpenToastyWithTranslation from "@/@components/(tips)/CToastify/COpenToastyWithTranslation";

export default function CheckOut({ params }: { params:Promise<{ id: string }>}) {

  const pars = use(params)
  // Contexts
  const { selectedAngolanMethod, handleSelectCustomerBuyed } =
    useCheckoutProvider();
  const { handleSelectTicket, selectedTicket } = useTicketProvider();
  const { handleAddToastOnArray } = useAppProvider();
  const { isLoadingUserData } = useAuth();

  const { handleOpenModal } = useModal();

  // Controls

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoaging] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+244");

  const [totalPay, setTotalPay] = useState(0);

  const fetchProduct = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        success: boolean;
        tickets: ITicket;
      }>("/products/checkout", {
        params: {
          id: await pars.id,
        },
      });

      if (!resp.data.success) {
        window.location.href = "/" + langByCookies;
        return;
      }

      handleSelectTicket(resp.data.tickets);
      setIsLoaging(false);
    } catch (err) {
      window.location.href = "/" + langByCookies;
    }
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function handleBuy() {
    try {
      if (phoneNumber.length < 9) {
        AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Enter a valid cellphone",
          description_pt: "Informe um número de celular válido",
          title_en: "Invalid Cellphone",
          title_pt: "Número de celular inválido",
          toast: handleAddToastOnArray,
          type: "error",
        });
        return;
      }

      if (!phoneNumber.startsWith("+244")) {
        AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Enter a valid cellphone in Angola",
          description_pt: "Informe um número de celular válido em Angola",
          title_en: "Only Angolan Number",
          title_pt: "Apenas números angolano",
          toast: handleAddToastOnArray,
          type: "error",
        });
        return;
      }

      if (customerEmail.length < 5) {
        return COpenToastyWithTranslation({
          description_pt: "Por favor, informe um email válido",
          description_en: "Please, enter your valid email",
          title_pt: "Email em falta",
          title_en: "Email is missing",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      if (customerName.length < 2) {
        return COpenToastyWithTranslation({
          description_pt: "Por favor, informe o seu nome",
          description_en: "Please, enter your name",
          title_pt: "Nome completo em falta",
          title_en: "Fullname is missing",

          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      handleSelectCustomerBuyed({
        customer: customerName,
        phone: phoneNumber,
        email: customerEmail,
        amount: totalPay,
      });
      handleOpenModal("angolan-details");

      setIsSubmitting(false);
    } catch (err) {
      return CAxiosErrorToastify({ openToast: handleAddToastOnArray, err });
    }
  }

  if (isLoading || isLoadingUserData) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LogoSpinner />
      </div>
    );
  }

  /*
  if (selectedTicket)
    return (
      <div
        style={{
          background: selectedTicket.background,
        }}
        className="flex flex-col justify-center md:px-0 px-4 md:items-center items-stretch w-full h-full md:pt-16 pt-2 md:pb-12 pb-8"
      >
        {selectedTicket.image_top && selectedTicket.image_top != "" && (
          <div
            style={{
              height: window.innerWidth < 765 ? "13vh" : "200px",
              width:
                window.innerWidth < 765
                  ? "100%"
                  : !selectedTicket.image_right ||
                    selectedTicket.image_right == ""
                  ? "640px"
                  : "850px",
              objectFit: "fill",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${selectedTicket.image_top})`,
            }}
            className="mt-3 bg-slate-300 dark:bg-slate-800 rounded-xl "
          ></div>
        )}
        <div className="flex gap-2 md:flex-row flex-col mt-4">
          <BaseBox className="md:w-[640px] w-full flex flex-col p-6 mx-0">
            <div className="mt-4 flex md:px-4 px-0 md:items-start items-start gap-8 md:flex-row flex-col">
              <div className="md:px-0 px-4 md:w-fit w-full h-full">
                <div
                  style={{
                    height: window.innerWidth < 765 ? "200px" : "150px",
                    width: window.innerWidth < 765 ? "100%" : "150px",
                    scale: 1.18,
                    objectFit: "cover",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundImage: `url(${selectedTicket.image_url})`,
                  }}
                  className="rounded-xl bg-slate-300 dark:bg-slate-800"
                ></div>
              </div>

              <div className="flex flex-col gap-2 ">
                <h4 className="text-xl font-bold text-blue-600 dak:text-blue-500">
                  {selectedTicket.title}
                </h4>
                <h4 className="text-base font-bold text-blue-600 dak:text-blue-500">
                  {`${CurrencyServices.decimal(
                    Number(selectedTicket.ao_amount)
                  )} Kz`}
                </h4>
                <h4 className="text-sm text-slate-600 dak:text-slate-500 text-wrap">
                  {selectedTicket.description}
                </h4>
              </div>
            </div>
            <div className="flex flex-col md:mt-8 mt-4 border-t border-slate-300 dark:border-slate-700/50">
              <div className="border-b border-slate-300 dark:border-slate-800 py-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold dark:text-white">
                    <CTranslateTo eng="Email" pt="Nome completo" />
                  </h3>
                  <AuSoftUI.UI.TextField.Default
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    requiredField={customerName.length < 5 ? true : false}
                    className="w-full"
                    placeholder={"Albert Jonh"}
                  />
                  {customerName.length < 5 && (
                    <AuSoftUI.Component.RequiredTextField
                      text={
                        langByCookies == "pt"
                          ? "Informe o seu nome"
                          : "Enter your name"
                      }
                      color="red"
                    />
                  )}
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-2">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold dark:text-white">
                      <CTranslateTo eng="Email" pt="Email" />
                    </h3>
                    <AuSoftUI.UI.TextField.Default
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      requiredField={customerEmail.length < 5 ? true : false}
                      className="w-full"
                      placeholder={"Ex: john@gmail.com"}
                    />
                    {customerEmail.length < 5 && (
                      <AuSoftUI.Component.RequiredTextField
                        text={
                          langByCookies == "pt"
                            ? "Informe o seu email"
                            : "Enter your email"
                        }
                        color="red"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold dark:text-white">
                      <CTranslateTo eng="CellPhone" pt="Número de celular" />
                    </h3>
                    <AuSoftUI.UI.TextField.Phone
                      setValue={setPhoneNumber}
                      value={phoneNumber}
                    />
                    {phoneNumber.length < 5 && (
                      <AuSoftUI.Component.RequiredTextField
                        text={
                          langByCookies == "pt"
                            ? "Informe o seu número de celular"
                            : "Enter your cellphone"
                        }
                        color="red"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="py-6 grid md:grid-cols-4 grid-cols-1 gap-4 md:px-2 px-0">
                <PaymentCard
                  active={true}
                  isLoading={isLoading}
                  isSelected={selectedAngolanMethod == "express" ? true : false}
                  method="express"
                  title_en="MultiCaixa Express"
                  title_pt="MultiCaixa Express"
                />

                <PaymentCard
                  active={true}
                  isLoading={isLoading}
                  isSelected={
                    selectedAngolanMethod == "reference" ? true : false
                  }
                  method="reference"
                  title_en="Reference Payment"
                  title_pt="Pagamento por Referência"
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
            </div>

            <div className="flex flex-col mt-4 md:px-4 px-1 md:pt-2 pt-4 border-t border-slate-300 dark:border-slate-700/50">
              <AuSoftUI.UI.Button
                onClick={() => handleBuy()}
                className="w-full justify-center"
                variant={"primary"}
              >
                {!isSubmitting && (
                  <>
                    <CTranslateTo eng="Buy " pt="Pagar " />
                    {`(${CurrencyServices.decimal(totalPay)} Kz)`}
                  </>
                )}
                {isSubmitting && (
                  <AuSoftUI.Component.isFormSubmitting
                    isSubmitting={isSubmitting}
                  />
                )}
              </AuSoftUI.UI.Button>
            </div>
            <div className="flex items-center flex-col w-full gap-4 mt-8 mb-4 text-center text-sm">
              <Image
                src={localImages.logos.mflex}
                height={80}
                width={80}
                alt="Logo da Marca Flex"
              />
              <div className="md:w-[35vw] w-[80vw]">
                <h4 className="leading-6">
                  <CTranslateTo
                    eng="By clicking the `Buy` button, you automatically agree to our"
                    pt="Ao clicar no botão `Comprar`, você concorda automaticamente com os nossos"
                  />
                  <b>
                    <Link
                      href={"#"}
                      className="text-blue-500 dark:text-blue-500 ml-2"
                    >
                      <CTranslateTo
                        eng="Terms and Conditions"
                        pt="Termos & Condições"
                      />
                    </Link>
                  </b>
                </h4>
              </div>
            </div>
          </BaseBox>

          {selectedTicket.image_right && selectedTicket.image_right != "" && (
            <div
              style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${selectedTicket.image_right})`,
                height:
                  window.innerWidth < 765
                    ? "10vh"
                    : !selectedTicket.image_right ||
                      selectedTicket.image_right == ""
                    ? "810px"
                    : "750px",
                width: window.innerWidth < 765 ? "100%" : "200px",
              }}
              className="rounded-xl bg-slate-300 dark:bg-slate-800 md:flex hidden"
            ></div>
          )}
        </div>
      </div>
    );*/
}
