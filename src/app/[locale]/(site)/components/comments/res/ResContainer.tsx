import { AuSoftUI } from "@/@components/(ausoft)";
import { IResourceComment } from "@/http/interfaces/models/resources/IResourceComment";
import { localImages } from "@/utils/images";
import { useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";
import { ICommentBox } from "../cards/CommentCard";

import DateServices from "@/services/DateServices";
import LikeResourceButton from "../../likes/LikeResourceButton";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CommentDeletion from "../CommentDeletion";
import ResInputAnswer from "./ResInputAnswer";
import ResInputEdit from "./ResInputEdit";

export default function CommentResContainer({
  comment,
  selectedComment,
  openAnswerInput,
  handleSetConfig,
}: {
  comment: IResourceComment;
  selectedComment: IResourceComment | undefined;
  openAnswerInput?: boolean;
  handleSetConfig: (config: ICommentBox) => void;
}) {
  const { userLogged } = useAuth();

  const [isToEdit, setIsToEdit] = useState(false);
  const [isToDelete, setIsToDelete] = useState(false);

  const [selectedAnswerID, setSelectedAnswerID] = useState("");

  return (
    <>
      {comment.responses.length > 0 && (
        <>
          {isToDelete && (
            <CommentDeletion
              type="response"
              id={selectedAnswerID}
              callbackClose={() => setIsToDelete(false)}
            />
          )}

          <div
            className={`${
              openAnswerInput ? "h-[40vh] overflow-y-auto" : ""
            } animate-fade-up flex flex-col gap-4 `}
          >
            {comment.responses.map((response, i) => {
              return (
                <div key={i} className="flex flex-col gap-2 pb-3">
                  <div className="flex items-start gap-2">
                    <div className="mb-2">
                      <AuSoftUI.Component.Avatar
                        size={30}
                        width={30}
                        wsite=""
                        src={
                          response.user.photo || localImages.logos.flexUser.src
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <h1 className="text-sm font-bold dark:text-white">{`${response.user.first_name} ${response.user.last_name}`}</h1>
                        <h1 className="text-sm dark:text-slate-400 text-slate-600">
                          {DateServices.normalize(response.created_at)}
                        </h1>
                      </div>
                      <div className="md:w-[50vw] w-[65vw] flex flex-col gap-2">
                        {isToEdit && selectedAnswerID == response.id && (
                          <>
                            <ResInputEdit
                              response={response}
                              callbackClose={() => setIsToEdit(false)}
                            />
                          </>
                        )}
                        {!isToEdit && (
                          <h1 className="text-sm  dark:text-white text-wrap w-full break-words">
                            {response.content}
                          </h1>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {userLogged && (
                          <>
                            <LikeResourceButton
                              other_likes={response.likes}
                              pulse={false}
                              iconSize={16}
                              other_id={response.id}
                            />

                            {userLogged.id == response.user.id && (
                              <>
                                <button
                                  onClick={() => {
                                    setIsToEdit(true);
                                    setSelectedAnswerID(response.id);
                                  }}
                                  className=" rounded-full text-xs font-bold px-2 py-1 bg-blue-200 text-blue-700 dark:bg-blue-700/30 dark:text-blue-500"
                                >
                                  <CTranslateTo eng="Edit" pt="Editar" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedAnswerID(response.id);
                                    setIsToDelete(true);
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="w-full pt-2">
        {openAnswerInput &&
          selectedComment &&
          selectedComment.id == comment.id && (
            <>
              selectedComment
              <ResInputAnswer
                comment={comment}
                callbackClose={() =>
                  handleSetConfig({ openAnswerInput: false })
                }
              />
            </>
          )}
      </div>
    </>
  );
}
