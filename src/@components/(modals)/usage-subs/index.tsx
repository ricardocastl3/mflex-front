import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BaseModal from "../base";
import Link from "next/link";

export default function UsageSubsModal() {
  const { handleOpenModal } = useModal();
  const { currentSubscription } = useAuth();

  const isExpired = currentSubscription?.subscription.is_expired ? true : false;

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
              <CTranslateTo eng="Subscription Usage" pt="Uso da assinatura" />
            </h3>
          </div>
          <button onClick={() => handleOpenModal("")}>
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>

        <div className="md:h-[55vh] h-[40vh] overflow-y-auto p-4">
          <div
            className={`${
              isExpired
                ? "dark:bg-red-900/20 bg-red-100"
                : "dark:bg-green-900/20 bg-green-100"
            } mb-4 p-2 rounded-xl`}
          >
            <h1
              className={`${
                isExpired
                  ? "dark:text-red-400 text-red-700 "
                  : "dark:text-green-400 text-green-700 "
              } text-[0.95rem] font-bold`}
            >
              {isExpired ? (
                <CTranslateTo
                  eng="Assinatura expirada 😭"
                  pt="Expired Subscription 😭"
                />
              ) : (
                <CTranslateTo
                  eng="Assinatura ativa, e em uso 😀"
                  pt="Subscription active and in use 😀"
                />
              )}
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-base dark:text-yellow-500 text-yellow-600 font-bold">
              <CTranslateTo eng="Games" pt="Jogos" />
            </h1>
            <div className="flex items-center gap-4">
              <h2 className="text-sm dark:text-slate-300">
                <CTranslateTo eng="Daily Analisies: " pt="Análises diárias: " />
                <b className="font-bold">
                  {currentSubscription?.subscription.plan?.football_ai}
                </b>
              </h2>
              <h2 className="text-sm dark:text-slate-300">
                <CTranslateTo
                  eng="Analyzes performed: "
                  pt="Análises realizadas: "
                />{" "}
                <b className="font-bold"> {currentSubscription?.football_ai}</b>
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h1 className="text-base dark:text-yellow-500 text-yellow-600 font-bold">
              <CTranslateTo eng="Ticket Sales" pt="Venda de Ingressos" />
            </h1>
            <div className="flex items-center gap-4">
              <h2 className="text-sm dark:text-slate-300">
                <CTranslateTo
                  eng="Daily Tickets: "
                  pt="Total de ingressos por dia: "
                />
                <b className="font-bold">
                  {currentSubscription?.subscription.plan?.tickets_amount}
                </b>
              </h2>
              <h2 className="text-sm dark:text-slate-300">
                <CTranslateTo
                  eng="Sales performed: "
                  pt="Vendas realizadas: "
                />
                <b className="font-bold">
                  {currentSubscription?.tickets_amount}
                </b>
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h1 className="text-base dark:text-yellow-500 text-yellow-600 font-bold">
              <CTranslateTo
                eng="Acesso á Flex TV & Flex Movie"
                pt="Flex TV Access & Flex Movie"
              />
            </h1>
            <div className="flex items-center gap-4">
              <h2 className="text-sm dark:text-slate-300">
                <CTranslateTo eng="Canais televisivos: " pt="TV Channels: " />
                <b className="font-bold">
                  {currentSubscription?.subscription.plan?.flex_tv ? (
                    <CTranslateTo eng="Yes" pt="Sim" />
                  ) : (
                    <CTranslateTo eng="No" pt="Não" />
                  )}
                </b>
              </h2>
              <h2 className="text-sm dark:text-slate-300">
                <CTranslateTo eng="Movies: " pt="Filmes: " />
                <b className="font-bold">
                  {" "}
                  {currentSubscription?.subscription.plan?.flex_movie ? (
                    <CTranslateTo eng="Yes" pt="Sim" />
                  ) : (
                    <CTranslateTo eng="No" pt="Não" />
                  )}
                </b>
              </h2>
            </div>
          </div>
        </div>
        <div className="py-4 px-4 mt-3 border-t border-slate-200 dark:border-slate-800">
          <Link href={`/${langByCookies}/pricing`}>
            <AuSoftUI.UI.Button
              onClick={() => {
                handleOpenModal("");
              }}
              variant={"primary"}
              className="items-center"
            >
              <CTranslateTo
                eng="Upgrade subscription"
                pt="Atualizar assinatura"
              />
              <ReactIcons.AiICon.AiOutlineLink size={15} />
            </AuSoftUI.UI.Button>
          </Link>
        </div>
      </div>
    </BaseModal>
  );
}
