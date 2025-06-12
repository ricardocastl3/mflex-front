import { internalApi } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { useMusicProvider } from "@/providers/features/MusicProvider";
import { Dispatch, SetStateAction, useEffect } from "react";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function MusicDeletionModal({
  openBox,
  setOpenBox,
}: {
  setOpenBox: Dispatch<SetStateAction<boolean>>;
  openBox: boolean;
}) {
  const { handleOpenModal, handleAddModalQuestionData } = useModal();
  const { handleAddToastOnArray } = useAppProvider();

  const { handleFetchMusic, handleSelectMusic, selectedMusic } =
    useMusicProvider();

  async function handleDeleteEvent() {
    try {
      handleAddModalQuestionData({ isSubmitting: true });

      await internalApi.delete("/artists/musics", {
        data: {
          id: selectedMusic?.id,
        },
      });

      handleFetchMusic(true);
      handleSelectMusic(undefined);
      handleAddModalQuestionData({ isSubmitting: false, isUpdated: true });
    } catch (err) {
      handleAddModalQuestionData({
        isSubmitting: false,
      });

      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  useEffect(() => {
    if (openBox) {
      handleAddModalQuestionData({
        action_en: "Delete music",
        action_pt: "Eliminar música",
        description_en:
          "Are you sure you want to delete this music?Your fans will no longer be able to hear this song",
        description_pt:
          "Tem certeza de que deseja eliminar esta música? Os seus fãs não poderão mais ouvir esta música",
        updated_description_en: "Music deleted successfully.",
        updated_description_pt: "Música eliminada com sucesso.",
        updated_title_en: "Music Deleted",
        updated_title_pt: "Música Eliminada",
        title_en: "Do you want to delete this music?",
        title_pt: "Deseja eliminar esta música?",

        handleConfirmCallback: () => {
          handleDeleteEvent();
        },

        callbackClose: () => {
          handleSelectMusic(undefined);
          handleFetchMusic(false);
          setOpenBox(false);
        },
        isSubmitting: false,
        isUpdated: false,
      });

      handleOpenModal("default-question");
    }
  }, [openBox]);

  return null;
}
