import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { localImages } from "@/utils/images";
import { useCategoryProvider } from "@/providers/features/CategoryProvider";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useMusicProvider } from "@/providers/features/MusicProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { v4 as uuidV4 } from "uuid";

import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";
import SelectCategoryDropdown from "../../organizer/add-event/category";
import MusicSchemas from "@/services/schemas/MusicSchema";
import ChunkUploadService from "@/services/ChunkUploadService";

export default function ArtistAddMusicModal() {
  // Contexts
  const { selectedMusic, handleFetchMusic } = useMusicProvider();
  const { handleAddToastOnArray } = useAppProvider();
  const { selectedCategory, handleSelectCategory } = useCategoryProvider();
  const { handleOpenModal, handleAddTextOnBoxSuccess } = useModal();
  const { handleFetchCurrentArtistSubs } = useAuth();

  // Controls
  const [coverMusic, setCoverMusic] = useState("");
  const [soundMusic, setSoundMusic] = useState("");
  const [selectedMusicAPI, setSelectedMusicAPI] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forms
  const schema = new MusicSchemas(langByCookies);
  type formData = z.infer<typeof schema.musicSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema.musicSchema),
    defaultValues: selectedMusic
      ? {
          description: selectedMusic.description,
          title: selectedMusic.title,
        }
      : {
          description: "",
          title: "",
        },
  });

  async function handleRegister(data: formData) {
    try {
      if (!selectedCategory) {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, select an category",
          description_pt: "Por favor, selecione uma categoria",
          title_en: "No Category",
          title_pt: "Sem categoria",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      if (!selectedMusic && coverMusic == "") {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, select an music cover",
          description_pt:
            "Por favor, selecione uma imagem para a capa da música",
          title_en: "No Image",
          title_pt: "Sem Imagem",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      if (!selectedMusic && soundMusic == "") {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, select an audio",
          description_pt: "Por favor, selecione o áudio da sua música",
          title_en: "No Audio",
          title_pt: "Sem Áudio",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmitting(true);
      const formData = new FormData();

      if (selectedMusic) {
        formData.append("music_id", selectedMusic.id);
      }

      if (selectedMusicAPI != "") {
        formData.append("music_id", selectedMusicAPI);
      }

      formData.append("category_id", selectedCategory.id);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const resp = await internalApi.postForm("/artists/musics", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSelectedMusicAPI(resp.data.id);

      const fileId = uuidV4();

      if (coverMusic != "") {
        const res = await fetch(coverMusic);
        const blob = await res.blob();

        const { success } = await ChunkUploadService.uploadMusicByChunks({
          file: blob,
          fileId,
          type: "cover",
          musicId: selectedMusic?.id || resp.data.id, // se estiver editando
        });

        if (!success) {
          return AuSoftUI.Component.ToastifyWithTranslation({
            description_en: "Please, select an audio",
            description_pt: "Por favor, selecione o áudio da sua música",
            title_en: "No Audio",
            title_pt: "Sem Áudio",
            toast: handleAddToastOnArray,
            type: "error",
          });
        }
      }

      if (soundMusic != "") {
        const res = await fetch(soundMusic);
        const blob = await res.blob();

        const { success } = await ChunkUploadService.uploadMusicByChunks({
          file: blob,
          fileId,
          type: "sound",
          musicId: selectedMusic?.id || resp.data.id,
        });

        if (!success) {
          return AuSoftUI.Component.ToastifyWithTranslation({
            description_en: "Please try again",
            description_pt: "Por favor, tente novamente",
            title_en: "Error loading music",
            title_pt: "Erro no carregamento da música",
            toast: handleAddToastOnArray,
            type: "error",
          });
        }
      }

      const message = {
        pt: {
          add: {
            text: "Muitos parabéns! A sua música foi cadastrada com sucesso",
            title: "Música adicionada com sucesso",
          },
          update: {
            text: "A sua música foi atualizada com sucesso",
            title: "Música atualizada com sucesso",
          },
        },
        en: {
          add: {
            text: "Many congratulations! Your music has been registered successfully",
            title: "Music added successfully",
          },
          update: {
            text: "Your music has been updated successfully",
            title: "Music updated successfully",
          },
        },
      };

      if (selectedMusic) {
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

      handleFetchMusic(true);
      setIsSubmitting(false);

      handleFetchCurrentArtistSubs(true);
      setTimeout(() => {
        handleFetchCurrentArtistSubs(false);
      }, 500);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  function handleClose() {
    handleOpenModal("");
    handleSelectCategory(undefined);
  }

  useEffect(() => {
    if (!selectedMusic) return;
    handleSelectCategory(selectedMusic.category);
  }, [selectedMusic]);

  const coverPreview = localImages.vectors.imageEmpty.src;

  return (
    <BaseModal callbackClose={handleClose} customDesktop="p-4 p-4">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col md:w-[60vw] w-[90vw] relative"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <AAuSoftLogo size={40} />
            {!selectedMusic && (
              <h3 className="text-base font-bold dark:text-white">
                <CTranslateTo eng="New Music" pt="Nova Música" />
              </h3>
            )}
            {selectedMusic && (
              <h3 className="text-base font-bold dark:text-white">
                <CTranslateTo eng="Edit Music" pt="Editar Música" />
              </h3>
            )}
          </div>
          <button onClick={handleClose} className="dark:text-white">
            <ReactIcons.BiIcon.BiX size={20} />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-4 h-[60vh] overflow-y-auto">
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
                    coverMusic != ""
                      ? coverMusic
                      : selectedMusic && selectedMusic.cover != ""
                      ? selectedMusic.cover
                      : coverPreview
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
                        setCoverMusic(url);
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

          <div className="flex flex-col gap-2">
            <h1 className="text-base dark:text-white">
              <CTranslateTo eng="Music Title" pt="Título da música" />
            </h1>
            <AuSoftUI.UI.TextField.Default
              requiredField={errors.title?.message ? true : false}
              {...register("title")}
              placeholder={`${
                langByCookies == "pt"
                  ? "→ Informe o título da sua música..."
                  : "→ Enter the title of your song..."
              }`}
              className="w-full"
              weight={"md"}
            />
            {errors.title?.message && (
              <AuSoftUI.Component.RequiredTextField
                text={errors.title.message}
                color="red"
              />
            )}
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-base dark:text-white">
                <CTranslateTo eng="Category" pt="Categoria" />
              </h1>
              <SelectCategoryDropdown view="musics" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base dark:text-white">
                <CTranslateTo
                  eng="Audio File (MP3) - MAX: 4MB"
                  pt="Arquivo em áudio (MP3) - MAX: 4MB"
                />
              </h1>
              <AuSoftUI.UI.TextField.Default
                type="file"
                className="w-full file:rounded-full file:mb-5 file:border-none file:bg-yellow-600 file:text-white"
                weight={"md"}
                onChange={(e) => {
                  if (e.target.files?.length! > 0) {
                    if (e.target?.files) {
                      const file = e.target?.files[0];
                      if (file) {
                        // Check MIME types for MP3 and M4A
                        const isValidMimeType =
                          file.type === "audio/mpeg" ||
                          file.type === "audio/mp4" ||
                          file.type === "audio/x-m4a" ||
                          file.type === "audio/aac";

                        // Check file extension as fallback
                        const fileName = file.name.toLowerCase();
                        const isValidExtension =
                          fileName.endsWith(".mp3") ||
                          fileName.endsWith(".m4a");

                        if (isValidMimeType || isValidExtension) {
                          if (file && file.size > 8 * 1024 * 1024) {
                            return AuSoftUI.Component.ToastifyWithTranslation({
                              description_en:
                                "The music size must be a maximum of 8MB",
                              description_pt:
                                "O tamanho da música precisa ser no máximo 8MB",
                              title_en: "Music too large",
                              title_pt: "Música muito grande",
                              toast: handleAddToastOnArray,
                              type: "error",
                            });
                          }

                          const url = URL.createObjectURL(file);
                          setSoundMusic(url);
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-base dark:text-white">
              <CTranslateTo eng="Description" pt="Descrição" />
            </h1>
            <AuSoftUI.UI.TextField.TextArea
              requiredField={errors.description?.message ? true : false}
              {...register("description")}
              placeholder={`${
                langByCookies == "pt"
                  ? "→ Informe uma pequena descrição da sua música..."
                  : "→ Enter a short description of your song..."
              }`}
              className="w-full h-[40vh]"
              weight={"md"}
            />
            {errors.description?.message && (
              <AuSoftUI.Component.RequiredTextField
                text={errors.description.message}
                color="red"
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-slate-300 dark:border-slate-800 px-5 pt-4 pb-5">
          <AuSoftUI.UI.Button
            type="button"
            onClick={handleClose}
            variant={"outline"}
            size={"md"}
          >
            <CTranslateTo eng="Cancel" pt="Cancelar" />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button type="submit" variant={"primary"} size={"md"}>
            {selectedMusic && !isSubmitting && (
              <CTranslateTo eng="Save Changes" pt="Salvar alterações" />
            )}
            {!selectedMusic && !isSubmitting && (
              <CTranslateTo eng="Add new music" pt="Adicionar nova música" />
            )}
            <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />
          </AuSoftUI.UI.Button>
        </div>
        <ARegisterProgress isOpened={isSubmitting} rounded="all" />
      </form>
    </BaseModal>
  );
}
