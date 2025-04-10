import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { localImages } from "@/utils/images";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useTicketProvider } from "@/providers/features/TicketProvider";

import React from "react";
import BaseModal from "../base";
import Image from "next/image";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function BoxSuccessModal() {
  //Contexts
  const { handleOpenModal, boxSuccessText } = useModal();
  const { userLogged } = useAuth();
  const { selectedTicket, handleFetchTicket } = useTicketProvider();
  const {
    selectedTicket: selectedMerchant,
    handleFetchTicket: handleFetchMerchant,
  } = useTicketProvider();

  function handleCloseBox() {
    handleOpenModal("");

    if (selectedMerchant) {
      handleFetchMerchant(false);
    }

    if (selectedTicket) {
      handleFetchTicket(false);
    }
  }

  return (
    <BaseModal callbackClose={() => handleCloseBox()}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-4 py-5 flex flex-col items-center gap-2">
          <Image
            src={localImages.vectors.manFly}
            width={150}
            height={150}
            alt="homem procurando papel"
          />
          <h4 className="font-bold text-lg md:w-[20vw] w-[70vw] text-yellow-600 text-center dark:text-yellow-400 mt-4">
            {boxSuccessText.title_en && boxSuccessText.title_pt && (
              <>
                <CTranslateTo
                  eng={boxSuccessText.title_en}
                  pt={boxSuccessText.title_pt}
                />
              </>
            )}

            {(!boxSuccessText.title_en || !boxSuccessText.title_pt) && (
              <>
                <CTranslateTo
                  eng="Operation successfully"
                  pt="Operação realizada com sucesso"
                />
              </>
            )}
          </h4>
          <h4 className="flex md:flex-row flex-col md:w-[30vw] w-[80vw] text-center items-center gap-2 text-normal dark:text-slate-400 text-slate-800">
            <CTranslateTo
              eng={`${userLogged?.first_name}, ${boxSuccessText.text_en}`}
              pt={`${userLogged?.first_name}, ${boxSuccessText.text_pt}`}
            />
          </h4>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 flex md:flex-row flex-col-reverse items-center md:gap-4 gap-2">
          <AuSoftUI.UI.Button
            onClick={() => handleCloseBox()}
            size={"sm"}
            variant={"primary"}
            className="w-full justify-center rounded-full pt-3"
          >
            <CTranslateTo
              eng="Very good, understood"
              pt="Muito bem, entendido"
            />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
