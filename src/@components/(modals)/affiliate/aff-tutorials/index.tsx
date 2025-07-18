"use client";

import { useModal } from "@/providers/app/ModalProvider";

import React from "react";
import BaseModal from "../../base";
import TutorialModal from "../../tutorials";

export default function AffiliateTutorialModal() {
  //Contexts
  const { handleOpenModal } = useModal();

  function handleCloseBox() {
    handleOpenModal("");
  }

  return (
    <BaseModal callbackClose={() => handleCloseBox()} customDesktop="pb-4">
      <TutorialModal type="affiliate" />
    </BaseModal>
  );
}
