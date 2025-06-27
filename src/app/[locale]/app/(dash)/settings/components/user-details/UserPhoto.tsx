import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useEffect, useState } from "react";

import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { localImages } from "@/utils/images";

import React from "react";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function UserPhoto() {
  // Contexts
  const {
    handleAddToastOnArray,
    croppedImageSelected,
    handleSelectedCroppImage,
  } = useAppProvider();
  const { handleOpenModal } = useModal();

  const { fetchUserInformations, userLogged } = useAuth();

  const [isUpdatingPic, setIsUpdatingPic] = useState(false);
  const [isDonePic, setIsDonePic] = useState(false);

  useEffect(() => {
    handleSelectedCroppImage({
      modal: "",
      extracted: undefined,
      selected: undefined,
    });
  }, []);

  async function handleUpdatePhoto() {
    try {
      setIsUpdatingPic(true);
      const formData = new FormData();

      const response = await fetch(croppedImageSelected?.extracted!);
      const blob = await response.blob();

      formData.append("avatar", blob);

      await internalApi.postForm("/users/pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      AuSoftUI.Component.ToastifyWithTranslation({
        description_en: "Your profile picture has been successfully updated",
        description_pt: "Sua foto de perfil foi atualizada com sucesso",
        title_en: "Profile Picture Updated Successfully",
        title_pt: "Foto do Perfil atualizada com sucesso",
        toast: handleAddToastOnArray,
        type: "success",
      });

      await fetchUserInformations();
      setIsDonePic(true);
      setIsUpdatingPic(false);
    } catch (err) {
      setIsUpdatingPic(false);
      return CAxiosErrorToastify({
        err,
        openToast: handleAddToastOnArray,
      });
    }
  }

  const avatarProfileUrl = userLogged?.photo || localImages.logos.flexUser.src;

  return (
    <div className="flex justify-start items-center gap-2 mt-4 w-fit">
      {!isUpdatingPic && (
        <>
          <AuSoftUI.Component.Avatar
            width={80}
            src={
              croppedImageSelected?.extracted
                ? croppedImageSelected.extracted
                : avatarProfileUrl
            }
            size={80}
            wsite="h-20 w-20"
          />

          <div className="flex items-center justify-center gap-4 relative">
            <AuSoftUI.UI.Button
              type="button"
              variant={"primary"}
              className="p-1 rounded-full"
            >
              <ReactIcons.BiIcon.BiPhotoAlbum size={25} />
              <input
                name="avatar"
                type="file"
                className="appearance-none w-8 file:cursor-pointer file:border-none  file:text-transparent absolute file:bg-transparent"
                onChange={async (e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file && file.type.startsWith("image/")) {
                    handleSelectedCroppImage({
                      extracted: "",
                      selected: URL.createObjectURL(file),
                      modal: "",
                    });
                    handleOpenModal("cropper-image");
                    setIsDonePic(false);
                  }
                }}
              />
            </AuSoftUI.UI.Button>

            <AuSoftUI.UI.Button
              variant={"green"}
              onClick={handleUpdatePhoto}
              type="submit"
              className={`${
                !isDonePic && croppedImageSelected?.extracted
                  ? "flex"
                  : "hidden"
              } p-1 rounded-full`}
            >
              <ReactIcons.AiICon.AiFillCheckCircle size={24} />
            </AuSoftUI.UI.Button>
          </div>
        </>
      )}

      {isUpdatingPic && (
        <>
          <div className="p-8 animate-spin bg-slate-200 dark:bg-slate-800 dark:text-white rounded-full">
            <ReactIcons.CgIcon.CgSpinnerTwo size={20} />
          </div>
        </>
      )}
    </div>
  );
}
