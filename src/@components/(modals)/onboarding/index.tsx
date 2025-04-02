"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";

import FirstAccessOnBoarding from "./first-access";
import { useModal } from "@/providers/app/ModalProvider";

export default function Onboarding() {
  //Contexts
  const { isLoadingUserData, userLogged } = useAuth();
  const { handleOnboardingType, onBoarding } = useModal();

  useEffect(() => {
    if (typeof window != "undefined") {
      const hasFirst = localStorage.getItem("onboarding-first-access");
      if (!hasFirst || (hasFirst && hasFirst == "true")) {
        handleOnboardingType({ isFirstAcess: true });
      }
    }
  }, []);

  return (
    <>
      {onBoarding.isFirstAcess && !isLoadingUserData && userLogged && (
        <FirstAccessOnBoarding />
      )}
    </>
  );
}
