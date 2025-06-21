import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";
import { langByCookies } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";
import { useAppProvider } from "@/providers/app/AppProvider";

import React from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";
import CardSubsStatus from "@/app/[locale]/app/(dash)/subscriptions/components/card-status";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import CTranslate from "@/@components/(translation)/CCTranslate/CTranslate";

export default function CContent({ callback }: { callback?: () => void }) {
  const {
    userLogged,
    currentSubscription,
    currentArtistSubscription,
    handleLogout,
  } = useAuth();

  const { currentPageByUrl, currentLastPageUrl } = useAppProvider();
  const { handleOpenModal } = useModal();

  const subscriptionExpired =
    currentSubscription && currentSubscription.subscription.is_expired
      ? true
      : false;

  return (
    <div className="md:w-[26vw] w-[82vw]">
      <div className="flex items-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700/60">
        <AuSoftUI.Component.Avatar
          src={localImages.logos.flexUser.src}
          size={50}
          width={50}
          wsite="w-[3.3rem] h-[3.3rem]"
        />

        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-[1.16rem] text-slate-800 font-bold dark:text-white">
                <CTranslateTo pt="Olá" eng="Hi" />, {userLogged?.first_name}{" "}
              </h3>
              👋
            </div>
            {callback && (
              <button
                onClick={callback}
                className="rounded-md hover:opacity-80 text-slate-800 dark:text-slate-200"
              >
                <ReactIcons.BiIcon.BiX size={25} />
              </button>
            )}
          </div>
          <h3 className="text-sm text-slate-500 dark:text-slate-400">
            {userLogged?.email && userLogged.email}
          </h3>
        </div>
      </div>
      <div
        className={`${
          currentSubscription
            ? currentSubscription.subscription.is_expired
              ? "dark:bg-red-900/20 bg-red-100"
              : "dark:bg-yellow-900/20 bg-yellow-100"
            : currentArtistSubscription
            ? currentArtistSubscription.subscription.is_expired
              ? "dark:bg-red-900/20 bg-red-100"
              : "dark:bg-yellow-900/20 bg-yellow-100"
            : "bg-slate-200 dark:bg-slate-800/60"
        } flex items-center gap-2 rounded-lg  p-2 mt-3`}
      >
        <div className="md:hidden flex">
          <CTranslate size={15} />
        </div>
        {(currentSubscription || currentArtistSubscription) && (
          <>
            {currentSubscription && (
              <>
                <h1
                  className={`${
                    subscriptionExpired
                      ? "dark:text-red-400 text-red-700"
                      : "dark:text-yellow-400 text-yellow-700"
                  } md:flex hidden text-sm `}
                >
                  <CTranslateTo eng="Plan: " pt="Plano: " />
                  {currentSubscription.subscription.plan?.name}
                </h1>
                <CardSubsStatus isExpired={subscriptionExpired} />
              </>
            )}
            <button
              onClick={() => {
                if (callback) callback();
                handleOpenModal("usage-susb");
              }}
              className={`${
                !subscriptionExpired
                  ? "text-yellow-700 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-800/40"
                  : "text-red-700 dark:text-red-400 bg-red-200 dark:bg-red-800/40"
              } animate-pulse flex items-center gap-2 px-2 py-0.5 rounded-full`}
            >
              <ReactIcons.PiIcon.PiDatabase size={12} />
              <p className="text-xs font-bold">
                <CTranslateTo eng="Usage" pt="Uso geral" />
              </p>
            </button>
          </>
        )}

        {!currentSubscription && !currentArtistSubscription && (
          <>
            <h1 className="text-sm  dark:text-slate-400 text-slate-700">
              <CTranslateTo eng="No active plane: " pt="Sem plano ativo:" />
            </h1>
            <Link
              onClick={() => {
                {
                  callback && callback();
                }
              }}
              href={`/${langByCookies}/pricing`}
              className="dark:text-white animate-pulse font-bold text-[0.8rem]"
            >
              <CTranslateTo eng="View Plans" pt="Ver Planos" />
            </Link>
          </>
        )}
      </div>
      <div
        onClick={() => {
          {
            callback && callback();
          }
          LocalStorageServices.resetAllKeys();
        }}
        className="flex flex-col"
      >
        <Link
          href={`/${langByCookies}/app`}
          onClick={() => {
            if (currentPageByUrl != "app") {
              LocalStorageServices.setLastPageViewFlexZone(currentLastPageUrl);
            }
          }}
          className="mt-2.5 rounded-full flex text-sm items-center gap-2 px-4 dark:text-slate-200 dark:hover:bg-slate-800/40 hover:bg-slate-200 transition-all py-3"
        >
          <ReactIcons.VSCIcon.VscSymbolEvent size={14} />
          <CTranslateTo eng="Flex Zone" pt="Flex Zone" />
        </Link>
        <Link
          href={`/${langByCookies}/musics`}
          className="rounded-full flex text-sm items-center gap-2 px-4 dark:text-slate-200 dark:hover:bg-slate-800/40 hover:bg-slate-200 transition-all py-3"
        >
          <ReactIcons.FaIcon.FaMusic size={14} />
          <CTranslateTo eng="Musics" pt="Músicas" />
        </Link>
        <Link
          href={`/${langByCookies}/podflex`}
          className="rounded-full flex text-sm items-center gap-2 px-4 dark:text-slate-200 dark:hover:bg-slate-800/40 hover:bg-slate-200 transition-all py-3"
        >
          <ReactIcons.AiICon.AiOutlineAudio size={14} />
          <CTranslateTo eng="PodCasts" pt="PodCasts" />
        </Link>
        <Link
          href={`/${langByCookies}/events`}
          className="rounded-full flex text-sm items-center gap-2 px-4 dark:text-slate-200 dark:hover:bg-slate-800/40 hover:bg-slate-200 transition-all py-3"
        >
          <ReactIcons.BiIcon.BiCalendarAlt size={14} />
          <CTranslateTo eng="Public Events" pt="Eventos Públicos" />
        </Link>
      </div>
      <div className="flex flex-col gap-1.5 mt-2">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
          <AuSoftUI.UI.Button
            size={"sm"}
            onClick={() => handleLogout()}
            className="w-full justify-start rounded-full text-sm hover:bg-red-400/10 text-red-600 dark:text-red-400 border-none pt-3 pb-2.5"
            variant={"outline"}
          >
            <ReactIcons.PiIcon.PiSignOut size={16} className="mb-1" />
            <CTranslateTo eng="Log Out" pt="Terminar sessão" />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </div>
  );
}
