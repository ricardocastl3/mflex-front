"use client";

import { useModal } from "@/providers/app/ModalProvider";

import React from "react";
import BoxSuccessModal from "./box-success";
import DefaultQuestionModal from "./default-question";
import MobileMoreOptions from "../(system)/AFooter/mobile/components/MobileMoreOptions";
import ResourceUnvailableModal from "./resource-unavailable";
import AngolanPaymentDetailsModal from "./angolan-payment-details";

export default function ModalOpenProvider() {
  const { openModal } = useModal();

  switch (openModal) {
    case "box-success":
      return <BoxSuccessModal />;

    case "default-question":
      return <DefaultQuestionModal />;

    case "mobile-more-options":
      return <MobileMoreOptions />;

    case "resource-unavailable":
      return <ResourceUnvailableModal />;

    case "angolan-details":
      return <AngolanPaymentDetailsModal />;

    default:
      return <></>;
  }
}
