import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Image from "next/image";
import Link from "next/link";

import { langByCookies } from "@/http/axios/api";
import { localImages } from "@/utils/images";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";

export default function NoSubscription() {
  const { handleOpenModal } = useModal();

  return (
    <div className="w-full h-full flex justify-center items-center md:p-12 p-6">
      <div className="md:p-8 p-4 flex flex-col items-center gap-2 md:w-[40vw] w-full">
        <Image
          width={50}
          height={50}
          src={localImages.vectors.emptyBox}
          alt="Imagem de jogos não encontrados"
        />

        <div className="flex flex-col gap-4 items-center">
          <h4 className="text-base text-center font-bold text-yellow-700 dark:text-yellow-400">
            <CTranslateTo
              eng={"Oops! It looks like you don't have an active subscription."}
              pt={"Ops! Parece que você não tem uma subscrição ativa."}
            />
          </h4>
          <h4 className="text-base text-center text-slate-600 dark:text-slate-400">
            <CTranslateTo
              eng={
                "Unlock the full potential of AI game analysis by purchasing a subscription today. It's quick and easy!"
              }
              pt={
                "Desbloqueie todo o potencial da análise de jogos com IA adquirindo uma subscrição hoje. É rápido e fácil!"
              }
            />
          </h4>
          <Link href={`/${langByCookies}/pricing`}>
            <AuSoftUI.UI.Button
              onClick={() => handleOpenModal("")}
              variant={"primary"}
              size={"sm"}
            >
              <CTranslateTo
                eng="Get Started with a Subscription"
                pt="Comece com uma Subscrição"
              />
            </AuSoftUI.UI.Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
