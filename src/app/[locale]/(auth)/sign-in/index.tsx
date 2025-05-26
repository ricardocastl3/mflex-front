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
import { useAuth } from "@/providers/auth/AuthProvider";
import { useState } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import AuthSchemas from "@/services/schemas/AuthSchemas";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import Link from "next/link";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import WebPushServices from "@/services/web-push/WebPushServices";

export default function SignInPage() {
  // Context
  const { handleAddToastOnArray } = useAppProvider();
  const { fetchUserInformations } = useAuth();

  // Controls
  const [isSubmit, setIsSubmit] = useState(false);

  // Schema
  const schema = new AuthSchemas(langByCookies);
  type formData = z.infer<typeof schema.loginSchema>;

  const methods = useForm<formData>({
    resolver: zodResolver(schema.loginSchema),
    defaultValues: {
      password: "",
      phone: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  async function handleSignIn(data: formData) {
    try {
      setIsSubmit(true);
      await internalApi.post("/auth/sign-in", {
        phone: data.phone,
        password: data.password,
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
    } catch (err) {
      setIsSubmit(false);
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
        <form onSubmit={handleSubmit(handleSignIn)}>
          <BaseBox className="h-fit w-full relative">
            <div className="md:px-5 px-4 py-4 flex flex-col gap-6 ">
              <div className="flex flex-col  justify-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h1 className="dark:text-white font-bold text-xl">
                    <CTranslateTo
                      eng="You're Welcome, sign in"
                      pt="Início de sessão"
                    />
                  </h1>
                  <Link href={`/${langByCookies}/sign-up`}>
                    <AuSoftUI.UI.Button
                      type="button"
                      size={"sm"}
                      className="w-fit font-bold items-center py-1"
                      variant={"primary"}
                    >
                      <CTranslateTo
                        eng="Create new account"
                        pt="Criar nova conta"
                      />
                      <ReactIcons.AiICon.AiOutlineUser size={16} />
                    </AuSoftUI.UI.Button>
                  </Link>
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
                  <div className="dark:text-white flex items-center gap-2">
                    <ReactIcons.AiICon.AiOutlineWhatsApp size={16} />
                    <h1 className="text-base ">
                      <CTranslateTo
                        eng="WhatsApp Number"
                        pt="Número do WhatsApp"
                      />
                    </h1>
                  </div>
                  <AuSoftUI.UI.TextField.Default
                    {...register("phone")}
                    placeholder={`${
                      langByCookies == "pt"
                        ? "Por favor, informe o seu whatsapp..."
                        : "Please, enter your whatsapp"
                    }`}
                    className="w-full"
                    requiredField={errors.phone?.message ? true : false}
                    weight={"md"}
                  />

                  {errors.phone?.message && (
                    <AuSoftUI.Component.RequiredTextField
                      text={errors.phone.message}
                      color="red"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between">
                    <div className="dark:text-white flex items-center gap-2">
                      <ReactIcons.AiICon.AiFillLock size={15} />
                      <h1 className="text-base ">
                        <CTranslateTo eng="Password" pt="Senha" />
                      </h1>
                    </div>
                    <Link
                      href={`/${langByCookies}/forgot-pwd`}
                      className="text-yellow-600 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-400"
                    >
                      <CTranslateTo
                        eng="I forgot the password"
                        pt="Esqueci-me da senha"
                      />
                    </Link>
                  </div>
                  <AuSoftUI.UI.TextField.Password
                    name="password"
                    requiredField={false}
                  />
                </div>
                <div className="w-full mt-2">
                  <AuSoftUI.UI.Button
                    size={"md"}
                    className="w-full font-bold items-center"
                    variant={"primary"}
                  >
                    {!isSubmit && (
                      <>
                        <CTranslateTo eng="Sign In" pt="Iniciar sessão" />
                        <ReactIcons.AiICon.AiOutlineArrowRight size={16} />
                      </>
                    )}

                    <AuSoftUI.Component.isFormSubmitting
                      isSubmitting={isSubmit}
                    />
                  </AuSoftUI.UI.Button>
                </div>
              </div>
            </div>
            <ARegisterProgress rounded="all" isOpened={isSubmit} />
          </BaseBox>
        </form>
      </FormProvider>
    </motion.div>
  );
}
