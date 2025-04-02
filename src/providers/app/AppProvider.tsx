"use client";

import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useModal } from "./ModalProvider";
import CookieServices from "@/services/auth/CookieServices";

export interface IToast {
  id?: number;
  title: string;
  description: string;
  type: "error" | "success" | "info";
}

interface IAppContext {
  isDarkMode: boolean;
  currentPageByUrl: string;
  currentAppPageUrl: string;
  openToast: IToast[];
  segmentedLayout: string | null;
  segmentedLayoutByLocalStorage: string;
  openBanner: boolean;
  canCloseSubscribe: boolean;

  handleCanCloseSubscribe: (mode: boolean) => void;
  handleOpenBanner: (mode: boolean) => void;
  handleAddToastOnArray: (toast: IToast) => void;
  handleResetToast: (id: number) => void;
  handleSetDarkMode: (value: boolean) => void;
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

  const segmentedLayout = useSelectedLayoutSegment();
  const [segmentedLayoutByLocalStorage, setSegmentedLayoutByLocalStorage] =
    useState("");

  //  Contexts
  const { handleOpenModal } = useModal();

  function handleAddToastOnArray({ ...toast }: IToast) {
    const id = Math.round(Math.PI * new Date().getTime());
    setOpenToast((state) => [...state, { ...toast, id: id }]);
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

  const path = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    const pathBase = path.split("/")[2];
    setCurrentPageByUrl(pathBase);
    setCurrentAppPageUrl(path.split("/")[3]);

    console.log("AAA: ", pathBase);

    const lang = CookieServices.getLocale();
    setSegmentedLayoutByLocalStorage(lang?.toString().toLowerCase()!);
  }, [path]);

  return (
    <AppContext.Provider
      value={{
        handleSetDarkMode,
        handleResetToast,
        handleOpenBanner,
        canCloseSubscribe,

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
