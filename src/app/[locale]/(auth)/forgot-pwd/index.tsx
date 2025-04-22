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

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import RecoverPwdSchema from "@/services/schemas/RecoveryPwdSchema";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";

export default function SignInPage() {
  // Context
  const { handleAddToastOnArray } = useAppProvider();
  const { fetchUserInformations, userLogged } = useAuth();

  // Controls
  const [sentConde, setSentCode] = useState(false);
  const [isLoadingSendCode, setIsLoadingSendCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondaryPhone, setSecondaryPhone] = useState(
    userLogged && userLogged.profile ? userLogged.profile?.phone_number : ""
  );

  // Schema
  const schema = new RecoverPwdSchema(langByCookies);
  type formData = z.infer<typeof schema.recoverPwdSchema>;

  const methods = useForm<formData>({
    resolver: zodResolver(schema.recoverPwdSchema),
    defaultValues: {
      password: "",
      code: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  async function handleRecovery(data: formData) {
    try {
      if (secondaryPhone.length != 9) {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Enter a valid mobile phone number",
          description_pt: "Informe um número do WhatsApp válido",
          title_en: "Invalid WhatsApp Number",
          title_pt: "Número do WhatsApp inválido",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      if (!data.code || (data.code && data.code.length <= 0)) {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Click on send code button, if you don't click after",
          description_pt:
            "Clique no botão enviar código, se você não clicou antes",
          title_en: "Invalid Code",
          title_pt: "Código inválido",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmitting(true);

      await internalApi.post("/auth/reset-pwd", {
        code: data.code,
        phone: secondaryPhone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      await fetchUserInformations();
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({
        err: err,
        openToast: handleAddToastOnArray,
      });
    }
  }

  async function handleReceiveCode() {
    try {
      if (secondaryPhone.length != 9) {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Enter a valide mobile phone number",
          description_pt: "Informe um número válido",
          title_en: "Invalid Mobile Phone Number",
          title_pt: "Número de celular inválido",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsLoadingSendCode(true);

      await internalApi.post("/auth/resend-code", {
        phone: secondaryPhone,
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
        <form onSubmit={handleSubmit(handleRecovery)}>
          <BaseBox className="h-fit w-full relative">
            <div className="md:px-5 px-4 py-4 flex flex-col gap-6 ">
              <div className="flex flex-col  justify-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h1 className="dark:text-white font-bold text-xl">
                    <CTranslateTo
                      eng="Password Recovery"
                      pt="Recuperação de senha"
                    />
                  </h1>
                </div>
                <h4 className="text-[0.89rem]  text-slate-500 dark:text-slate-400">
                  <CTranslateTo
                    eng="You take the good decision 🚀"
                    pt="Tomou a decisão certa! 🚀"
                  />
                </h4>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between">
                    <div className="dark:text-white flex items-center gap-2">
                      <ReactIcons.AiICon.AiFillPhone
                        size={15}
                        className="rotate-90"
                      />
                      <h1 className="text-base ">
                        <CTranslateTo
                          eng="WhatsApp Number"
                          pt="Número do WhatsApp"
                        />
                      </h1>
                    </div>
                    {!isLoadingSendCode && !sentConde && (
                      <button
                        type="button"
                        onClick={() => handleReceiveCode()}
                        className="text-yellow-600 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-400"
                      >
                        <CTranslateTo eng="Send Code" pt="Enviar código" />
                      </button>
                    )}

                    {!isLoadingSendCode && sentConde && (
                      <h2 className="flex items-center gap-2 text-green-600 dark:text-green-300">
                        <CTranslateTo eng="Sent code" pt="Código enviado" />
                        <ReactIcons.AiICon.AiOutlineCheck />
                      </h2>
                    )}

                    {isLoadingSendCode && (
                      <h2 className="flex items-center gap-2 text-yellow-600 dark:text-yellow-300 animate-pulse">
                        <CTranslateTo eng="Sending" pt="Enviando" />
                        <ReactIcons.PiIcon.PiSpinner
                          className="animate-spin"
                          size={15}
                        />
                      </h2>
                    )}
                  </div>
                  <AuSoftUI.UI.TextField.Default
                    value={secondaryPhone}
                    onChange={(e) => setSecondaryPhone(e.target.value)}
                    placeholder="Ex: 935567356"
                    className="w-full"
                    requiredField={
                      secondaryPhone.length != 9 && isSubmitting ? true : false
                    }
                    weight={"md"}
                  />
                </div>

                {sentConde && (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                      <div className="dark:text-white flex items-center gap-2">
                        <ReactIcons.PiIcon.PiDotsThree size={20} />
                        <h1 className="text-base ">
                          <CTranslateTo eng="Code" pt="Código" />
                        </h1>
                      </div>
                    </div>
                    <AuSoftUI.UI.TextField.Default
                      {...register("code")}
                      className="w-full"
                      weight={"md"}
                      placeholder="Ex: 00545"
                      requiredField={false}
                    />
                    {errors.code?.message && (
                      <AuSoftUI.Component.RequiredTextField
                        text={errors.code.message}
                        color="red"
                      />
                    )}
                  </div>
                )}

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-1.5">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                      <div className="dark:text-white flex items-center gap-2">
                        <ReactIcons.AiICon.AiFillLock size={15} />
                        <h1 className="text-base ">
                          <CTranslateTo eng="Password" pt="Senha" />
                        </h1>
                      </div>
                    </div>
                    <AuSoftUI.UI.TextField.Password
                      name="password"
                      requiredField={errors?.password?.message ? true : false}
                    />

                    {errors.password?.message && (
                      <AuSoftUI.Component.RequiredTextField
                        text={errors.password.message}
                        color="red"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                      <div className="dark:text-white flex items-center gap-2">
                        <ReactIcons.AiICon.AiFillLock size={15} />
                        <h1 className="text-base ">
                          <CTranslateTo
                            eng="Confirm Password"
                            pt="Confirmar Senha"
                          />
                        </h1>
                      </div>
                    </div>

                    <AuSoftUI.UI.TextField.Password
                      name="confirmPassword"
                      requiredField={
                        errors?.confirmPassword?.message ? true : false
                      }
                    />

                    {errors.confirmPassword?.message && (
                      <AuSoftUI.Component.RequiredTextField
                        text={errors.confirmPassword.message}
                        color="red"
                      />
                    )}
                  </div>
                </div>
                <div className="w-full mt-2">
                  <AuSoftUI.UI.Button
                    size={"md"}
                    className="w-full font-bold items-center"
                    variant={"primary"}
                  >
                    {!isSubmitting && (
                      <>
                        <CTranslateTo
                          eng="Recovery Password"
                          pt="Recuperar Senha"
                        />
                        <ReactIcons.AiICon.AiFillUnlock size={16} />
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
