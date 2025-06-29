import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { useEffect, useState } from "react";
import { internalApi } from "@/http/axios/api";
import { useCreatorProvider } from "@/providers/features/CreatorProvider";
import { useAppProvider } from "@/providers/app/AppProvider";
import { BaseBox } from "@/@components/(box)/BaseBox";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import LikeResourceButton from "@/app/[locale]/(site)/components/likes/LikeResourceButton";
import MusicViews from "@/app/[locale]/app/(artist)/art-musics/components/MusicViews";
import CRTPostDescription from "../../../(flex-house)/flex-house/components/geral/CRTPostDescription";
import CRTCommentContainer from "../../../(flex-house)/flex-house/components/geral/comments/CRTCommentContainer";
import FormattersServices from "@/services/FormattersServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function PostFooter({ post }: { post: ICreatorPost }) {
  const { handleOpenModal, handleAddModalQuestionData } = useModal();
  const { handleFetchCreatorPosts, handleSelectCreatorPost } =
    useCreatorProvider();

  const { handleAddToastOnArray } = useAppProvider();

  //Controls
  const [openBox, setOpenBox] = useState(false);
  const [openComments, setOpenComments] = useState(false);

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
    <>
      {openComments && (
        <div
          className={`fixed duration-0 z-30 inset-0 md:dark:bg-black/50 md:bg-black/80 bg-white dark:bg-[#0f121c] flex justify-center`}
        >
          <div className="md:flex hidden fixed top-8 right-8">
            <AuSoftUI.UI.Button
              onClick={() => setOpenComments(false)}
              className="rounded-full font-bold bg-white dark:bg-slate-800 text-black dark:text-white px-3.5 items-center justify-center"
              variant={"default"}
            >
              X
            </AuSoftUI.UI.Button>
          </div>
          <div className="md:hidden flex z-40 dark:bg-[#0f121c] bg-white p-4 absolute top-0 inset-x-0 border-b border-slate-300/90 dark:border-slate-800 ">
            <button
              onClick={() => setOpenComments(false)}
              className="md:w-[20vw] w-[80vw] dark:text-white text-base font-bold flex items-center gap-4"
            >
              <ReactIcons.PiIcon.PiCaretLeft size={25} />
              <p className="truncate flex items-center gap-2">
                <CTranslateTo eng="Post: " pt="Publicação de:" />{" "}
                <b className={`dark:text-white text-sm font-bold truncate `}>
                  <>
                    {post.author?.user && (
                      <>{`${post?.author?.user.first_name} ${post?.author?.user?.last_name}`}</>
                    )}
                    {!post.author?.user && <p>Marca Flex</p>}
                  </>
                </b>
              </p>
            </button>
          </div>
          <div
            className={`md:animate-fade-up animate-fill-forwards h-[100vh] scrollbar-hide overflow-y-auto md:pt-8 pt-0 md:pb-8 pb-0 md:pr-3 pr-0`}
          >
            <BaseBox
              className={`md:w-[40vw] w-[100vw] md:rounded-xl rounded-none md:pt-4 pt-[5rem] md:px-4 px-4 md:h-fit h-fit flex flex-col gap-4`}
            >
              <CRTPostDescription
                openComments={openComments}
                setOpenComments={setOpenComments}
                post={post}
              />
              {openComments && (
                <CRTCommentContainer displayMode="both" resource={post} />
              )}
            </BaseBox>
          </div>
        </div>
      )}

      <div className="flex items-center w-full justify-between gap-3.5 border-t border-b pt-2 pb-2 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <LikeResourceButton resource={post} pulse={false} />
          {post.type == "reel" && <MusicViews views={post.views.length || 0} />}

          <AuSoftUI.UI.Button
            onClick={() => setOpenComments((state) => !state)}
            className="items-center text-slate-600 dark:text-slate-400 py-1.5 px-2.5 border-none"
            variant={"outline"}
            size={"sm"}
          >
            <ReactIcons.AiICon.AiOutlineMessage size={15} />
            <p className="">
              {FormattersServices.formatNumberByMillions(
                post?.comments.length!
              )}
            </p>
          </AuSoftUI.UI.Button>
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
    </>
  );
}
