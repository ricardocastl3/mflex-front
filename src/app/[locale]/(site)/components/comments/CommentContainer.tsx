import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import {
  ResourceType,
  useResourceProvider,
} from "@/providers/features/ResourceProvider";
import { ReactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import { useAppProvider } from "@/providers/app/AppProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CommentCard from "./cards/CommentCard";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import Link from "next/link";

export default function CommentContainer({
  resource,
  displayMode,
}: {
  displayMode: "mobile" | "desktop" | "both";
  resource: ResourceType;
}) {
  const { handleSelectResource, handleFetchResource } = useResourceProvider();
  const { handleAddToastOnArray, currentLastPageUrl } = useAppProvider();
  const { userLogged } = useAuth();

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleComment() {
    try {
      if (content.length <= 0) {
        AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please write a comment before submitting.",
          description_pt: "Por favor, escreva um comentário antes de enviar.",
          title_en: "Empty Comment",
          title_pt: "Comentário Vazio",
          toast: handleAddToastOnArray,
          type: "error",
        });
        return;
      }

      setIsSubmitting(true);
      handleFetchResource(false);
      await internalApi.post("/users/comments", {
        content,
        id: resource?.id,
      });
      setContent("");
      setIsSubmitting(false);
      handleFetchResource(true);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({
        err,
        openToast: handleAddToastOnArray,
      });
    }
  }

  useEffect(() => {
    handleSelectResource(resource);
  }, []);

  return (
    <div className="flex md:flex-row flex-col pb-5 md:w-fit w-full">
      <BaseBox
        className={`${
          displayMode == "mobile"
            ? "md:hidden flex flex-1 w-full"
            : displayMode == "desktop"
            ? "md:flex hidden mx-[3rem] w-[62vw]"
            : "flex flex-1"
        }`}
      >
        <div className="py-6 md:px-6 px-4 flex flex-col gap-4 w-full">
          {userLogged && (
            <div className="border-b flex md:flex-row flex-col md:items-center items-start gap-4 border-slate-300 dark:border-slate-800 pb-4">
              <AuSoftUI.UI.TextField.TextArea
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
                placeholder={`${
                  langByCookies == "pt"
                    ? "Escreva um comentário..."
                    : "Write a comment..."
                }`}
                className="flex-1 h-[200px] w-full  border-none bg-slate-200 text-slate-800 dark:bg-slate-800/20 dark:text-white"
              />
              <AuSoftUI.UI.Button
                disabled={isSubmitting}
                onClick={handleComment}
                className="rounded-full h-fit font-bold items-center"
                variant={"primary"}
              >
                <AuSoftUI.Component.isFormSubmitting
                  isSubmitting={isSubmitting}
                />

                {!isSubmitting && <ReactIcons.AiICon.AiOutlineSend size={15} />}

                {window.innerWidth <= 765 && !isSubmitting && (
                  <CTranslateTo eng="Comment" pt="Comentar" />
                )}
              </AuSoftUI.UI.Button>
            </div>
          )}

          {!userLogged && (
            <Link href={`/${langByCookies}/sign-in`} className="w-full">
              <AuSoftUI.UI.Button
                onClick={() => {
                  LocalStorageServices.setCommentURL(currentLastPageUrl);
                }}
                variant={"primary"}
                size={"md"}
                className="md:w-fit w-full"
              >
                <CTranslateTo
                  eng="Log in to be able to comment"
                  pt="Inicie sessão para conseguires comentar"
                />
              </AuSoftUI.UI.Button>
            </Link>
          )}
          <div className="flex flex-col gap-2 w-full">
            <h1 className="dark:text-white font-bold text-base flex items-center gap-4">
              <CTranslateTo eng="Comments" pt="Comentários" />
              <div className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 font-bold dark:bg-slate-800/50 h-fit dark:text-white text-sm">
                {resource?.comments.length}
              </div>
            </h1>
            <div className="flex flex-col gap-2 pt-4">
              {resource && resource?.comments?.length <= 0 && (
                <div className="">
                  <h2 className="text-base text-slate-600 dark:text-slate-300">
                    <CTranslateTo
                      eng="Be the first to comment 😀"
                      pt="Seja o primeiro a comentar 😀"
                    />
                  </h2>
                </div>
              )}

              {resource && resource.comments.length > 0 && (
                <>
                  {resource.comments
                    .sort((a, b) => {
                      if (userLogged) {
                        if (
                          a.user.id === userLogged.id &&
                          b.user.id !== userLogged.id
                        )
                          return -1;
                        if (
                          a.user.id !== userLogged.id &&
                          b.user.id === userLogged.id
                        )
                          return 1;
                      }
                      return 0;
                    })
                    .map((comment, i) => {
                      return <CommentCard key={i} comment={comment} />;
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </BaseBox>
    </div>
  );
}
