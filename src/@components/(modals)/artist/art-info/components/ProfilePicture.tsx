import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { localImages } from "@/utils/images";
import { useEffect, useState } from "react";

import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

interface IProfile {
  profile_url: string;
}

export default function ProfilePictureBox({ profile_url }: IProfile) {
  // Contexts
  const {
    handleAddToastOnArray,
    croppedImageSelected,
    handleSelectedCroppImage,
  } = useAppProvider();
  const { handleOpenModal } = useModal();

  const { fetchUserInformations } = useAuth();

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

      await internalApi.postForm("/artists/info", formData, {
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

  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${"https://img.freepik.com/free-vector/vector-music-melody-note-dancing-flow_206725-628.jpg?t=st=1749718672~exp=1749722272~hmac=ed75dd586ba6c29327a9aa38a4c565177a9cf493daab7b06684318a174aed06e&w=740"})`,
      }}
      className="relative flex flex-col items-center p-16 gap-3 rounded-t-2xl"
    >
      <div className="absolute md:top-20 top-20 flex justify-center items-center flex-col gap-2">
        {!isUpdatingPic && (
          <>
            <AuSoftUI.Component.Avatar
              width={80}
              src={
                croppedImageSelected?.extracted
                  ? croppedImageSelected.extracted
                  : profile_url
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
                    //@ts-ignore
                    const file = e.target.files[0];
                    if (file && file.type.startsWith("image/")) {
                      handleSelectedCroppImage({
                        extracted: "",
                        selected: URL.createObjectURL(file),
                        modal: "artist-profile",
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
    </div>
  );
}
