"use client";

import { useModal } from "@/providers/app/ModalProvider";

import React from "react";
import BoxSuccessModal from "./box-success";
import DefaultQuestionModal from "./default-question";
import MobileMoreOptions from "../(system)/AFooter/mobile/components/MobileMoreOptions";
import ResourceUnvailableModal from "./resource-unavailable";
import AngolanPaymentDetailsModal from "./angolan-payment-details";
import AddEventModal from "./organizer/add-event";
import ValidateTicketModal from "./organizer/validate-ticket";
import AddTicketModal from "./organizer/add-ticket";
import ListTicketModal from "./organizer/list-ticket";
import ViewTicketModal from "./organizer/view-ticket";
import ApproveTicketModal from "./organizer/approve-ticket";
import AngolanPaymentModal from "./angolan-payment";
import TechnicalSupport from "./technical-support";
import AllowNotificationModal from "./allow-notifications";
import MobileMoreSiteOptions from "../(system)/site/SFooter/mobile/components/MobileMoreSiteOptions";
import ViewFootballEventModal from "./football/view-event";
import ViewFootballTeamModal from "./football/view-team";
import OpenInYourBrowserModal from "./open-in-your-browser/OpenInYourBrowserModal";
import WatchTVModal from "./watch-tv";
import WatchNodAdsModal from "./ads/watch-no-ads";
import UsageSubsModal from "./usage-subs";
import EventAffiliateMaterialModal from "./affiliate/event-affiliate-material";
import EliteAffiliateMaterialModal from "./affiliate/elite-affiliate-material";
import AffiliateInfoModal from "./affiliate/affiliate-info";
import ArtistInfoModal from "./artist/art-info";
import ArtistAddMusicModal from "./artist/art-add-music";
import ArtistViewPolicyModal from "./artist/art-view-policy";
import ArtistSuccessMaterialModal from "./artist/art-success-material";
import CropImageModal from "./cropper-image/easy/crop";
import AdsListenMusicModal from "./ads/ads-listen-music";
import GracefullDonateModal from "./artist/art-gracefull-donate";
import UserNoHaveArtistProfileModal from "./artist/art-no-have-profile-subs";
import ArtistComplaintMusicModal from "./artist/art-complaint-music";
import TicketNotAvailableSubsExpiredModal from "./organizer/ticket-unavailable-subs";
import ArtSendIdentityModal from "./artist/art-send-identity";
import CreatorComplaintPostModal from "./creator/ct-complaint-post";
import CreatorSharePostModal from "./creator/ct-share-post";
import CreatorPublishPostImageModal from "./creator/ct-publish-image";
import CreatorPublishPostEventModal from "./creator/ct-publish-event";
import CreatorPublishPostVideoModal from "./creator/ct-publish-video";
import CreatorPublishPostMusicModal from "./creator/ct-publish-music";
import CreatorInfoModal from "./creator/ct-info";
import CRTCommentDeletionGlobalModal from "./creator/ct-del-comments";
import AffiliateTutorialModal from "./affiliate/aff-tutorials";
import ArtistTutorialModal from "./artist/art-tutorials";
import AffiliateSendIdentityModal from "./affiliate/aff-send-identity";
import OrganizerTutorialModal from "./organizer/org-tutorials";
import ArtistSubscriptionLimit from "./artist/art-subs-limit";

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

    case "ticket-unavailable-subs":
      return <TicketNotAvailableSubsExpiredModal />;

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

    case "view-football-event":
      return <ViewFootballEventModal />;

    case "view-football-team":
      return <ViewFootballTeamModal />;

    case "open-in-your-browser":
      return <OpenInYourBrowserModal />;

    case "watch-tv":
      return <WatchTVModal />;

    case "watch-no-ads":
      return <WatchNodAdsModal />;

    case "usage-susb":
      return <UsageSubsModal />;

    case "cropper-image":
      return <CropImageModal />;

    case "ads-listen-music":
      return <AdsListenMusicModal />;

    case "org-tutorials":
      return <OrganizerTutorialModal />;

    case "event-affiliate-material":
      return <EventAffiliateMaterialModal />;

    case "elite-affiliate-material":
      return <EliteAffiliateMaterialModal />;

    case "affiliate-info":
      return <AffiliateInfoModal />;

    case "aff-tutorials":
      return <AffiliateTutorialModal />;

    case "aff-send-identity":
      return <AffiliateSendIdentityModal />;

    case "artist-info":
      return <ArtistInfoModal />;

    case "art-add-music":
      return <ArtistAddMusicModal />;

    case "art-success-material":
      return <ArtistSuccessMaterialModal />;

    case "art-view-policy":
      return <ArtistViewPolicyModal />;

    case "art-gracefull-donate":
      return <GracefullDonateModal />;

    case "art-no-have-profile-subs":
      return <UserNoHaveArtistProfileModal />;

    case "art-complaint-music":
      return <ArtistComplaintMusicModal />;

    case "art-send-identity":
      return <ArtSendIdentityModal />;

    case "art-tutorials":
      return <ArtistTutorialModal />;

    case "art-subs-limit":
      return <ArtistSubscriptionLimit />;

    case "ct-complaint":
      return <CreatorComplaintPostModal />;

    case "ct-share-post":
      return <CreatorSharePostModal />;

    case "ct-publish-image":
      return <CreatorPublishPostImageModal />;

    case "ct-publish-video":
      return <CreatorPublishPostVideoModal />;

    case "ct-publish-event":
      return <CreatorPublishPostEventModal />;

    case "ct-publish-music":
      return <CreatorPublishPostMusicModal />;

    case "ct-info":
      return <CreatorInfoModal />;

    case "ct-publish-del-comments":
      return <CRTCommentDeletionGlobalModal />;

    default:
      return <></>;
  }
}
