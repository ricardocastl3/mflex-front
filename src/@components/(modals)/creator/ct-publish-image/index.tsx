import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useCreatorProvider } from "@/providers/features/CreatorProvider";
import { useState } from "react";
import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { localImages } from "@/utils/images";
import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { v4 as uuidV4 } from "uuid";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BaseModal from "../../base";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";
import CreatorTextAreaField from "../ct-components/CreatorTextAreaField";
import ChunkUploadService from "@/services/ChunkUploadService";

interface IPostImage {
  image?: string;
  description?: string;
  visibility?: string;
}

export default function CreatorPublishPostImageModal() {
  const { handleOpenModal } = useModal();
  const {
    selectedCreatorPost,
    handleSelectCreatorPost,
    handleFetchCreatorPosts,
  } = useCreatorProvider();
  const { handleFetchFHCreatorPost } = useFlexHouseProvider();
  const { handleAddTextOnBoxSuccess } = useModal();
  const { handleAddToastOnArray } = useAppProvider();
  const { userLogged } = useAuth();

  // Controls
  const [postDetails, setPostDetails] = useState<IPostImage>(
    selectedCreatorPost
      ? {
          description: selectedCreatorPost.description,
          image: selectedCreatorPost.image,
          visibility: selectedCreatorPost.visibility || "public",
        }
      : { description: "", image: "", visibility: "public" }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPostAPI, setSelectedPostAPI] = useState<string>("");

  function handleSetInfo(info: IPostImage) {
    setPostDetails((state) => ({ ...state, ...info }));
  }
  function handleClose() {
    handleOpenModal("");
    handleSelectCreatorPost(undefined);
  }

  async function handleRegister() {
    try {
      if (postDetails.description == "") {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, write something",
          description_pt: "Por favor, escreva alguma coisa",
          title_en: "No Content",
          title_pt: "Sem Contéudo",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmitting(true);
      const formData = new FormData();

      if (postDetails.image != "") {
        formData.append("hasImage", "yes");
      }

      if (selectedCreatorPost) {
        formData.append("post_id", selectedCreatorPost.id);
      }

      if (selectedPostAPI != "") {
        formData.append("post_id", selectedPostAPI);
      }

      formData.append("description", postDetails.description!);
      formData.append("visibility", postDetails.visibility!);

      const resp = await internalApi.postForm("/creators/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSelectedPostAPI(resp.data.id);
      const fileId = uuidV4();

      if (postDetails.image != "") {
        const res = await fetch(postDetails.image!);
        const blob = await res.blob();

        const isValid = ChunkUploadService.validateFileSize({
          blob,
          maxMB: 8,
          toast: handleAddToastOnArray,
          titlePt: "Imagem muito grande",
          titleEn: "Image too large",
          descriptionPt: "O tamanho da imagem precisa ter no máximo 8MB",
          descriptionEn: "The image size must be a maximum of 8MB",
        });

        if (!isValid) return;

        const { success } = await ChunkUploadService.uploadCreatorPostByChunks({
          file: blob,
          fileId,
          type: "image",
          postId: selectedCreatorPost?.id || resp.data.id,
        });

        if (!success) {
          return AuSoftUI.Component.ToastifyWithTranslation({
            description_en: "Please try again",
            description_pt: "Por favor, tente novamente",
            title_en: "Error loading image",
            title_pt: "Erro no carregamento da imagem",
            toast: handleAddToastOnArray,
            type: "error",
          });
        }
      }

      const message = {
        pt: {
          add: {
            text: "Muitos parabéns! A sua postagem foi criada com sucesso",
            title: "Postagem adicionado com sucesso",
          },
          update: {
            text: "A sua postagem foi atualizada com sucesso",
            title: "Postagem atualizada com sucesso",
          },
        },
        en: {
          add: {
            text: "Many congratulations! Your post has been registered successfully",
            title: "Post added successfully",
          },
          update: {
            text: "Your post has been updated successfully",
            title: "Post updated successfully",
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

  const cataloguePreview = localImages.vectors.imageEmpty.src;

  return (
    <BaseModal callbackClose={handleClose} customDesktop="pt-2">
      <div className="flex flex-col justify-between md:w-[50vw] w-[90vw] relative">
        <div className="flex items-center justify-between md:p-4 p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {!selectedCreatorPost && (
              <h4 className="text-base dark:text-white font-bold">
                <CTranslateTo eng="New Post" pt="Nova Postagem" />
              </h4>
            )}
            {selectedCreatorPost && (
              <h3 className="text-base font-bold dark:text-white">
                <CTranslateTo eng="Edit Post" pt="Editar Postagem" />
              </h3>
            )}
          </div>
          <button onClick={() => handleClose()}>
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>
        <div className="flex flex-col gap-3 p-4">
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
                value={postDetails.visibility}
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
          <div className="flex flex-col gap-4 md:h-[37vh] h-[34vh] overflow-y-auto pt-2 md:pr-1 pr-0">
            <div className="flex flex-col gap-2">
              <CreatorTextAreaField
                hasImage={postDetails.image ? true : false}
                onChange={(e) => handleSetInfo({ description: e })}
                value={postDetails.description}
              />
            </div>
            {postDetails.image && (
              <div className="flex gap-4 items-center justify-center w-full ">
                <div className="rounded-xl relative border border-slate-200 dark:border-slate-800 md:w-[400px] w-[100px]">
                  <div
                    style={{
                      objectFit: "fill",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundImage: `url(${
                        postDetails.image != ""
                          ? postDetails.image
                          : selectedCreatorPost &&
                            selectedCreatorPost.image != ""
                          ? selectedCreatorPost.image
                          : cataloguePreview
                      })`,
                    }}
                    className="rounded-xl md:h-[200px] h-[100px] md:w-[400px] w-[100px] bg-slate-200 dark:bg-slate-700/50"
                  ></div>
                  <div className="absolute top-0 right-0 md:mx-2 mx-1 md:my-2 my-1">
                    <button
                      onClick={() => {
                        handleSetInfo({ image: "" });
                      }}
                      className="px-2 bg-black/60 text-base font-bold rounded-full text-white"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="mx-4 mt-2 gap-4 flex items-center rounded-lg px-4 py-3 border border-slate-200 dark:border-slate-800">
            <h1 className="dark:text-white text-sm">
              <CTranslateTo
                eng="Add in yout post"
                pt="Adicione na tua publicação"
              />
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
                      if (file && file.type.startsWith("image/")) {
                        if (file && file.size > 8 * 1024 * 1024) {
                          return AuSoftUI.Component.ToastifyWithTranslation({
                            description_en:
                              "The image size must be a maximum of 8MB",
                            description_pt:
                              "O tamanho do vídeo precisa ser no máximo 8MB",
                            title_en: "Image too large",
                            title_pt: "Imagem muito grande",
                            toast: handleAddToastOnArray,
                            type: "error",
                          });
                        }
                        const url = URL.createObjectURL(file);
                        handleSetInfo({ image: url });
                      }
                    }
                  }
                }}
              />
              <AuSoftUI.UI.Button
                type="button"
                variant={"primary"}
                className="rounded-full pt-1.5 pb-2 cursor-pointer px-2 z-20"
              >
                <ReactIcons.AiICon.AiFillFileImage size={16} />
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
