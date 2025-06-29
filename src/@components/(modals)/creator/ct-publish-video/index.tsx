import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useCreatorProvider } from "@/providers/features/CreatorProvider";
import { useState } from "react";
import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { localImages } from "@/utils/images";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BaseModal from "../../base";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";
import CreatorTextAreaField from "../ct-components/CreatorTextAreaField";

interface IPostVideo {
  url?: string;
  description?: string;
  visibility?: string;
}

export default function CreatorPublishPostVideoModal() {
  const { handleOpenModal } = useModal();
  const { selectedCreatorPost, handleFetchCreatorPosts } = useCreatorProvider();
  const { handleFetchFHCreatorPost } = useFlexHouseProvider();
  const { handleAddTextOnBoxSuccess } = useModal();
  const { handleAddToastOnArray } = useAppProvider();
  const { userLogged } = useAuth();

  // Controls
  const [videoDetails, setVideoDetails] = useState<IPostVideo>(
    selectedCreatorPost
      ? {
          description: selectedCreatorPost.description,
          visibility: selectedCreatorPost.visibility || "public",
        }
      : { description: "", url: "", visibility: "public" }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSetInfo(info: IPostVideo) {
    setVideoDetails((state) => ({ ...state, ...info }));
  }
  function handleClose() {
    handleOpenModal("");
  }

  async function handleRegister() {
    try {
      if (!selectedCreatorPost && videoDetails.url == "") {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, select an video",
          description_pt: "Por favor, selecione o vídeo",
          title_en: "No Video",
          title_pt: "Sem Vídeo",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmitting(true);
      const formData = new FormData();

      if (videoDetails.url != "") {
        const res = await fetch(videoDetails.url!);
        const blob = await res.blob();
        formData.append("video", blob);
      }

      if (selectedCreatorPost) {
        formData.append("video_id", selectedCreatorPost.id);
      }

      formData.append("description", videoDetails.description!);
      formData.append("visibility", videoDetails.visibility!);

      await internalApi.postForm("/creators/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const message = {
        pt: {
          add: {
            text: "Muitos parabéns! O seu video foi carregado com sucesso",
            title: "Vídeo adicionado com sucesso",
          },
          update: {
            text: "O seu vídeo foi atualizado com sucesso",
            title: "Vídeo atualizado com sucesso",
          },
        },
        en: {
          add: {
            text: "Many congratulations! Your video has been registered successfully",
            title: "Video added successfully",
          },
          update: {
            text: "Your video has been updated successfully",
            title: "Video updated successfully",
          },
        },
      };

      if (selectedCreatorPost) {
        handleAddTextOnBoxSuccess({
          text_en: message.en.update.text,
          text_pt: message.pt.update.text,
          title_en: message.en.update.title,
          title_pt: message.pt.update.title,
        });
      } else {
        handleAddTextOnBoxSuccess({
          text_en: message.en.add.text,
          text_pt: message.pt.add.text,
          title_en: message.en.add.title,
          title_pt: message.pt.add.title,
        });
      }

      handleOpenModal("box-success");
      handleFetchCreatorPosts(true);
      setIsSubmitting(false);
      handleFetchFHCreatorPost(true);
      setTimeout(() => {
        handleFetchFHCreatorPost(false);
      }, 100);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <BaseModal callbackClose={handleClose} customDesktop="pt-2">
      <div className="flex flex-col justify-between md:w-[50vw] w-[90vw] relative">
        <div className="flex items-center justify-between md:p-4 p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {!selectedCreatorPost && (
              <h4 className="dark:text-white font-bold text-base">
                <CTranslateTo eng="Upload Video" pt="Carregar Vídeo" />
              </h4>
            )}
            {selectedCreatorPost && (
              <h3 className="text-base font-bold dark:text-white">
                <CTranslateTo eng="Edit Video" pt="Editar Vídeo" />
              </h3>
            )}
          </div>
          <button onClick={() => handleClose()}>
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-4 h-[50vh] overflow-y-auto">
          <div className="flex items-center gap-2">
            <div>
              <AuSoftUI.Component.Avatar
                size={50}
                width={50}
                wsite=""
                src={userLogged?.photo || localImages.logos.flexUser.src}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-sm font-bold dark:text-white">
                {`${userLogged?.first_name} ${userLogged?.last_name}`}
              </h1>
              <AuSoftUI.UI.Select
                value={videoDetails.visibility}
                onChange={(e) => {
                  handleSetInfo({ visibility: e.target.value });
                }}
                className="w-fit py-1 text-xs"
                weight={"md"}
              >
                <option
                  value={"public"}
                  className="dark:bg-ausoft-slate-950 dark:text-white"
                >
                  <CTranslateTo eng="Public" pt="Público" />
                </option>
                <option
                  value={"private"}
                  className="dark:bg-ausoft-slate-950 dark:text-white"
                >
                  <CTranslateTo eng="Private" pt="Privado" />
                </option>
              </AuSoftUI.UI.Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <CreatorTextAreaField
              hasImage={videoDetails.url || selectedCreatorPost ? true : false}
              onChange={(e) => handleSetInfo({ description: e })}
              value={videoDetails.description}
            />
          </div>
          {(videoDetails.url || selectedCreatorPost) && (
            <div className="flex gap-4 items-center justify-center w-full ">
              <div className="rounded-xl flex justify-center items-center relative">
                <div className="bg-green-200/30 dark:bg-green-800/20 items-center flex rounded-xl flex-col gap-2 text-sm font-bold dark:text-green-500 text-green-600 p-8 ">
                  <ReactIcons.PiIcon.PiPlayFill size={20} className="" />
                  {/* <CTranslateTo eng="Selected Video" pt="Video selecionado" /> */}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          <div className="mx-4 mt-2 gap-4 flex items-center rounded-lg p-4 border border-slate-200 dark:border-slate-800">
            <h1 className="dark:text-white">
              <CTranslateTo eng="Add in your video" pt="Adicione o seu vídeo" />
            </h1>
            <div className="relative cursor-pointer">
              <input
                name="avatar"
                className="absolute cursor-pointer top-0 right-0 file:border-transparent left-0 file:bg-transparent file:text-transparent"
                type="file"
                onChange={(e) => {
                  if (e.target.files?.length! > 0) {
                    if (e.target?.files) {
                      const file = e.target?.files[0];
                      if (file) {
                        // Check MIME types for common video types
                        const isValidMimeType = file.type.startsWith("video/");

                        // Check file extension as fallback
                        const fileName = file.name.toLowerCase();
                        const isValidExtension =
                          fileName.endsWith(".mp4") ||
                          fileName.endsWith(".webm") ||
                          fileName.endsWith(".mov") ||
                          fileName.endsWith(".avi");
                        if (isValidMimeType || isValidExtension) {
                          const url = URL.createObjectURL(file);
                          handleSetInfo({ url });
                        }
                      }
                    }
                  }
                }}
              />
              <AuSoftUI.UI.Button
                type="button"
                variant={"destructive"}
                className="rounded-full pt-1.5 pb-2 cursor-pointer px-2 z-20"
              >
                <ReactIcons.AiICon.AiFillVideoCamera size={20} />
              </AuSoftUI.UI.Button>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <AuSoftUI.UI.Button
              disabled={isSubmitting}
              onClick={handleRegister}
              variant={"primary"}
              size={"sm"}
              className="w-full font-bold text-base justify-center"
            >
              {!isSubmitting && !selectedCreatorPost && (
                <CTranslateTo eng="Publish" pt="Publicar" />
              )}
              {!isSubmitting && selectedCreatorPost && (
                <CTranslateTo eng="Save Changes" pt="Salvar Alterações" />
              )}
              <AuSoftUI.Component.isFormSubmitting
                isSubmitting={isSubmitting}
              />
            </AuSoftUI.UI.Button>

            <ARegisterProgress isOpened={isSubmitting} rounded="all" />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
