"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useWebPush } from "@/hooks/useWebPush";

import AHeader from "@/@components/(system)/AHeader";
import LoadingLayout from "@/app/onload-pages/loading-layouts";
import React from "react";
import ASidebar from "@/@components/(system)/ASidebar";
import AMobileFooter from "@/@components/(system)/AFooter/mobile";
import ABanner from "@/@components/(system)/ABanner";

export default function MFlexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoadingUserData, userLogged } = useAuth();
  const { openToast, openBanner } = useAppProvider();
  useWebPush(userLogged?.id!);

  if (isLoadingUserData) {
    return <LoadingLayout />;
  }

  return (
    <>
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
          <div
            className={`${
              openBanner ? "md:mt-[7rem] mt-28" : "md:mt-[5.2rem] mt-20"
            } flex-1 md:mb-0 mb-[2rem] md:mx-8 mx-5`}
          >
            {children}
          </div>
        </div>

        <AMobileFooter />
      </div>
    </>
  );
}
