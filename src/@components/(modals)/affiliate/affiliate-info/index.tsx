import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BaseModal from "../../base";

export default function AffiliateInfoModal() {
  const { handleOpenModal } = useModal();
  const { currentSubscription, userLogged } = useAuth();

  const url = `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}/pricing?btag=${userLogged?.profile?.affiliate_code}`;

  const artistUrl = `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}/art-pricing?btag=${userLogged?.profile?.affiliate_code}`;

  return (
    <BaseModal
      callbackClose={() => handleOpenModal("")}
      customDesktop="pt-2 pb-2"
    >
      <div className="md:w-[40vw] w-[90vw]  flex flex-col">
        <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-end gap-2">
            <AuSoftUI.Component.AuSoftLogo size={36} />
            <h3 className="text-normal font-bold dark:text-white">
              <CTranslateTo
                eng="My affiliate info"
                pt="Meus dados de afiliado"
              />
            </h3>
          </div>
          <button onClick={() => handleOpenModal("")}>
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>

        <div className="h-fit overflow-y-auto p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-base dark:text-yellow-500 text-yellow-600 font-bold">
              <CTranslateTo eng="Code" pt="Código" />
            </h1>
            <div className="flex items-center gap-4">
              <h2 className="font-bold text-sm dark:text-slate-300">
                {userLogged?.profile?.affiliate_code}
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h1 className="text-base dark:text-yellow-500 text-yellow-600 font-bold">
              <CTranslateTo eng="Link" pt="Link" />
            </h1>
            <div className="flex items-center gap-4">
              <h2 className="text-sm dark:text-slate-300 font-bold">{url}</h2>
            </div>
          </div>
        </div>
        <div className="py-4 px-4 mt-3 border-t flex md:flex-row flex-col md:items-center items-start gap-2.5 border-slate-200 dark:border-slate-800">
          <AuSoftUI.Component.Clipboard
            body={
              <AuSoftUI.UI.Button
                variant={"primary"}
                className="items-center md:w-fit w-full"
              >
                <CTranslateTo eng="Flex Plan Link" pt="Link para planos flex" />
                <ReactIcons.FaIcon.FaLink size={15} />
              </AuSoftUI.UI.Button>
            }
            text={url}
            title_en="Link copied"
            title_pt="Link copiado"
          />
          <AuSoftUI.Component.Clipboard
            body={
              <AuSoftUI.UI.Button
                variant={"primary"}
                className="items-center md:w-fit w-full"
              >
                <CTranslateTo
                  eng="Artist Plan Link"
                  pt="Link para planos para artistas"
                />
                <ReactIcons.FaIcon.FaLink size={15} />
              </AuSoftUI.UI.Button>
            }
            text={artistUrl}
            title_en="Link copied"
            title_pt="Link copiado"
          />
        </div>
      </div>
    </BaseModal>
  );
}
