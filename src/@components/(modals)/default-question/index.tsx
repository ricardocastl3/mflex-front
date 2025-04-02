import { BaseBox } from "@/@components/(box)/BaseBox";
import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { localImages } from "@/utils/images";

import React from "react";
import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

import Image from "next/image";
import { appConfigs } from "@/utils/enums";

export default function DefaultQuestionModal() {
  const { handleOpenModal, modalQuestionData } = useModal();

  function handleCloseBox() {
    modalQuestionData?.callbackClose!();
    handleOpenModal("");
  }

  return (
    <BaseModal callbackClose={() => handleCloseBox()}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-end gap-2">
            <AuSoftUI.Component.AuSoftLogo size={25} />
            <h3 className="text-normal font-bold dark:text-white">
              {appConfigs.title}
            </h3>
          </div>
          <button
            onClick={() => {
              modalQuestionData?.callbackClose!();
              handleOpenModal("");
            }}
          >
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>
        {!modalQuestionData?.isUpdated && (
          <div className="md:py-4 py-6 md:px-6 px-6 w-full flex flex-col items-center gap-2">
            <Image
              src={localImages.vectors.needHelp}
              width={150}
              height={150}
              alt="homem procurando papel"
            />
            <h4 className="font-bold text-lg text-blue-600 text-center dark:text-blue-400">
              <CTranslateTo
                eng={modalQuestionData?.title_en!}
                pt={modalQuestionData?.title_pt!}
              />
            </h4>
            <h4 className="flex md:flex-row flex-col text-center items-center gap-2 text-normal dark:text-slate-400 text-slate-800">
              <CTranslateTo
                eng={modalQuestionData?.description_en!}
                pt={modalQuestionData?.description_pt!}
              />
            </h4>
          </div>
        )}

        {modalQuestionData?.isUpdated && (
          <div className="flex flex-col items-center pb-4">
            <Image
              src={localImages.vectors.manFly}
              width={150}
              height={150}
              alt="AuSoftCoin"
            />
            <h4 className="font-bold pt-3 pb-0.5 text-lg text-blue-600 text-center dark:text-blue-400">
              <CTranslateTo
                eng={modalQuestionData?.updated_title_en!}
                pt={modalQuestionData?.updated_title_pt!}
              />
            </h4>
            <div className="md:w-[30vw] w-[80vw] flex items-center flex-col">
              <h4 className="flex  md:flex-row pt-1 flex-col text-center items-center text-normal dark:text-slate-400 text-slate-800">
                <CTranslateTo
                  eng={modalQuestionData?.updated_description_en!}
                  pt={modalQuestionData?.updated_description_pt!}
                />
              </h4>
            </div>
          </div>
        )}
        <div className="md:py-4 py-4 md:px-4 px-4 border-t border-slate-300 dark:border-slate-800 flex md:flex-row flex-col-reverse items-center md:gap-4 gap-2">
          {modalQuestionData?.isUpdated && (
            <AuSoftUI.UI.Button
              disabled={modalQuestionData?.isSubmitting}
              onClick={() => handleCloseBox()}
              size={"sm"}
              variant={"primary"}
              className="w-full justify-center rounded-full pt-3"
            >
              <CTranslateTo eng="Continue" pt="Continuar" />
            </AuSoftUI.UI.Button>
          )}
          {!modalQuestionData?.isUpdated && (
            <>
              <AuSoftUI.UI.Button
                size={"sm"}
                disabled={modalQuestionData?.isSubmitting}
                onClick={() => handleCloseBox()}
                variant={"outline"}
                className="w-full justify-center rounded-full pt-3"
              >
                <CTranslateTo eng="Cancel" pt="Cancelar" />
              </AuSoftUI.UI.Button>
              <AuSoftUI.UI.Button
                disabled={modalQuestionData?.isSubmitting}
                size={"sm"}
                variant={"primary"}
                onClick={() => modalQuestionData?.handleConfirmCallback!()}
                className="w-full justify-center rounded-full pt-3"
              >
                <AuSoftUI.Component.isFormSubmitting
                  isSubmitting={modalQuestionData?.isSubmitting!}
                />

                {!modalQuestionData?.isSubmitting && (
                  <CTranslateTo
                    eng={modalQuestionData?.action_en!}
                    pt={modalQuestionData?.action_pt!}
                  />
                )}
              </AuSoftUI.UI.Button>
            </>
          )}
        </div>
      </BaseBox>
    </BaseModal>
  );
}
