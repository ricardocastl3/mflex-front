"use client";

import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useAuth } from "../auth/AuthProvider";
import { IServerStats } from "@/http/interfaces/models/IServerStats";
import { IAffiliateConfigs } from "@/http/interfaces/models/affiliate/IAffiliateConfigs";

import React, { createContext, useContext, useEffect, useState } from "react";
import CookieServices from "@/services/auth/CookieServices";

export interface IToast {
  id?: number;
  title: string;
  description: string;
  type: "error" | "success" | "info";
}

interface IAppContext {
  isDarkMode: boolean;
  isNotifyGranted: boolean;
  currentPageByUrl: string;
  currentAppPageUrl: string;
  openToast: IToast[];
  segmentedLayout: string | null;
  segmentedLayoutByLocalStorage: string;
  openBanner: boolean;
  canCloseSubscribe: boolean;
  hiddenMobileHeader: boolean;
  isScrolledWindow: boolean;
  closeLeagueBox: boolean;
  serverStats: IServerStats | undefined;
  affiliateConfigs: IAffiliateConfigs | undefined;

  handleAffiliateConfigs: (config: IAffiliateConfigs | undefined) => void;
  handleServerStats: (stats: IServerStats | undefined) => void;
  handleCanCloseSubscribe: (mode: boolean) => void;
  handleOpenBanner: (mode: boolean) => void;
  handleAddToastOnArray: (toast: IToast) => void;
  handleResetToast: (id: number) => void;
  handleSetDarkMode: (value: boolean) => void;
  handleCloseLeagueBox: () => void;
}

export function useAppProvider() {
  const app = useContext(AppContext);
  return app;
}
export const AppContext = createContext({} as IAppContext);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //Controls
  const [currentPageByUrl, setCurrentPageByUrl] = useState("");
  const [currentAppPageUrl, setCurrentAppPageUrl] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openToast, setOpenToast] = useState<IToast[]>([]);
  const [openBanner, setOpenBanner] = useState(false);
  const [canCloseSubscribe, setCanCloseSubscribe] = useState(true);

  const [closeLeagueBox, setCloseLeagueBox] = useState(false);

  const [isNotifyGranted, setIsNotifyGranted] = useState(false);

  const [hiddenMobileHeader, setHiddenMobileHeader] = useState(false);
  const [isScrolledWindow, setIsScrolledWindow] = useState(false);

  const [serverStats, setServerStats] = useState<IServerStats | undefined>();
  const [affiliateConfigs, setAffiliateConfigs] = useState<
    IAffiliateConfigs | undefined
  >();

  const segmentedLayout = useSelectedLayoutSegment();
  const [segmentedLayoutByLocalStorage, setSegmentedLayoutByLocalStorage] =
    useState("");

  const { userLogged } = useAuth();

  function handleAddToastOnArray({ ...toast }: IToast) {
    const id = Math.round(Math.PI * new Date().getTime());
    setOpenToast((state) => [...state, { ...toast, id: id }]);
  }

  function handleCloseLeagueBox() {
    setCloseLeagueBox((state) => !state);
  }

  function handleResetToast(id: number) {
    setOpenToast((state) => state.filter((item) => item.id != id));
  }

  function handleSetDarkMode(mode: boolean) {
    setIsDarkMode(mode);
  }

  function handleOpenBanner(mode: boolean) {
    setOpenBanner(mode);
  }

  function handleCanCloseSubscribe(mode: boolean) {
    setCanCloseSubscribe(mode);
  }

  function handleServerStats(stats: IServerStats | undefined) {
    setServerStats(stats);
  }

  function handleAffiliateConfigs(configs: IAffiliateConfigs | undefined) {
    setAffiliateConfigs(configs);
  }

  const path = usePathname();

  useEffect(() => {
    const pathBase = path.split("/")[2];
    setCurrentPageByUrl(pathBase);
    setCurrentAppPageUrl(path.split("/")[3]);

    if (pathBase == "podflex" && path.split("/").length == 4) {
      setHiddenMobileHeader(true);
    } else {
      setHiddenMobileHeader(false);
    }

    const lang = CookieServices.getLocale();
    setSegmentedLayoutByLocalStorage(lang?.toString().toLowerCase()!);
  }, [path]);

  useEffect(() => {
    if (userLogged)
      Notification.requestPermission().then((e) => {
        if (e == "granted") setIsNotifyGranted(true);
        else setIsNotifyGranted(false);
      });
  }, [userLogged]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
      setIsScrolledWindow(scrollPercentage > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppContext.Provider
      value={{
        handleSetDarkMode,
        handleResetToast,
        handleOpenBanner,
        handleCloseLeagueBox,
        handleAffiliateConfigs,
        handleServerStats,

        affiliateConfigs,
        serverStats,
        closeLeagueBox,
        canCloseSubscribe,

        isScrolledWindow,
        isNotifyGranted,
        hiddenMobileHeader,
        openBanner,
        segmentedLayoutByLocalStorage,
        segmentedLayout,
        handleAddToastOnArray,
        handleCanCloseSubscribe,
        openToast,
        currentPageByUrl,
        currentAppPageUrl,
        isDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
