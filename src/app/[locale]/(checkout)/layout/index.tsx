"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { useAppProvider } from "@/providers/app/AppProvider";
import { ReactNode } from "react";
import React from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  const { openToast } = useAppProvider();

  return (
    <div className="">
      {openToast.length > 0 && <AuSoftUI.Component.Toaster />}
      <AuSoftUI.Modal.ModalOpenProvider />
      <div>{children}</div>
    </div>
  );
}
