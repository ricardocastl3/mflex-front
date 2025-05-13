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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth/AuthProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import Link from "next/link";
import signUpSchema from "@/services/schemas/SignUpSchema";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";
import FacebookEventServices from "@/services/meta/FacebookEventServices";

export default function SignUpPage() {
  // Context
  const { handleAddToastOnArray } = useAppProvider();
  const { fetchUserInformations } = useAuth();

  // Controls
  const [termCheck, setTermCheck] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();

  // Schema
  const schema = new signUpSchema(langByCookies);
  type formData = z.infer<typeof schema.signUpSchema>;

  const methods = useForm<formData>({
    resolver: zodResolver(schema.signUpSchema),
    defaultValues: {
      confirmPassword: "",
      first_name: "",
      last_name: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  async function handleSignUp(data: formData) {
    try {
      if (!termCheck) {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en:
            "To proceed, you need agree with terms and conditions",
          description_pt:
            "Para prosseguir, precisa concordar com os termos e condições",
          title_en: "Terms & Conditions",
          title_pt: "Termos & Condições",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmit(true);

      await internalApi.post("/auth/sign-up", {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      FacebookEventServices.send("Register");

      await fetchUserInformations();

      router.push(`/${langByCookies}/confirm-account`);
    } catch (err) {
      setIsSubmit(false);
      return CAxiosErrorToastify({
        err: err,
        openToast: handleAddToastOnArray,
      });
    }
  }

  useEffect(() => {
    if (navigator.userAgent.split("FBLC").length > 0) {
      window.open(
        `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}/sign-up`,
        "_blank"
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 md:w-[50vw] w-[90vw]"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <BaseBox className="h-fit w-full relative">
            <div className="md:px-5 px-4 py-4 flex flex-col gap-6 ">
              <div className="flex flex-col  justify-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h1 className="dark:text-white font-bold text-xl">
                    <CTranslateTo eng="New FLEX Account" pt="Nova conta FLEX" />
                  </h1>
                  <Link href={`/${langByCookies}/sign-in`}>
                    <AuSoftUI.UI.Button
                      type="button"
                      size={"sm"}
                      className="w-fit font-bold items-center py-1"
                      variant={"primary"}
                    >
                      <CTranslateTo
                        eng="I already have an account"
                        pt="Já tenho uma conta"
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
                    <ReactIcons.AiICon.AiFillPhone
                      size={15}
                      className="rotate-90"
                    />
                    <h1 className="text-base ">
                      <CTranslateTo
                        eng="WhatsApp number"
                        pt="Número do WhatsApp"
                      />
                    </h1>
                  </div>
                  <AuSoftUI.UI.TextField.Default
                    {...register("phone")}
                    placeholder="Ex: 935567356"
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
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="dark:text-white flex items-center gap-2">
                      <ReactIcons.AiICon.AiOutlineUser size={15} />
                      <h1 className="text-base ">
                        <CTranslateTo eng="First name" pt="Primeiro nome" />
                      </h1>
                    </div>
                    <AuSoftUI.UI.TextField.Default
                      {...register("first_name")}
                      placeholder="Ex: John"
                      className="w-full"
                      requiredField={errors.first_name?.message ? true : false}
                      weight={"md"}
                    />

                    {errors.first_name?.message && (
                      <AuSoftUI.Component.RequiredTextField
                        text={errors.first_name.message}
                        color="red"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="dark:text-white flex items-center gap-2">
                      <ReactIcons.AiICon.AiOutlineUser size={15} />
                      <h1 className="text-base ">
                        <CTranslateTo eng="Last name" pt="Último nome" />
                      </h1>
                    </div>
                    <AuSoftUI.UI.TextField.Default
                      {...register("last_name")}
                      placeholder="Ex: Walker"
                      className="w-full"
                      requiredField={errors.last_name?.message ? true : false}
                      weight={"md"}
                    />

                    {errors.last_name?.message && (
                      <AuSoftUI.Component.RequiredTextField
                        text={errors.last_name.message}
                        color="red"
                      />
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
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
                <div className="w-full mt-4 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <AuSoftUI.Component.Toggle
                      color="yellow"
                      setValue={setTermCheck}
                      value={termCheck}
                    />
                    <h1 className="dark:text-white text-base">
                      <CTranslateTo
                        eng="Agree with Terms & Conditions"
                        pt="Concordar com os termos e condições"
                      />
                    </h1>
                  </div>
                  <AuSoftUI.UI.Button
                    size={"md"}
                    className="w-full font-bold justify-center items-center"
                    variant={"primary"}
                  >
                    {!isSubmit && (
                      <>
                        <CTranslateTo eng="Create Account" pt="Criar Conta" />
                        <ReactIcons.AiICon.AiOutlineUserAdd size={16} />
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
