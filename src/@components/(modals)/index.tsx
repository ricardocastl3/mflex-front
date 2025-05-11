"use client";

import { useModal } from "@/providers/app/ModalProvider";

import React from "react";
import BoxSuccessModal from "./box-success";
import DefaultQuestionModal from "./default-question";
import MobileMoreOptions from "../(system)/AFooter/mobile/components/MobileMoreOptions";
import ResourceUnvailableModal from "./resource-unavailable";
import AngolanPaymentDetailsModal from "./angolan-payment-details";
import AddEventModal from "./add-event";
import ValidateTicketModal from "./validate-ticket";
import AddTicketModal from "./add-ticket";
import ListTicketModal from "./list-ticket";
import ViewTicketModal from "./view-ticket";
import ApproveTicketModal from "./approve-ticket";
import AngolanPaymentModal from "./angolan-payment";
import TechnicalSupport from "./technical-support";
import AllowNotificationModal from "./allow-notifications";
import MobileMoreSiteOptions from "../(system)/site/SFooter/mobile/components/MobileMoreSiteOptions";

export default function ModalOpenProvider() {
  const { openModal } = useModal();

  switch (openModal) {
    case "box-success":
      return <BoxSuccessModal />;

    case "default-question":
      return <DefaultQuestionModal />;

    case "mobile-more-options":
      return <MobileMoreOptions />;

    case "mobile-site-more-options":
      return <MobileMoreSiteOptions />;

    case "resource-unavailable":
      return <ResourceUnvailableModal />;

    case "angolan-details":
      return <AngolanPaymentDetailsModal />;

    case "add-event":
      return <AddEventModal />;

    case "validate-ticket":
      return <ValidateTicketModal />;

    case "add-ticket":
      return <AddTicketModal />;

    case "list-ticket":
      return <ListTicketModal />;

    case "view-ticket":
      return <ViewTicketModal />;

    case "approve-ticket":
      return <ApproveTicketModal />;

    case "angolan-payment-modal":
      return <AngolanPaymentModal />;

    case "technical-support":
      return <TechnicalSupport />;

    case "allow-notifications":
      return <AllowNotificationModal />;

    default:
      return <></>;
  }
}
