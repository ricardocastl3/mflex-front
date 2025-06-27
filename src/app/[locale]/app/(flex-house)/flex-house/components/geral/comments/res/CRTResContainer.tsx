import { AuSoftUI } from "@/@components/(ausoft)";
import { IResourceComment } from "@/http/interfaces/models/resources/IResourceComment";
import { localImages } from "@/utils/images";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";
import { ICommentBox } from "../cards/CRTCommentCard";
import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";
import { useModal } from "@/providers/app/ModalProvider";

import DateServices from "@/services/DateServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CRTResInputAnswer from "./CRTResInputAnswer";
import CRTResInputEdit from "./CRTResInputEdit";
import LikeResourceButton from "@/app/[locale]/(site)/components/likes/LikeResourceButton";
import FormmattedDescription from "@/app/[locale]/(site)/components/comments/FormmattedDescription";

export default function CRTCommentResContainer({
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
  const { handleOpenModal } = useModal();
  const { handleSelectDelFHComment } = useFlexHouseProvider();

  const [isToEdit, setIsToEdit] = useState(false);
  const [isToDelete, setIsToDelete] = useState(false);
  const [selectedAnswerID, setSelectedAnswerID] = useState("");

  useEffect(() => {
    if (isToDelete) {
      handleSelectDelFHComment({ id: selectedAnswerID, type: "res" });
      handleOpenModal("ct-publish-del-comments");
      setIsToDelete(false);
    }
  }, [isToDelete]);

  return (
    <div className="w-full flex-col gap-4">
      {comment.responses.length > 0 && (
        <div
          className={`${
            openAnswerInput ? "h-[40vh] overflow-y-auto pr-1" : ""
          } animate-fade-up flex flex-1 flex-col gap-4 w-full`}
        >
          {comment.responses
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((response, i) => {
              return (
                <div key={i} className="flex flex-col gap-2 pb-3 w-full">
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
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <h1 className="text-sm font-bold dark:text-white">{`${response.user.first_name} ${response.user.last_name}`}</h1>
                        <h1 className="text-sm dark:text-slate-400 text-slate-600">
                          {DateServices.normalize(response.created_at)}
                        </h1>
                      </div>
                      <div className="flex flex-col gap-2">
                        {isToEdit && selectedAnswerID == response.id && (
                          <>
                            <CRTResInputEdit
                              response={response}
                              callbackClose={() => setIsToEdit(false)}
                            />
                          </>
                        )}
                        {!isToEdit && (
                          <h1 className="text-sm flex flex-col gap-3 dark:text-white text-wrap w-full break-words">
                            <FormmattedDescription
                              description={response.content}
                              type="comment"
                            />
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
      )}

      {openAnswerInput &&
        selectedComment &&
        selectedComment.id == comment.id && (
          <>
            <CRTResInputAnswer
              comment={comment}
              callbackClose={() => handleSetConfig({ openAnswerInput: false })}
            />
          </>
        )}
    </div>
  );
}
