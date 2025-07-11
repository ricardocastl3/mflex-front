"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useWebPush } from "@/hooks/useWebPush";
import { langByCookies } from "@/http/axios/api";
import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";

import AHeader from "@/@components/(system)/AHeader";
import LoadingLayout from "@/app/onload-pages/_loading-layouts";
import React, { useEffect, useState } from "react";
import ASidebar from "@/@components/(system)/ASidebar";
import AMobileFooter from "@/@components/(system)/AFooter/mobile";
import ABanner from "@/@components/(system)/ABanner";
import useViewPdf from "@/@components/(system)/AAdobePdfReader/useViewPdf";
import useServerStats from "@/hooks/api/useServerStats";
import NewAppVersionBanner from "@/@components/(box)/new-app-version";
import ReelsHouseModal from "../(flex-house)/flex-house/components/reels";

export default function MFlexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoadingUserData, userLogged, handleLogout } = useAuth();
  const { openToast, openBanner } = useAppProvider();
  const { showPreviewReelModal } = useFlexHouseProvider();

  useWebPush(userLogged?.id!);
  useViewPdf();
  useServerStats({ user: userLogged });

  // Controls
  const [isLoadingAll, setIsLoadingAll] = useState(true);

  useEffect(() => {
    if (!userLogged) return;

    if (userLogged?.status == 0) {
      window.location.href = `/${langByCookies}/confirm-account`;
      return;
    }

    if (userLogged?.status == 3) return handleLogout();

    if (userLogged?.status == 1) return setIsLoadingAll(false);
  }, [userLogged]);

  if (isLoadingUserData || isLoadingAll) {
    return <LoadingLayout />;
  }

  return (
    <>
      {showPreviewReelModal && <ReelsHouseModal />}

      <NewAppVersionBanner />

      {openToast.length > 0 && <AuSoftUI.Component.Toaster />}
      <AuSoftUI.Modal.ModalOpenProvider />

      <div className="flex flex-col w-full">
        <div
          className={`${
            openBanner ? "pb-5" : "pb-0"
          } fixed z-30 top-0 inset-x-0 flex transition-all duration-500 flex-col bg-gradient-to-r dark:from-orange-700 from-orange-500 dark:to-violet-800 to-violet-500`}
        >
          {openBanner && <ABanner />}
          <AHeader />
        </div>
        <div className="flex">
          <ASidebar />
          <div className={`flex-1 md:mb-0 mb-[2rem] md:px-8 px-5`}>
            {children}
          </div>
        </div>
        <AMobileFooter />
      </div>
    </>
  );
}
