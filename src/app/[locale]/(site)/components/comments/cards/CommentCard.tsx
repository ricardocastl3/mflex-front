import { AuSoftUI } from "@/@components/(ausoft)";
import { IResourceComment } from "@/http/interfaces/models/resources/IResourceComment";
import { localImages } from "@/utils/images";
import { useState } from "react";
import { useAppProvider } from "@/providers/app/AppProvider";
import { internalApi } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { useResourceProvider } from "@/providers/features/ResourceProvider";

import DateServices from "@/services/DateServices";
import LikeResourceButton from "../../likes/LikeResourceButton";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CommentDeletion from "./CommentDeletion";

export default function CommentCard({
  comment,
}: {
  comment: IResourceComment;
}) {
  const { handleAddToastOnArray } = useAppProvider();
  const { handleFetchResource } = useResourceProvider();

  const [content, setContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToEdit, setIsToEdit] = useState(false);
  const [isToDelete, setIsToDelete] = useState(false);

  async function handleEditComment() {
    try {
      setIsSubmitting(true);
      handleFetchResource(false);
      await internalApi.put("/users/comments", {
        id: comment.id,
        content,
      });
      handleFetchResource(true);
      setIsSubmitting(false);
      setIsToEdit(false);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <>
      {isToDelete && (
        <CommentDeletion
          id={comment.id}
          callbackClose={() => setIsToDelete(false)}
        />
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <div className="mb-2">
            <AuSoftUI.Component.Avatar
              size={30}
              width={30}
              wsite=""
              src={comment.user.photo || localImages.logos.flexUser.src}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold dark:text-white">{`${comment.user.first_name} ${comment.user.last_name}`}</h1>
              <h1 className="text-sm dark:text-slate-400 text-slate-600">
                {DateServices.normalize(comment.created_at)}
              </h1>
            </div>
            <div className="md:w-[50vw] w-[65vw]">
              {isToEdit && (
                <>
                  <div className="animate-fade border-b flex flex-col items-start gap-4 border-slate-300 dark:border-slate-800 pb-4">
                    <AuSoftUI.UI.TextField.TextArea
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      value={content}
                      className="flex-1 h-[150px] w-full  border-none bg-slate-200 text-slate-800 dark:bg-slate-800/20 dark:text-white"
                    />
                    <div className="flex items-center gap-2">
                      <AuSoftUI.UI.Button
                        disabled={isSubmitting}
                        onClick={handleEditComment}
                        className="rounded-full h-fit font-bold items-center"
                        variant={"primary"}
                      >
                        <AuSoftUI.Component.isFormSubmitting
                          isSubmitting={isSubmitting}
                        />

                        {!isSubmitting && (
                          <>
                            <ReactIcons.AiICon.AiOutlineSend size={15} />
                            <CTranslateTo eng="Update" pt="Atualizar" />
                          </>
                        )}
                      </AuSoftUI.UI.Button>
                      <AuSoftUI.UI.Button
                        disabled={isSubmitting}
                        onClick={() => setIsToEdit(false)}
                        className="rounded-full h-fit font-bold items-center"
                        variant={"outline"}
                      >
                        <CTranslateTo eng="Cancel" pt="Cancelar" />
                      </AuSoftUI.UI.Button>
                    </div>
                  </div>
                </>
              )}
              {!isToEdit && (
                <h1 className="text-sm  dark:text-white text-wrap w-full break-words">
                  {comment.content}
                </h1>
              )}
            </div>
            <div className="flex items-center gap-2">
              <LikeResourceButton
                other_likes={comment.likes}
                pulse={false}
                iconSize={16}
                other_id={comment.id}
              />
              <button
                onClick={() => {
                  setContent(comment.content);
                  setIsToEdit(true);
                }}
                className=" rounded-full text-xs font-bold px-2 py-1 bg-blue-200 text-blue-700 dark:bg-blue-700/30 dark:text-blue-500"
              >
                <CTranslateTo eng="Edit" pt="Editar" />
              </button>
              <button
                onClick={() => {
                  setIsToDelete(true);
                }}
                className="rounded-full text-xs font-bold px-2 py-1 bg-red-200 text-red-700 dark:bg-red-700/30 dark:text-red-500"
              >
                <CTranslateTo eng="Delete" pt="Eliminar" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
