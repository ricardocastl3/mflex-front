import { langByCookies } from "@/http/axios/api";
import { localImages } from "@/utils/images";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";
import { useFootballProvider } from "@/providers/features/FootballProvider";
import { useAuth } from "@/providers/auth/AuthProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Image from "next/image";
import Link from "next/link";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function NoSubscription() {
  const { handleOpenModal } = useModal();
  const { currentSubscription } = useAuth();
  const { selectedFootballTeam } = useFootballProvider();

  const isExpired =
    !currentSubscription ||
    (currentSubscription && currentSubscription.subscription.is_expired)
      ? true
      : false;

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
            {isExpired && (
              <CTranslateTo
                eng={
                  "Oops! It looks like you don't have an active subscription."
                }
                pt={"Ops! Parece que você não tem uma subscrição ativa."}
              />
            )}

            {!isExpired &&
              currentSubscription?.subscription?.subscription_usage
                ?.football_ai! <= 0 && (
                <CTranslateTo
                  eng={"Oops! Your daily analysis total is over"}
                  pt={"Ops! O seu total de análise diária terminou"}
                />
              )}
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
              onClick={() => {
                LocalStorageServices.setFootballAITeam(
                  JSON.stringify(selectedFootballTeam)
                );
                handleOpenModal("");
              }}
              variant={"primary"}
              size={"sm"}
            >
              {isExpired && (
                <CTranslateTo
                  eng="Get Started with a Subscription"
                  pt="Comece com uma Subscrição"
                />
              )}

              {!isExpired &&
                currentSubscription?.subscription?.subscription_usage
                  ?.football_ai! <= 0 && (
                  <CTranslateTo eng="Upgrade Plan" pt="Atualizar plano" />
                )}
            </AuSoftUI.UI.Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
