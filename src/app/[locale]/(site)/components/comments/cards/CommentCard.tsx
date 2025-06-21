import { AuSoftUI } from "@/@components/(ausoft)";
import { IResourceComment } from "@/http/interfaces/models/resources/IResourceComment";
import { localImages } from "@/utils/images";
import { useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";

import DateServices from "@/services/DateServices";
import LikeResourceButton from "../../likes/LikeResourceButton";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CommentDeletion from "../CommentDeletion";
import CommentResContainer from "../res/ResContainer";
import CommentInputEdit from "./CommentInputEdit";

export interface ICommentBox {
  showResponses?: boolean;
  isToEdit?: boolean;
  isToDelete?: boolean;
  openAnswerInput?: boolean;
}

export default function CommentCard({
  comment,
}: {
  comment: IResourceComment;
}) {
  const { userLogged } = useAuth();

  const [commentBox, setCommentBox] = useState<ICommentBox>({
    openAnswerInput: false,
    showResponses: false,

    isToDelete: false,
    isToEdit: false,
  });

  function handleSetConfig(config: ICommentBox) {
    setCommentBox((state) => ({ ...state, ...config }));
  }

  return (
    <>
      {commentBox.isToDelete && (
        <CommentDeletion
          type="comment"
          id={comment.id}
          callbackClose={() => handleSetConfig({ isToDelete: false })}
        />
      )}

      <div className="flex flex-col gap-2 pb-3">
        <div className="flex items-start gap-2 h-full">
          <div className="mb-2 flex flex-col items-center gap-2 h-full">
            <AuSoftUI.Component.Avatar
              size={30}
              width={30}
              wsite=""
              src={comment.user.photo || localImages.logos.flexUser.src}
            />
            {commentBox.showResponses && comment.responses.length > 0 && (
              <div className="animate-fade flex-1 p-[0.1rem] bg-slate-300 dark:bg-slate-800/40"></div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold dark:text-white">{`${comment.user.first_name} ${comment.user.last_name}`}</h1>
              <h1 className="text-sm dark:text-slate-400 text-slate-600">
                {DateServices.normalize(comment.created_at)}
              </h1>
            </div>
            <div className="md:w-[50vw] w-[65vw] flex flex-col gap-2">
              {commentBox.isToEdit && (
                <>
                  <CommentInputEdit
                    comment={comment}
                    handleSetConfig={handleSetConfig}
                  />
                </>
              )}
              {!commentBox.isToEdit && (
                <h1 className="text-sm  dark:text-white text-wrap w-full break-words">
                  {comment.content}
                </h1>
              )}
            </div>

            <div className="flex items-center gap-2">
              {userLogged && (
                <>
                  <LikeResourceButton
                    other_likes={comment.likes}
                    pulse={false}
                    iconSize={16}
                    other_id={comment.id}
                  />

                  <button
                    onClick={() => {
                      handleSetConfig({
                        openAnswerInput: true,
                        showResponses: true,
                      });
                      handleSetConfig({ isToEdit: false });
                    }}
                    className=" rounded-full text-xs font-bold px-2 py-1 bg-yellow-200 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-500"
                  >
                    <CTranslateTo eng="Answer" pt="Responder" />
                  </button>

                  {userLogged.id == comment.user.id && (
                    <>
                      <button
                        onClick={() => {
                          handleSetConfig({ openAnswerInput: false });
                          handleSetConfig({ isToEdit: true });
                        }}
                        className=" rounded-full text-xs font-bold px-2 py-1 bg-blue-200 text-blue-700 dark:bg-blue-700/30 dark:text-blue-500"
                      >
                        <CTranslateTo eng="Edit" pt="Editar" />
                      </button>
                      <button
                        onClick={() => {
                          handleSetConfig({ isToDelete: true });
                        }}
                        className="rounded-full text-xs font-bold px-2 py-1 bg-red-200 text-red-700 dark:bg-red-700/30 dark:text-red-500"
                      >
                        <CTranslateTo eng="Delete" pt="Eliminar" />
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="w-full pt-2">
              {comment.responses.length > 0 && (
                <button
                  onClick={() => {
                    handleSetConfig({
                      showResponses: !commentBox.showResponses,
                    });
                  }}
                  className="flex items-center gap-4 pb-4 w-full"
                >
                  <h1 className="w-fit text-slate-600 dark:text-slate-300 font-bold text-xs">
                    {commentBox.showResponses && (
                      <CTranslateTo
                        eng="→ Hidden Answers"
                        pt="→ Esconder respostas"
                      />
                    )}
                    {!commentBox.showResponses && (
                      <CTranslateTo
                        eng={`→ Show (${comment.responses.length}) answers`}
                        pt={`→ Mostrar (${comment.responses.length}) respostas`}
                      />
                    )}
                  </h1>
                  <div className="p-[0.1rem] rounded-full bg-slate-400 dark:bg-slate-800 flex-1"></div>
                </button>
              )}
              {commentBox.showResponses && (
                <CommentResContainer
                  handleSetConfig={handleSetConfig}
                  openAnswerInput={commentBox.openAnswerInput}
                  comment={comment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
