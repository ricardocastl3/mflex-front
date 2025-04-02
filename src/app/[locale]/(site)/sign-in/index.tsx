"use client";

import { BaseBox } from "@/@components/(box)/BaseBox";
import { localImages } from "@/utils/images";
import { motion } from "framer-motion";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Image from "next/image";

export default function SignInPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <BaseBox className="h-full flex justify-center items-center">
        <div className="md:px-10 px-8 py-8 md:w-[38vw] w-full flex flex-col items-center gap-6 ">
          <div className="flex flex-col items-center justify-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
            <Image
              src={localImages.logos.mflex}
              width={76}
              height={76}
              alt="Logotipo da Marca Flex"
              className="mt-5"
            />
            <h1 className="dark:text-white font-bold text-xl">
              <CTranslateTo
                eng="You're Welcome, sign in"
                pt="Início de sessão"
              />
            </h1>
            <h4 className="text-[0.89rem] text-center text-slate-500 dark:text-slate-500">
              <CTranslateTo
                eng="You take the good decision 🚀"
                pt="Tomou a decisão certa! 🚀"
              />
            </h4>
          </div>
          <div className="my-2"></div>
        </div>
      </BaseBox>
    </motion.div>
  );
}
