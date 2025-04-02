"use client";

import { CSwitcherTheme } from "@/@components/(theme)/CSwitcherTheme";
import { CUserProfileBox } from "@/@components/(box)/profile/CUserProfileBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";

import Link from "next/link";
import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CTranslate from "@/@components/(translation)/CCTranslate/CTranslate";
import LinkHeader from "./components/LinkHeader";

export default function SHeader() {
  // Contexts
  const { segmentedLayout } = useAppProvider();
  const { userLogged, handleRedirectToSign, isLoadingUserData } = useAuth();

  return (
    <div className="fixed flex top-0 inset-x-0 z-30 border-b border-slate-200 dark:border-slate-800 md:pr-8 pr-5 md:pl-8 pl-4 md:py-0.5 py-0 justify-between bg-slate-50 backdrop-filter backdrop-blur-md dark:bg-ausoft-slate-900/50  items-center md:gap-4 gap-2">
      <div className="flex items-center gap-4">
        <Link
          href={`/${segmentedLayout}`}
          className="flex items-center font-bold gap-1.5 md:text-xl text-md text-yellow-500 dark:text-yellow-500"
        >
          <AAuSoftLogo size={80} />
        </Link>
        <div className="items-center gap-1.5 md:flex hidden mt-[0.27rem]">
          <LinkHeader
            Icon={ReactIcons.AiICon.AiFillFire}
            action="news"
            title_en="News"
            title_pt="Novidades"
          />
          <LinkHeader
            Icon={ReactIcons.AiICon.AiOutlineVerified}
            action="events"
            title_en="Events"
            title_pt="Eventos"
          />
          <LinkHeader
            Icon={ReactIcons.AiICon.AiOutlineAudio}
            action="podflex"
            title_en="PodFlex"
            title_pt="PodFlex"
          />
          <LinkHeader
            Icon={ReactIcons.AiICon.AiFillSignal}
            action="services"
            title_en="Services"
            title_pt="Serviços"
          />
        </div>
      </div>
      <div className="flex items-center md:gap-2 gap-2 divide-x-2 divide-slate-200 dark:divide-slate-700/60">
        <div className="flex items-center gap-2.5">
          <CSwitcherTheme />
          <div className="flex">
            <CTranslate />
          </div>
        </div>
        <div className="flex relative items-center gap-2.5 md:pl-4 pl-2">
          {userLogged && !isLoadingUserData && <CUserProfileBox />}

          {!userLogged && !isLoadingUserData && (
            <AuSoftUI.UI.Button
              variant={"primary"}
              onClick={() => handleRedirectToSign()}
              className="rounded-full"
            >
              <ReactIcons.AiICon.AiOutlineUser size={18} />
              <CTranslateTo eng="Sign in" pt="Iniciar sessão" />
            </AuSoftUI.UI.Button>
          )}

          {isLoadingUserData && (
            <ReactIcons.CgIcon.CgSpinnerTwo
              size={26}
              className="dark:text-white animate-spin"
            />
          )}
        </div>
      </div>
    </div>
  );
}
