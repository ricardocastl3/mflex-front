"use client";

import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAuth } from "@/providers/auth/AuthProvider";
import { localImages } from "@/utils/images";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";

import React, { useState } from "react";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import ProfilePictureBox from "./components/ProfilePicture";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

interface IProfileInfo {
  tiktok?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  biography?: string;
  name?: string;
}

export default function ArtistInfoModal() {
  //Contexts
  const { handleOpenModal } = useModal();
  const { userLogged, fetchUserInformations } = useAuth();

  const { handleAddToastOnArray } = useAppProvider();

  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({
    biography: userLogged?.artist_profile?.biography,
    facebook: userLogged?.artist_profile?.facebook,
    instagram: userLogged?.artist_profile?.instagram,
    name: userLogged?.artist_profile?.name,
    tiktok: userLogged?.artist_profile?.tiktok,
    youtube: userLogged?.artist_profile?.youtube,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleUpdateProfile() {
    try {
      setIsSubmitting(true);
      await internalApi.post("/artists/info", {
        ...profileInfo,
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
        <div className="h-[75vh] overflow-y-auto rounded-t-xl">
          <ProfilePictureBox
            profile_url={
              userLogged?.artist_profile && userLogged?.artist_profile.photo
                ? userLogged.artist_profile.photo
                : localImages.logos.flexUser.src
            }
          />

          <div className="md:p-2 p-2 flex flex-col gap-4 md:mt-16 mt-16">
            <div className="p-4 flex justify-center flex-col gap-0.5 items-center">
              <h1 className="text-lg font-bold dark:text-white">
                {userLogged?.artist_profile?.name}
              </h1>
              <h1 className="text-base dark:text-slate-300 text-slate-600">
                {userLogged?.artist_profile?.biography}
              </h1>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 border-t border-slate-300 dark:border-slate-700/60 px-5 pt-4 pb-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-sm dark:text-white">
                  <CTranslateTo
                    eng="Your artistic name"
                    pt="Seu nome artístico"
                  />
                </h1>
                <AuSoftUI.UI.TextField.Default
                  placeholder={
                    langByCookies == "pt"
                      ? "Escreva o seu nome artístico..."
                      : "Write your artistic name..."
                  }
                  weight={"md"}
                  className="w-full"
                  value={profileInfo.name}
                  onChange={(e) =>
                    setProfileInfo((state) => ({
                      ...state,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
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
              <div className="flex flex-col gap-2">
                <h1 className="text-sm dark:text-white">
                  <CTranslateTo eng="TikTok" pt="TikTok" />
                </h1>
                <AuSoftUI.UI.TextField.Default
                  placeholder={
                    langByCookies == "pt"
                      ? "Informe o link do perfil do seu tiktok..."
                      : "Enter your tiktok profile link..."
                  }
                  weight={"md"}
                  className="w-full"
                  value={profileInfo.tiktok}
                  onChange={(e) =>
                    setProfileInfo((state) => ({
                      ...state,
                      tiktok: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm dark:text-white">
                  <CTranslateTo eng="Facebook" pt="Facebook" />
                </h1>
                <AuSoftUI.UI.TextField.Default
                  placeholder={
                    langByCookies == "pt"
                      ? "Informe o link do perfil do seu facebook..."
                      : "Enter your facebook profile link..."
                  }
                  weight={"md"}
                  className="w-full"
                  value={profileInfo.facebook}
                  onChange={(e) =>
                    setProfileInfo((state) => ({
                      ...state,
                      facebook: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm dark:text-white">
                  <CTranslateTo eng="YouTube" pt="YouTube" />
                </h1>
                <AuSoftUI.UI.TextField.Default
                  placeholder={
                    langByCookies == "pt"
                      ? "Informe o link do perfil do seu youtube..."
                      : "Enter your youtube profile link..."
                  }
                  weight={"md"}
                  className="w-full"
                  value={profileInfo.youtube}
                  onChange={(e) =>
                    setProfileInfo((state) => ({
                      ...state,
                      youtube: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm dark:text-white">
                  <CTranslateTo eng="Instagram" pt="Instagram" />
                </h1>
                <AuSoftUI.UI.TextField.Default
                  placeholder={
                    langByCookies == "pt"
                      ? "Informe o link do perfil do seu instagram..."
                      : "Enter your instagram profile link..."
                  }
                  weight={"md"}
                  className="w-full"
                  value={profileInfo.youtube}
                  onChange={(e) =>
                    setProfileInfo((state) => ({
                      ...state,
                      youtube: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-slate-300 dark:border-slate-800 px-5 pt-4 pb-5">
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
