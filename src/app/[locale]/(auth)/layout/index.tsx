"use client";

import { CSwitcherTheme } from "@/@components/(theme)/CSwitcherTheme";
import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useRouter } from "next/navigation";

import React from "react";
import CTranslate from "@/@components/(translation)/CCTranslate/CTranslate";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LoadingLayout from "@/app/onload-pages/_loading-layouts";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Contexts
  const { openToast, isScrolledWindow } = useAppProvider();
  const { isLoadingUserData, userLogged } = useAuth();

  const router = useRouter();

  if (isLoadingUserData) return <LoadingLayout />;

  function handleBack() {
    const urlSafed = `${
      LocalStorageServices.getLastPeerViewFlexZone()
        ? `/${langByCookies}/${LocalStorageServices.getLastPeerViewFlexZone()}`
        : `/${langByCookies}`
    }`;

    if (userLogged && userLogged.status == 0) {
      // to reload user informations
      window.location.href = urlSafed;
    } else {
      router.push(urlSafed);
    }
  }

  return (
    <>
      {openToast.length > 0 && <AuSoftUI.Component.Toaster />}
      <AuSoftUI.Modal.ModalOpenProvider />
      <div className="flex flex-col gap-8">
        <div
          className={`  ${
            isScrolledWindow && window.innerWidth <= 765
              ? "border-slate-200 dark:border-slate-800 bg-slate-50/95 backdrop-blur-md dark:bg-ausoft-slate-900/95"
              : "border-transparent bg-transparent"
          } z-10 md:px-12 fixed inset-x-0 px-5 md:py-8 py-4 flex items-center justify-between`}
        >
          <div
            onClick={handleBack}
            className="cursor-pointer text-yellow-600 dark:text-yellow-300 flex items-center gap-4"
          >
            <ReactIcons.AiICon.AiOutlineArrowLeft size={16} />
            <h4 className="font-bold">
              <CTranslateTo eng="Back to home" pt="Voltar" />
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <CTranslate />
            <CSwitcherTheme />
          </div>
        </div>

        <div className="flex flex-col gap-8 h-full justify-center w-full items-center md:pt-32 pt-32 md:pb-28 pb-24">
          <div className={`${isScrolledWindow ? "md:z-10 z-0" : ""} `}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
