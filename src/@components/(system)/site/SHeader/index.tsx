"use client";

import { CSwitcherTheme } from "@/@components/(theme)/CSwitcherTheme";
import { CUserProfileBox } from "@/@components/(box)/profile/CUserProfileBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import { CAuSoftNotify } from "@/@components/(box)/ausoft-notify/CAuSoftNotify";

import Link from "next/link";
import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CTranslate from "@/@components/(translation)/CCTranslate/CTranslate";
import LinkHeader from "./components/LinkHeader";
import ServicesDropdown from "./components/services";
import FlexTvDropdown from "./components/flex-tv";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function SHeader() {
  // Contexts
  const {
    segmentedLayout,
    hiddenMobileHeader,
    currentLastPageUrl,
    currentPageByUrl,
  } = useAppProvider();
  const { userLogged, handleRedirectToSign, isLoadingUserData } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
      setIsScrolled(scrollPercentage > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
      fixed ${
        hiddenMobileHeader && !isScrolled ? "md:flex hidden" : "flex"
      } flex top-0 inset-x-0 z-30 
      border-b transition-all duration-300
      md:pr-8 pr-5 md:pl-8 pl-4 md:py-3 py-2 
      justify-between items-center md:gap-4 gap-2 animate-fade
      ${
        isScrolled
          ? "border-slate-200 dark:border-slate-800 bg-slate-50/95 backdrop-blur-md dark:bg-ausoft-slate-900/95"
          : "border-transparent bg-transparent"
      }
    `}
    >
      <div className="flex items-center gap-4">
        <Link
          href={`/${segmentedLayout}`}
          onClick={() => LocalStorageServices.resetAllKeys()}
          className="flex items-center font-bold gap-1.5 md:text-xl text-md text-yellow-500 dark:text-yellow-500"
        >
          <AAuSoftLogo size={70} />
        </Link>
        <div className="items-center gap-1.5 md:flex hidden mt-[0.27rem]">
          <LinkHeader
            isSelected={currentPageByUrl == "news"}
            isScrolled={isScrolled}
            Icon={ReactIcons.AiICon.AiFillFire}
            action="news"
            title_en="News"
            title_pt="Novidades"
          />
          <LinkHeader
            isSelected={currentPageByUrl == "events"}
            isScrolled={isScrolled}
            Icon={ReactIcons.AiICon.AiOutlineVerified}
            action="events"
            title_en="Events"
            title_pt="Eventos"
          />

          <LinkHeader
            isSelected={currentPageByUrl == "podflex"}
            isScrolled={isScrolled}
            Icon={ReactIcons.AiICon.AiOutlineAudio}
            action="podflex"
            title_en="PodCasts"
            title_pt="PodCasts"
          />

          <LinkHeader
            isSelected={currentPageByUrl == "musics"}
            isScrolled={isScrolled}
            Icon={ReactIcons.FaIcon.FaMusic}
            action="musics"
            title_en="Musics"
            title_pt="Músicas"
          />

          <FlexTvDropdown isScrolled={isScrolled} />

          <LinkHeader
            isSelected={currentPageByUrl == "games"}
            isScrolled={isScrolled}
            Icon={ReactIcons.Io5Icon.IoFootball}
            action="games"
            title_en="Games"
            title_pt="Jogos"
          />
          <ServicesDropdown isScrolled={isScrolled} />
        </div>
      </div>
      <div className="flex items-center md:gap-2 gap-2 divide-x-2 divide-slate-200 dark:divide-slate-700/60">
        <div className="flex items-center gap-2.5">
          {userLogged && (
            <div className="md:flex hidden pr-1.5">
              <CTranslate />
            </div>
          )}

          {!userLogged && <CTranslate />}

          {userLogged && <CAuSoftNotify />}
          <CSwitcherTheme />
        </div>
        <div className="flex relative items-center gap-2.5 md:pl-4 pl-2">
          {userLogged && !isLoadingUserData && <CUserProfileBox />}

          {!userLogged && !isLoadingUserData && (
            <AuSoftUI.UI.Button
              variant={"primary"}
              onClick={() => {
                LocalStorageServices.resetAllKeys();
                LocalStorageServices.setLastPageViewFlexZone(
                  currentLastPageUrl
                );
                handleRedirectToSign();
              }}
              className="rounded-full"
            >
              <ReactIcons.AiICon.AiOutlineUser size={18} />
              {window.innerWidth > 765 && (
                <CTranslateTo eng="Sign in" pt="Iniciar sessão" />
              )}
              {window.innerWidth <= 765 && (
                <CTranslateTo eng="Sign in" pt="Entrar" />
              )}
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
