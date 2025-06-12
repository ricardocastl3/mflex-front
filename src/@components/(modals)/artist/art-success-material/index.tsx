"use client";

import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { langByCookies } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";

import React from "react";
import BaseModal from "../../base";
import LogoSpinner from "@/app/onload-pages/spinner/LogoSpinner";
import InitEmbedAdobeReader from "@/@components/(system)/AAdobePdfReader/InitEmbedReader";

export default function ArtistSuccessMaterialModal() {
  //Contexts
  const { handleOpenModal } = useModal();
  const { affiliateConfigs } = useAppProvider();

  function handleCloseBox() {
    handleOpenModal("");
  }

  const title =
    langByCookies == "pt"
      ? "Seja um artista Flex de sucesso"
      : "Be a successful Flex artist";

  InitEmbedAdobeReader({
    divMaster: "pdf-div",
    title,
    url: affiliateConfigs?.art_success_link!,
  });

  return (
    <BaseModal callbackClose={() => handleCloseBox()} customDesktop="pb-4">
      <BaseBox className="flex inset-0 flex-col md:w-[80vw] w-[100vw] md:h-[90vh] h-[100vh]">
        <div className="flex items-center justify-between md:p-4 p-4 border-b border-slate-200 dark:border-slate-700">
          <h4 className="dark:text-white font-bold">{title}</h4>
          <button onClick={() => handleCloseBox()}>
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>
        <div className="relative inset-0 w-full h-full rounded-b-xl">
          <div
            id="pdf-div"
            className="z-30 absolute inset-0 rounded-b-xl"
          ></div>
          <div className="absolute inset-0 flex items-center justify-center rounded-b-xl bg-slate-300 dark:bg-transparent">
            <LogoSpinner />
          </div>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
