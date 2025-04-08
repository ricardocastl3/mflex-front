"use client";

import React, { createContext, useContext, useState } from "react";

interface IBoxTextLocale {
  text_pt: string;
  text_en: string;
  title_en?: string;
  title_pt?: string;
}

type modalType =
  | "add-event"
  | "add-ticket"
  | "list-ticket"
  | "validate-ticket"
  | "box-success"
  | "default-question"
  | "checkout-success"
  | "checkout-failed"
  | "subscribe"
  | "mobile-more-options"
  | "resource-unavailable"
  | "blocked-extension"
  | "angolan-details"
  | "";

interface IOnboardingType {
  isFirstAcess?: boolean;
}

interface IModalQuestion {
  action_pt?: string;
  action_en?: string;
  title_en?: string;
  title_pt?: string;
  description_pt?: string;
  description_en?: string;
  updated_title_en?: string;
  updated_title_pt?: string;
  updated_description_pt?: string;
  updated_description_en?: string;
  isUpdated?: boolean;
  isSubmitting?: boolean;
  handleConfirmCallback?: () => void;
  callbackClose?: () => void;
}

interface IModalContextProps {
  openModal: modalType;
  boxSuccessText: IBoxTextLocale;
  modalQuestionData: IModalQuestion | undefined;
  resourceUnAvailableText: IBoxTextLocale;
  onBoarding: IOnboardingType;

  handleOnboardingType: (type: IOnboardingType) => void;
  handleSetResourceUnAvailableText: (texts: IBoxTextLocale) => void;
  handleAddModalQuestionData: (data: IModalQuestion | undefined) => void;
  handleAddTextOnBoxSuccess: (texts: IBoxTextLocale) => void;
  handleOpenModal: (modal: modalType) => void;
}

const ModalContext = createContext({} as IModalContextProps);

export function useModal() {
  const context = useContext(ModalContext);
  return context;
}

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openModal, setOpenModal] = useState<modalType>("");
  const [modalQuestionData, setModalQuestionData] = useState<
    IModalQuestion | undefined
  >();
  const [boxSuccessText, setBoxSuccessText] = useState<IBoxTextLocale>({
    text_en: "",
    text_pt: "",
    title_en: "",
    title_pt: "",
  });
  const [resourceUnAvailableText, setResourceUnAvailableText] =
    useState<IBoxTextLocale>({
      text_en: "",
      text_pt: "",
    });

  const [onBoarding, setOnBoarding] = useState<IOnboardingType>({});

  function handleAddTextOnBoxSuccess({ ...texts }: IBoxTextLocale) {
    setBoxSuccessText(texts);
  }
  function handleAddModalQuestionData(data: IModalQuestion | undefined) {
    setModalQuestionData((state) => ({ ...state, ...data }));
  }

  function handleOpenModal(modal: modalType) {
    setOpenModal(modal);
  }

  function handleOnboardingType(type: IOnboardingType) {
    setOnBoarding((state) => ({ ...state, ...type }));
  }

  function handleSetResourceUnAvailableText({ ...texts }: IBoxTextLocale) {
    setResourceUnAvailableText(texts);
  }

  return (
    <ModalContext.Provider
      value={{
        handleOpenModal,
        handleAddTextOnBoxSuccess,
        handleAddModalQuestionData,
        handleSetResourceUnAvailableText,
        handleOnboardingType,

        onBoarding,
        modalQuestionData,
        resourceUnAvailableText,
        boxSuccessText,
        openModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
