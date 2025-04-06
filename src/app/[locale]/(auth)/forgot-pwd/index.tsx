"use client";

import { BaseBox } from "@/@components/(box)/BaseBox";
import { motion } from "framer-motion";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { FormProvider, useForm } from "react-hook-form";
import { langByCookies } from "@/http/axios/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppProvider } from "@/providers/app/AppProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import AuthSchemas from "@/services/schemas/AuthSchemas";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import Link from "next/link";
import RecoverPwdSchema from "@/services/schemas/RecoveryPwdSchema";

export default function SignInPage() {
  // Context
  const { handleAddToastOnArray } = useAppProvider();

  // Schema
  const schema = new RecoverPwdSchema(langByCookies);
  type formData = z.infer<typeof schema.recoverPwdSchema>;

  const methods = useForm<formData>({
    resolver: zodResolver(schema.recoverPwdSchema),
    defaultValues: {
      password: "",
      code: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  function handleSignIn(data: formData) {
    try {
    } catch (err) {
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
          <BaseBox className="h-fit w-full">
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
                <h4 className="text-[0.89rem]  text-slate-500 dark:text-slate-500">
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
                          eng="Phone number"
                          pt="Número de celular"
                        />
                      </h1>
                    </div>
                    <button className="text-yellow-600 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-400">
                      <CTranslateTo eng="Send Code" pt="Enviar código" />
                    </button>
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
                    className="w-full"
                    weight={"md"}
                    placeholder="Ex: 00545"
                    requiredField={false}
                  />
                </div>
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
                    <CTranslateTo eng="Recovery Paaword" pt="Recuperar Senha" />
                    <ReactIcons.AiICon.AiFillUnlock size={16} />
                  </AuSoftUI.UI.Button>
                </div>
              </div>
            </div>
          </BaseBox>
        </form>
      </FormProvider>
    </motion.div>
  );
}
