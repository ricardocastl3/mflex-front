import { AuSoftUI } from "@/@components/(ausoft)";
import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { localImages } from "@/utils/images";

import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import Image from "next/image";
import Link from "next/link";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function MusicNoSubscription() {
  return (
    <>
      <div className="flex items-center flex-col gap-3 justify-center mt-12">
        <Image
          width={100}
          height={100}
          src={localImages.vectors.emptyBox}
          alt="Imagem de lista não encontrado"
        />

        <div className="md:w-[40vw] w-[80vw] flex flex-col gap-2">
          <h4 className="text-lg text-center font-bold text-yellow-700 dark:text-yellow-400">
            <CTranslateTo
              eng={"No Active Subscription"}
              pt={"Nenhuma Assinatura Ativa"}
            />
          </h4>
          <h4 className="text-base text-center text-slate-600 dark:text-slate-400">
            <CTranslateTo
              eng={
                "To start posting your music, you will need to purchase a subscription."
              }
              pt={
                "Para começares a postar as suas músicas, precisarás assinar uma assinatura"
              }
            />
          </h4>
        </div>
        <Link href={`/${langByCookies}/art-pricing`}>
          <AuSoftUI.UI.Button
            onClick={() => {
              LocalStorageServices.setArtistPanel(
                new Date().getTime().toString()
              );
            }}
            variant={"primary"}
            className="items-center"
          >
            <CTranslateTo eng={"Sign a Plan"} pt={"Assinar um plano"} />
            <ReactIcons.AiICon.AiOutlineLink />
          </AuSoftUI.UI.Button>
        </Link>
      </div>
    </>
  );
}
