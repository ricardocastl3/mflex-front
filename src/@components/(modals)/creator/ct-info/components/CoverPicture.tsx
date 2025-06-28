import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactIcons } from "@/utils/icons";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import { localImages } from "@/utils/images";

export default function CoverPictureBox() {
  // Contexts
  const { handleAddToastOnArray } = useAppProvider();

  const { fetchUserInformations, userLogged } = useAuth();

  const [isUpdatingPic, setIsUpdatingPic] = useState(false);
  const [isDonePic, setIsDonePic] = useState(false);
  const [coverUrl, setCoverUrl] = useState("");

  async function handleUpdatePhoto() {
    try {
      setIsUpdatingPic(true);
      const formData = new FormData();

      const response = await fetch(coverUrl);
      const blob = await response.blob();

      formData.append("cover", blob);

      await internalApi.postForm("/creators/cover", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      AuSoftUI.Component.ToastifyWithTranslation({
        description_en: "Your profile picture has been successfully updated",
        description_pt: "Sua foto de perfil foi atualizada com sucesso",
        title_en: "Cover Picture Updated Successfully",
        title_pt: "Foto de capa atualizada com sucesso",
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
        height: "200px",
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${
          coverUrl != ""
            ? coverUrl
            : userLogged?.creator?.cover || localImages.bgs.creatorBg
        })`,
      }}
      className="relative bg-slate-300 dark:bg-slate-800/50  flex flex-col items-center p-16 gap-3 rounded-t-2xl"
    >
      <div className="absolute md:top-20 top-20 flex justify-center items-center flex-col gap-2">
        {!isUpdatingPic && (
          <>
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
                      setCoverUrl(URL.createObjectURL(file));
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
                  !isDonePic && coverUrl != "" ? "flex" : "hidden"
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
