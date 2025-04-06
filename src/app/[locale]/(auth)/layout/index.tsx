import { CSwitcherTheme } from "@/@components/(theme)/CSwitcherTheme";
import CTranslate from "@/@components/(translation)/CCTranslate/CTranslate";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { localImages } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="md:px-12 fixed inset-x-0 px-5 md:py-8 py-4 flex items-center justify-between">
        <div>
          <Link
            href={`/${langByCookies}`}
            className=" text-yellow-600 dark:text-yellow-300 flex items-center gap-4"
          >
            <ReactIcons.AiICon.AiOutlineArrowLeft size={16} />
            <h4 className="font-bold">
              <CTranslateTo eng="Back to home" pt="Voltar" />
            </h4>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <CTranslate />
          <CSwitcherTheme />
        </div>
      </div>

      <div className="flex flex-col gap-8 h-full justify-center w-full items-center md:pt-32 pt-32 md:pb-28 pb-24">
        {children}
      </div>
    </div>
  );
}
