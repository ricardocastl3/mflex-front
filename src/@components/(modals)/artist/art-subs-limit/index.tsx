import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { langByCookies } from "@/http/axios/api";

import React from "react";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

import Link from "next/link";

export default function ArtistSubscriptionLimit() {
  //Contexts
  const { userLogged, currentArtistSubscription } = useAuth();
  const { handleOpenModal } = useModal();

  const title =
    currentArtistSubscription &&
    currentArtistSubscription.subscription.is_expired
      ? {
          pt: `${userLogged?.first_name}, sua assinatura expirou`,
          en: `${userLogged?.first_name}, your subscription has expired`,
          des_en: `To continue adding new music, you will need to upgrade your subscription.`,
          des_pt:
            "Para continuar adicionando novas músicas, você precisará atualizar a sua assinatura",
        }
      : currentArtistSubscription?.musics == 0
      ? {
          pt: `${userLogged?.first_name}, já excedeu o limite `,
          en: `${userLogged?.first_name}, has already exceeded the limit`,
          des_en: `You've reached your monthly limit of ${currentArtistSubscription.subscription.plan?.art_musics} songs. To continue adding new songs, upgrade your subscription.`,
          des_pt: `Atingiu o limite de ${currentArtistSubscription.subscription.plan?.art_musics} músicas no mês. Para continuar adicionando novas músicas atualize sua assinatura`,
        }
      : { pt: ``, en: ``, des_en: ``, des_pt: `` };

  return (
    <BaseModal callbackClose={() => {}}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-4 py-5 flex flex-col items-center gap-2">
          <div className="text-[2rem] rounded-full pt-4">⚠️</div>
          <h4 className="font-bold text-lg md:w-[20vw] w-[70vw] text-red-600 text-center dark:text-red-400">
            <CTranslateTo eng={title.en} pt={title.pt} />
          </h4>
          <h4 className="flex md:flex-row flex-col md:w-[30vw] w-[80vw] text-center items-center gap-2 text-[0.9rem] dark:text-slate-400 text-slate-800">
            <CTranslateTo eng={title.des_en} pt={title.des_pt} />
          </h4>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 grid grid-cols-2 md:gap-4 gap-2">
          <Link href={`/${langByCookies}/art-pricing`}>
            <AuSoftUI.UI.Button
              onClick={() => {
                LocalStorageServices.setOrganizerPanel(
                  new Date().getTime().toString()
                );
              }}
              variant={"primary"}
              className="items-center justify-center rounded-full w-full"
            >
              <CTranslateTo
                eng={"Upgrade Subscription"}
                pt={"Atualizar Assinatura"}
              />
            </AuSoftUI.UI.Button>
          </Link>
          <AuSoftUI.UI.Button
            onClick={() => handleOpenModal("")}
            size={"sm"}
            variant={"outline"}
            className="w-full justify-center rounded-full"
          >
            <CTranslateTo eng="Close" pt="Fechar" />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
