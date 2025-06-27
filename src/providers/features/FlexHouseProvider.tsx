"use client";

import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { createContext, ReactNode, useContext, useState } from "react";

interface ICRTDelComment {
  id?: string;
  type?: string;
}

interface IFlexHouseProviderProps {
  selectedFHCreatorPost: ICreatorPost | undefined;
  openReelCommentContainer: boolean;
  fetchFHCreatorPost: boolean;
  selectedFHTab: string;
  showPreviewReelDesktop: boolean;
  selectedDelFHComment: ICRTDelComment;

  handleSelectDelFHComment: (comment: ICRTDelComment) => void;
  handleShowPreviewReelDesktop: (mode: boolean) => void;
  handleSelectFHTab: (tab: string) => void;
  handleFetchFHCreatorPost: (mode: boolean) => void;
  handleOpenReelCommentContainer: (mode: boolean) => void;
  handleSelectFHCreatorPost: (category: ICreatorPost | undefined) => void;
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

  const [selectedDelFHComment, setSelectedDelFHComment] =
    useState<ICRTDelComment>({ id: "", type: "" });

  const [selectedFHTab, setSelectedFHTab] = useState("feed");

  const [fetchFHCreatorPost, setFetchFHCreatorPost] = useState(false);

  const [openReelCommentContainer, setOpenReelCommentContainer] =
    useState(false);

  const [showPreviewReelDesktop, setShowPreviewReelDesktop] = useState(false);

  function handleFetchFHCreatorPost(mode: boolean) {
    setFetchFHCreatorPost(mode);
  }

  function handleOpenReelCommentContainer(mode: boolean) {
    setOpenReelCommentContainer(mode);
  }

  function handleShowPreviewReelDesktop(mode: boolean) {
    setShowPreviewReelDesktop(mode);
  }

  function handleSelectFHCreatorPost(post: ICreatorPost | undefined) {
    setSelectedFHCreatorPost(post);
  }

  function handleSelectDelFHComment(comment: ICRTDelComment) {
    setSelectedDelFHComment(comment);
  }

  function handleSelectFHTab(tab: string) {
    setSelectedFHTab(tab);
  }

  return (
    <FlexHouseContext.Provider
      value={{
        fetchFHCreatorPost,
        openReelCommentContainer,
        selectedFHTab,
        showPreviewReelDesktop,
        selectedDelFHComment,

        handleSelectDelFHComment,
        handleShowPreviewReelDesktop,
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
