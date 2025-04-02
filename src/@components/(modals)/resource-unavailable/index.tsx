import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { localImages } from "@/utils/images";
import { useAuth } from "@/providers/auth/AuthProvider";

import BaseModal from "../base";
import Image from "next/image";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function ResourceUnvailableModal() {
  const { handleOpenModal, resourceUnAvailableText } = useModal();
  const { userLogged } = useAuth();

  return (
    <BaseModal callbackClose={() => handleOpenModal("")}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-8 py-5 flex flex-col items-center gap-2">
          <Image
            src={localImages.vectors.manSearch}
            width={150}
            height={150}
            alt="homem procurando papel"
          />
          <h4 className="font-bold text-lg text-violet-600 text-center dark:text-violet-400">
            <CTranslateTo
              eng={
                resourceUnAvailableText.title_en
                  ? resourceUnAvailableText.title_en
                  : "Resource Unavailable"
              }
              pt={
                resourceUnAvailableText.title_pt
                  ? resourceUnAvailableText.title_pt
                  : "Recurso Indisponível"
              }
            />
          </h4>
          <h4 className="flex md:flex-row flex-col text-center items-center gap-2 text-normal dark:text-slate-400 text-slate-800">
            <CTranslateTo
              eng={`${userLogged?.first_name}, ${resourceUnAvailableText.text_en}`}
              pt={`${userLogged?.first_name}, ${resourceUnAvailableText.text_pt}`}
            />
          </h4>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 flex md:flex-row flex-col-reverse items-center md:gap-4 gap-2">
          <AuSoftUI.UI.Button
            onClick={() => handleOpenModal("")}
            size={"sm"}
            variant={"primary"}
            className="w-full justify-center rounded-full pt-3"
          >
            <CTranslateTo eng="Close" pt="Fechar" />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
