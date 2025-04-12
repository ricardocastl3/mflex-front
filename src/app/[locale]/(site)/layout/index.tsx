"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAppProvider } from "@/providers/app/AppProvider";

import LoadingLayout from "@/app/onload-pages/_loading-layouts";
import React from "react";
import SHeader from "@/@components/(system)/site/SHeader";
import SMobileFooter from "@/@components/(system)/site/SFooter/mobile";
import SFooter from "@/@components/(system)/site/SFooter/desktop";
import TechSupport from "@/services/contact-zap/TechSupport";

export default function BweviPayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoadingUserData } = useAuth();
  const { openToast, openBanner } = useAppProvider();

  if (isLoadingUserData) {
    return (
      <div className="bg-ausoft-slate-950 w-screen h-screen flex items-center justify-center">
        <LoadingLayout />
      </div>
    );
  }

  return (
    <>
      {openToast.length > 0 && <AuSoftUI.Component.Toaster />}
      <AuSoftUI.Modal.ModalOpenProvider />
      <div className="flex flex-col w-full">
        <SHeader />

        <div className="flex w-full">
          <div className={`flex-1 md:mb-0 mb-[2rem] w-full`}>{children}</div>
        </div>
        <SMobileFooter />
        <SFooter />
        <TechSupport />
      </div>
    </>
  );
}
