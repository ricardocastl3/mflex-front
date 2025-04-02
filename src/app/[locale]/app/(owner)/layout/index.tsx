"use client";

import LoadingLayout from "@/app/onload-pages/loading-layouts";

import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactNode, useEffect, useState } from "react";

export default function MerchantLayout({ children }: { children: ReactNode }) {
  const { userLogged, isLoadingUserData } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoadingUserData) return;

    if (userLogged && userLogged.user_type == "owner") setIsLoading(false);
  }, [isLoadingUserData, userLogged]);

  if (isLoading) {
    return <LoadingLayout />;
  }

  return <>{children}</>;
}
