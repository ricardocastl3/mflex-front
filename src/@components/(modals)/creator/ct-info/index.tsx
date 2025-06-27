"use client";

import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAuth } from "@/providers/auth/AuthProvider";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";

import React, { useState } from "react";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CoverPictureBox from "./components/CoverPicture";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

interface IProfileInfo {
  first_name?: string;
  last_name?: string;
  biography?: string;
}

export default function CreatorInfoModal() {
  //Contexts
  const { handleOpenModal } = useModal();
  const { userLogged, fetchUserInformations } = useAuth();

  const { handleAddToastOnArray } = useAppProvider();

  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({
    biography: userLogged?.creator?.biography,
    last_name: userLogged?.last_name,
    first_name: userLogged?.first_name,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleUpdateProfile() {
    try {
      setIsSubmitting(true);
      await internalApi.put("/creators/info", {
        ...profileInfo,
      });
      AuSoftUI.Component.ToastifyWithTranslation({
        description_en: "Your creator informations went updated successfully",
        description_pt:
          "Os seus dados de criador foram atualizados com sucesso",
        title_en: "Update creator informations",
        title_pt: "Dados do criador atualizados",
        toast: handleAddToastOnArray,
        type: "success",
      });
      await fetchUserInformations();
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ openToast: handleAddToastOnArray, err });
    }
  }

  return (
    <BaseModal callbackClose={() => {}} customDesktop="pb-4">
      <div className="md:w-[70vw] w-[90vw] rounded-t-xl">
        <div className="rounded-t-xl">
          <CoverPictureBox />

          <div className="md:p-2 p-2 flex flex-col gap-4 md:mt-4 mt-4">
            <div className="grid md:grid-cols-31 grid-cols-1 gap-4 md:px-5 px-3 pt-4 pb-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-sm dark:text-white">
                  <CTranslateTo eng="Biography" pt="Biografia" />
                </h1>
                <AuSoftUI.UI.TextField.Default
                  placeholder={
                    langByCookies == "pt"
                      ? "Escreva a sua biografia..."
                      : "Write your biography..."
                  }
                  weight={"md"}
                  className="w-full"
                  value={profileInfo.biography}
                  onChange={(e) =>
                    setProfileInfo((state) => ({
                      ...state,
                      biography: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-slate-300 dark:border-slate-800 md:px-7 px-5 pt-4 pb-5">
          <AuSoftUI.UI.Button
            disabled={isSubmitting}
            onClick={handleUpdateProfile}
            variant={"primary"}
          >
            {!isSubmitting && (
              <CTranslateTo eng="Save Changes" pt="Salvar Alterações" />
            )}
            <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button
            disabled={isSubmitting}
            onClick={() => handleOpenModal("")}
            variant={"outline"}
          >
            <CTranslateTo eng="Close" pt="Fechar" />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </BaseModal>
  );
}
