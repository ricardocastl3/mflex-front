"use client";

import { BaseBox } from "@/@components/(box)/BaseBox";
import { motion } from "framer-motion";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { FormProvider, useForm } from "react-hook-form";
import { internalApi, langByCookies } from "@/http/axios/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useRouter } from "next/navigation";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import AuthSchemas from "@/services/schemas/AuthSchemas";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import WebPushServices from "@/services/web-push/WebPushServices";

export default function ConfirmAccountPage() {
  // Context
  const { handleAddToastOnArray } = useAppProvider();
  const { fetchUserInformations, userLogged } = useAuth();

  const router = useRouter();

  // Controls
  const [wrongNumber, setWrongNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [isLoadingSendCode, setIsLoadingSendCode] = useState(false);
  const [sentConde, setSentCode] = useState(false);

  // Schema
  const schema = new AuthSchemas(langByCookies);
  type formData = z.infer<typeof schema.confirmCodeSchema>;

  const methods = useForm<formData>({
    resolver: zodResolver(schema.confirmCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  async function handleConfirmAccount(data: formData) {
    try {
      if (secondaryPhone.length != 9 && wrongNumber) {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Enter a valide mobile phone number",
          description_pt: "Informe um número válido",
          title_en: "Invalid Mobile Phone Number",
          title_pt: "Número de celular inválido",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmitting(true);
      await internalApi.post("/auth/confirm-account", {
        code: data.code,
        phone:
          secondaryPhone != ""
            ? secondaryPhone
            : userLogged?.profile?.phone_number,
      });

      if (LocalStorageServices.hasRedirectSubscriber()) {
        LocalStorageServices.removeRedirectSubscriber();
        await WebPushServices.register();
        setTimeout(() => {
          window.location.href = `/${langByCookies}`;
        }, 400);
        return;
      }

      await LocalStorageServices.checkRedirects();
      await fetchUserInformations();
      router.push(`/${langByCookies}/app`);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({
        err: err,
        openToast: handleAddToastOnArray,
      });
    }
  }

  async function handleReceiveCode(type: "primary" | "secondary") {
    try {
      if (secondaryPhone.length != 9 && type == "secondary") {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Enter a valid WhatsApp number",
          description_pt: "Informe um número do WhatsApp válido",
          title_en: "Invalid WhatsApp Number",
          title_pt: "Número do WhatsApp inválido",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsLoadingSendCode(true);

      await internalApi.post("/auth/resend-code-confirm", {
        phone:
          secondaryPhone != ""
            ? secondaryPhone
            : userLogged?.profile?.phone_number,
      });

      setSentCode(true);
      setIsLoadingSendCode(false);
    } catch (err) {
      setIsLoadingSendCode(false);

      return CAxiosErrorToastify({
        err: err,
        openToast: handleAddToastOnArray,
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 md:w-[40vw] w-[90vw]"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleConfirmAccount)}>
          <BaseBox className="h-fit w-full relative">
            <div className="md:px-5 px-4 py-4 flex flex-col gap-6 ">
              <div className="flex flex-col  justify-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h1 className="dark:text-white font-bold text-xl">
                    <CTranslateTo
                      eng="Confirm your account"
                      pt="Confirme a sua conta"
                    />
                  </h1>

                  <AuSoftUI.UI.Button
                    onClick={() => {
                      setWrongNumber((state) => !state);
                      if (wrongNumber) {
                        setSecondaryPhone("");
                      } else {
                        setSentCode(false);
                      }
                    }}
                    type="button"
                    size={"sm"}
                    className="w-fit font-bold items-center py-1"
                    variant={"outline"}
                  >
                    {!wrongNumber && (
                      <CTranslateTo eng="Wrong number" pt="Errei o número" />
                    )}
                    {wrongNumber && (
                      <CTranslateTo
                        eng="Use previous number"
                        pt="Usar número anterior"
                      />
                    )}
                    <ReactIcons.AiICon.AiOutlineUser size={16} />
                  </AuSoftUI.UI.Button>
                </div>
                <h4 className="text-[0.89rem]  text-slate-500 dark:text-slate-200">
                  <CTranslateTo
                    eng="We send the confirmation code on your phone number: "
                    pt="Enviamos um código de confirmação no seu número: "
                  />
                  <b>{userLogged?.profile?.phone_number}</b>
                </h4>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {wrongNumber && (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                      <div className="dark:text-white flex items-center gap-2">
                        <ReactIcons.AiICon.AiOutlineWhatsApp size={15} />
                        <h1 className="text-base ">
                          <CTranslateTo
                            eng="New WhatsApp number"
                            pt="Novo número do WhatsApp"
                          />
                        </h1>
                      </div>

                      {isLoadingSendCode && (
                        <h2 className="flex items-center gap-2 text-yellow-600 dark:text-yellow-300 animate-pulse">
                          <CTranslateTo eng="Sending" pt="Enviando" />
                          <ReactIcons.PiIcon.PiSpinner
                            className="animate-spin"
                            size={15}
                          />
                        </h2>
                      )}

                      {!isLoadingSendCode && sentConde && (
                        <h2 className="flex items-center gap-2 text-green-600 dark:text-green-300">
                          <CTranslateTo eng="Sent code" pt="Código enviado" />
                          <ReactIcons.AiICon.AiOutlineCheck />
                        </h2>
                      )}

                      {!isLoadingSendCode && !sentConde && (
                        <button
                          type="button"
                          onClick={() => handleReceiveCode("secondary")}
                          className="text-yellow-600 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-400"
                        >
                          <CTranslateTo eng="Send Code" pt="Enviar código" />
                        </button>
                      )}
                    </div>
                    <AuSoftUI.UI.TextField.Default
                      value={secondaryPhone}
                      onChange={(e) => setSecondaryPhone(e.target.value)}
                      placeholder={`${
                        langByCookies == "pt"
                          ? "Por favor, informe o seu whatsapp..."
                          : "Please, enter your whatsapp"
                      }`}
                      className="w-full"
                      requiredField={secondaryPhone.length < 9 ? true : false}
                      weight={"md"}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between">
                    <div className="dark:text-white flex items-center gap-2">
                      <ReactIcons.PiIcon.PiDotsThree size={20} />
                      <h1 className="text-base ">
                        <CTranslateTo eng="Code" pt="Código" />
                      </h1>
                    </div>
                    {!wrongNumber && (
                      <>
                        {isLoadingSendCode && (
                          <h2 className="flex items-center gap-2 text-yellow-600 dark:text-yellow-300 animate-pulse">
                            <CTranslateTo eng="Sending" pt="Enviando" />
                            <ReactIcons.PiIcon.PiSpinner
                              className="animate-spin"
                              size={15}
                            />
                          </h2>
                        )}

                        {!isLoadingSendCode && sentConde && (
                          <h2 className="flex items-center gap-2 text-green-600 dark:text-green-300">
                            <CTranslateTo eng="Sent code" pt="Código enviado" />
                            <ReactIcons.AiICon.AiOutlineCheck />
                          </h2>
                        )}

                        {!isLoadingSendCode && !sentConde && (
                          <button
                            type="button"
                            onClick={() => handleReceiveCode("primary")}
                            className="text-yellow-600 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-400"
                          >
                            <CTranslateTo
                              eng="Resend Code"
                              pt="Reenviar código"
                            />
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <AuSoftUI.UI.TextField.Default
                    {...register("code")}
                    className="w-full"
                    weight={"md"}
                    placeholder="Ex: 00545"
                    requiredField={errors.code?.message ? true : false}
                  />

                  {errors.code?.message && (
                    <AuSoftUI.Component.RequiredTextField
                      text={errors.code.message}
                      color="red"
                    />
                  )}
                </div>
                <div className="w-full mt-2">
                  <AuSoftUI.UI.Button
                    type="submit"
                    size={"md"}
                    className="w-full font-bold items-center"
                    variant={"primary"}
                  >
                    {!isSubmitting && (
                      <>
                        <CTranslateTo
                          eng="Confirm Account"
                          pt="Confirmar conta"
                        />
                        <ReactIcons.AiICon.AiOutlineArrowRight size={16} />
                      </>
                    )}
                    <AuSoftUI.Component.isFormSubmitting
                      isSubmitting={isSubmitting}
                    />
                  </AuSoftUI.UI.Button>
                </div>
              </div>
            </div>
            <ARegisterProgress rounded="all" isOpened={isSubmitting} />
          </BaseBox>
        </form>
      </FormProvider>
    </motion.div>
  );
}
