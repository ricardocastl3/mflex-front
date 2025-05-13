import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { langByCookies } from "@/http/axios/api";

import React from "react";
import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function OpenInYourBrowserModal() {
  return (
    <BaseModal callbackClose={() => {}}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-4 py-5 flex flex-col items-center gap-2">
          <div className="p-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500">
            <ReactIcons.AiICon.AiOutlineGlobal size={50} className="" />
          </div>
          <h4 className="font-bold text-lg md:w-[20vw] w-[70vw] text-yellow-600 text-center dark:text-yellow-400 mt-4">
            <CTranslateTo
              eng="OPEN IN YOUR BROWSER"
              pt="ABRA EM SEU NAVEGADOR"
            />
          </h4>
          <h4 className="flex md:flex-row flex-col md:w-[30vw] w-[80vw] text-center items-center gap-2 text-sm dark:text-slate-400 text-slate-800">
            <CTranslateTo
              eng={`Great choice! 🎉 To continue, please click the button below to copy the link, and then paste it into your favorite browser. Let's get started! 🚀`}
              pt={`Ótima escolha! 🎉 Para continuar, clique no botão abaixo para copiar o link e depois cole no seu navegador favorito. Vamos começar! 🚀`}
            />
          </h4>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 flex items-center md:gap-4 gap-2">
          <AuSoftUI.Component.Clipboard
            body={
              <AuSoftUI.UI.Button
                size={"sm"}
                variant={"primary"}
                className="w-full justify-center rounded-full"
              >
                <CTranslateTo eng="COPY LINK" pt="COPIAR O LINK" />
              </AuSoftUI.UI.Button>
            }
            text={`${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}/sign-up`}
            title_en="Link copied, now paste it into your browser"
            title_pt="Link Copiado, agora cole no seu navegador"
          />
        </div>
      </BaseBox>
    </BaseModal>
  );
}
