import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { useEffect, useState } from "react";
import { internalApi } from "@/http/axios/api";
import { useCreatorProvider } from "@/providers/features/CreatorProvider";
import { useAppProvider } from "@/providers/app/AppProvider";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import LikeResourceButton from "@/app/[locale]/(site)/components/likes/LikeResourceButton";
import MusicViews from "@/app/[locale]/app/(artist)/art-musics/components/MusicViews";

export default function PostFooter({ post }: { post: ICreatorPost }) {
  const { handleOpenModal, handleAddModalQuestionData } = useModal();
  const { handleFetchCreatorPosts, handleSelectCreatorPost } =
    useCreatorProvider();

  const { handleAddToastOnArray } = useAppProvider();

  //Controls
  const [openBox, setOpenBox] = useState(false);

  async function handleDeleteEvent() {
    try {
      handleAddModalQuestionData({ isSubmitting: true });

      await internalApi.delete("/creators", {
        data: {
          id: post.id,
        },
      });

      handleFetchCreatorPosts(true);
      handleSelectCreatorPost(undefined);
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
        action_en: "Delete post",
        action_pt: "Eliminar postagem",
        description_en:
          "Are you sure you want to delete this post? Your customers will no longer be able to view or interact with this post.",
        description_pt:
          "Tem certeza de que deseja eliminar esta postagem? Os seus clientes não poderão mais visualizar ou interagir com esta postagem.",
        updated_description_en: "Post deleted successfully.",
        updated_description_pt: "Postagem eliminada com sucesso.",
        updated_title_en: "Post Deleted",
        updated_title_pt: "Postagem Eliminada",
        title_en: "Do you want to delete this post?",
        title_pt: "Deseja eliminar esta postagem?",
        handleConfirmCallback: () => {
          handleDeleteEvent();
        },
        callbackClose: () => {
          handleFetchCreatorPosts(false);
          handleSelectCreatorPost(undefined);
          setOpenBox(false);
        },
        isSubmitting: false,
        isUpdated: false,
      });

      handleOpenModal("default-question");
    }
  }, [openBox]);

  return (
    <div className="flex items-center w-full justify-between gap-3.5 border-t border-b pt-2 pb-2 border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3.5">
        <div className="relative">
          <LikeResourceButton pulse={false} />
          <div className="absolute inset-0 "></div>
        </div>
        <MusicViews views={0} />
      </div>
      <div className="flex items-center gap-2">
        <AuSoftUI.UI.Button
          onClick={() => setOpenBox(true)}
          className="items-center py-1.5 px-2.5"
          variant={"destructive"}
          size={"sm"}
        >
          <ReactIcons.PiIcon.PiTrash size={14} />
        </AuSoftUI.UI.Button>
        <AuSoftUI.UI.Button
          onClick={() => {
            handleSelectCreatorPost(post);
            if (post?.type == "reel") {
              handleOpenModal("ct-publish-video");
            }
            if (post?.type == "image") {
              handleOpenModal("ct-publish-image");
            }
            if (post?.type == "event") {
              handleOpenModal("ct-publish-event");
            }
            if (post?.type == "music") {
              handleOpenModal("ct-publish-music");
            }
          }}
          className="items-center py-1.5 px-2.5"
          variant={"outline"}
          size={"sm"}
        >
          <ReactIcons.PiIcon.PiPencil size={14} />
        </AuSoftUI.UI.Button>
      </div>
    </div>
  );
}
