import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useCreatorProvider } from "@/providers/features/CreatorProvider";
import { useState } from "react";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { localImages } from "@/utils/images";
import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BaseModal from "../../base";
import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";

interface IPostImage {
  image?: string;
  description?: string;
  visibility?: string;
}

export default function CreatorPublishPostImageModal() {
  const { handleOpenModal } = useModal();
  const { selectedCreatorPost, handleFetchCreatorPosts } = useCreatorProvider();
  const { handleFetchFHCreatorPost } = useFlexHouseProvider();
  const { handleAddTextOnBoxSuccess } = useModal();
  const { handleAddToastOnArray } = useAppProvider();

  // Controls
  const [postDetails, setPostDetails] = useState<IPostImage>(
    selectedCreatorPost
      ? {
          description: selectedCreatorPost.description,
          image: "",
          visibility: selectedCreatorPost.visibility,
        }
      : { description: "", image: "", visibility: "public" }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSetInfo(info: IPostImage) {
    setPostDetails((state) => ({ ...state, ...info }));
  }
  function handleClose() {
    handleOpenModal("");
  }

  async function handleRegister() {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      if (postDetails.image != "") {
        const res = await fetch(postDetails.image!);
        const blob = await res.blob();
        formData.append("image", blob);
      }

      if (selectedCreatorPost) {
        formData.append("post_id", selectedCreatorPost.id);
      }

      formData.append("description", postDetails.description!);
      formData.append("visibility", postDetails.visibility!);

      await internalApi.postForm("/creators/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
        <div className="flex items-center justify-between md:p-4 p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <AAuSoftLogo size={40} />
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
        <div className="p-4 flex flex-col gap-4 h-[60vh] overflow-y-auto">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="rounded-xl w-fit">
              <div
                style={{
                  height: "150px",
                  width: "200px",
                  objectFit: "fill",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundImage: `url(${
                    postDetails.image != ""
                      ? postDetails.image
                      : selectedCreatorPost && selectedCreatorPost.image != ""
                      ? selectedCreatorPost.image
                      : cataloguePreview
                  })`,
                }}
                className="rounded-xl bg-slate-200 dark:bg-slate-700/50"
              ></div>
            </div>
            <div className="relative cursor-pointer">
              <input
                name="avatar"
                className="absolute top-0 right-0 file:border-transparent cursor-pointer left-0 file:bg-transparent file:text-transparent"
                type="file"
                onChange={(e) => {
                  if (e.target.files?.length! > 0) {
                    if (e.target?.files) {
                      const file = e.target?.files[0];
                      if (file && file.type.startsWith("image/")) {
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
                <ReactIcons.AiICon.AiFillEdit size={20} />
              </AuSoftUI.UI.Button>
            </div>
          </div>

          <div className="grid md:grid-cols-1 grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-base dark:text-white">
                <CTranslateTo eng="Visibility" pt="Visibilidade" />
              </h1>
              <AuSoftUI.UI.Select
                value={postDetails.visibility}
                onChange={(e) => {
                  handleSetInfo({ visibility: e.target.value });
                }}
                className="w-full"
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
            <h1 className="text-base dark:text-white">
              <CTranslateTo eng="Descrição" pt="Description" />
            </h1>
            <AuSoftUI.UI.TextField.TextArea
              value={postDetails.description}
              onChange={(e) => handleSetInfo({ description: e.target.value })}
              placeholder={`${
                langByCookies == "pt"
                  ? "Escreva uma descrição..."
                  : "Write your description..."
              }`}
              className="w-full h-[40vh]"
              weight={"md"}
            />
          </div>
        </div>
        <div className="p-4 flex items-center gap-4 border-t border-slate-200 dark:border-slate-800">
          <AuSoftUI.UI.Button
            disabled={isSubmitting}
            onClick={handleRegister}
            variant={"primary"}
            size={"sm"}
          >
            {!isSubmitting && !selectedCreatorPost && (
              <CTranslateTo eng="Publish" pt="Publicar" />
            )}
            {!isSubmitting && selectedCreatorPost && (
              <CTranslateTo eng="Save Changes" pt="Salvar Alterações" />
            )}
            <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button
            disabled={isSubmitting}
            onClick={handleClose}
            variant={"outline"}
            size={"sm"}
          >
            <CTranslateTo eng="Cancel" pt="Cancelar" />
          </AuSoftUI.UI.Button>
          <ARegisterProgress isOpened={isSubmitting} rounded="all" />
        </div>
      </div>
    </BaseModal>
  );
}
