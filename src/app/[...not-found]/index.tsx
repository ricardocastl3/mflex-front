"use client";

import { localImages } from "@/utils/images";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { Button } from "@/@components/ui/Button";
import { langByCookies } from "@/http/axios/api";

import Image from "next/image";
import Link from "next/link";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function NotFound() {

  return (
    <div className="flex flex-col justify-center h-screen items-center pt-16">
      <BaseBox className="p-8 flex flex-col items-center md:w-[40vw] w-[90vw]">
        <Image
          src={localImages.vectors.notFound}
          width={180}
          height={180}
          alt="Imagem de home buscando algo"
        />
        <h4 className="md:text-xl text-[1.2rem] text-center font-bold dark:text-yellow-400 text-yellow-700 mt-4 mb-2">
          <CTranslateTo
            eng="Ow! Page not found"
            pt=" Ops! Página não encontrada"
          />
        </h4>
        <h4 className="dark:text-white">
          <CTranslateTo
            eng="This page do not exists"
            pt="Esta página não existe"
          />
        </h4>
        <Button
          variant={"primary"}
          size={"md"}
          className="w-full justify-center mt-4 rounded-full"
        >
          <Link href={`${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}`}>
            <CTranslateTo eng="Back to MFLEX" pt="Voltar para a MFLEX" />
          </Link>
        </Button>
      </BaseBox>
    </div>
  );
}
