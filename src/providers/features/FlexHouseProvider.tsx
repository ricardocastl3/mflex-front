"use client";

import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { createContext, ReactNode, useContext, useState } from "react";

interface ICRTDelComment {
  id?: string;
  type?: string;
}

type ISelectTab = "feed" | "" | string;
interface IFlexHouseProviderProps {
  selectedFHCreatorPost: ICreatorPost | undefined;
  selectedFHCreatorReel: ICreatorPost | undefined;
  openReelCommentContainer: boolean;
  fetchFHCreatorPost: boolean;
  selectedFHTab: string;
  showPreviewReelModal: boolean;
  selectedDelFHComment: ICRTDelComment;

  handleSelectDelFHComment: (comment: ICRTDelComment) => void;
  handleShowPreviewReelModal: (mode: boolean) => void;
  handleSelectFHTab: (tab: ISelectTab) => void;
  handleFetchFHCreatorPost: (mode: boolean) => void;
  handleOpenReelCommentContainer: (mode: boolean) => void;
  handleSelectFHCreatorPost: (category: ICreatorPost | undefined) => void;
  handleSelectFHCreatorReel: (category: ICreatorPost | undefined) => void;
}

export const FlexHouseContext = createContext({} as IFlexHouseProviderProps);

export function useFlexHouseProvider() {
  const context = useContext(FlexHouseContext);
  return context;
}

export default function FlexHouseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedFHCreatorPost, setSelectedFHCreatorPost] = useState<
    ICreatorPost | undefined
  >();

  const [selectedFHCreatorReel, setSelectedFHCreatorReel] = useState<
    ICreatorPost | undefined
  >();

  const [selectedDelFHComment, setSelectedDelFHComment] =
    useState<ICRTDelComment>({ id: "", type: "" });

  const [selectedFHTab, setSelectedFHTab] = useState<ISelectTab>("feed");

  const [fetchFHCreatorPost, setFetchFHCreatorPost] = useState(false);

  const [openReelCommentContainer, setOpenReelCommentContainer] =
    useState(false);

  const [showPreviewReelModal, setShowPreviewReelModal] = useState(false);

  function handleFetchFHCreatorPost(mode: boolean) {
    setFetchFHCreatorPost(mode);
  }

  function handleOpenReelCommentContainer(mode: boolean) {
    setOpenReelCommentContainer(mode);
  }

  function handleShowPreviewReelModal(mode: boolean) {
    setShowPreviewReelModal(mode);
  }

  function handleSelectFHCreatorPost(post: ICreatorPost | undefined) {
    setSelectedFHCreatorPost(post);
  }

  function handleSelectFHCreatorReel(post: ICreatorPost | undefined) {
    setSelectedFHCreatorReel(post);
  }

  function handleSelectDelFHComment(comment: ICRTDelComment) {
    setSelectedDelFHComment(comment);
  }

  function handleSelectFHTab(tab: ISelectTab) {
    setSelectedFHTab(tab);
  }

  return (
    <FlexHouseContext.Provider
      value={{
        fetchFHCreatorPost,
        openReelCommentContainer,
        selectedFHTab,
        showPreviewReelModal,
        selectedDelFHComment,
        selectedFHCreatorReel,

        handleSelectFHCreatorReel,
        handleSelectDelFHComment,
        handleShowPreviewReelModal,
        handleSelectFHTab,
        handleOpenReelCommentContainer,
        handleFetchFHCreatorPost,
        handleSelectFHCreatorPost,
        selectedFHCreatorPost,
      }}
    >
      {children}
    </FlexHouseContext.Provider>
  );
}
