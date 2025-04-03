"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAppProvider } from "@/providers/app/AppProvider";

import LoadingLayout from "@/app/onload-pages/loading-layouts";
import React from "react";
import SHeader from "@/@components/(system)/site/SHeader";
import SMobileFooter from "@/@components/(system)/site/SFooter/mobile";
import ContactZap from "@/services/contact-zap/ContactZap";

export default function BweviPayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoadingUserData } = useAuth();
  const { openToast, openBanner } = useAppProvider();

  if (isLoadingUserData) {
    return <LoadingLayout />;
  }

  return (
    <>
      {openToast.length > 0 && <AuSoftUI.Component.Toaster />}
      <AuSoftUI.Modal.ModalOpenProvider />
      <div className="flex flex-col w-full">
        <SHeader />

        <div className="flex">
          <div className={`flex-1 md:mb-0 mb-[2rem]`}>{children}</div>
        </div>
        <SMobileFooter />
        <ContactZap />
      </div>
    </>
  );
}
