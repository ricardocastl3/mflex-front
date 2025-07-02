"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import {
  ResourceType,
  useResourceProvider,
} from "@/providers/features/ResourceProvider";
import { useCallback, useEffect, useState } from "react";
import { useAppProvider } from "@/providers/app/AppProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CRTCommentCard from "./cards/CRTCommentCard";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import Link from "next/link";
import CRTCommentInputPost from "./CRTCommentInputPost";

export default function CRTCommentContainer({
  resource,
  displayMode,
}: {
  displayMode: "mobile" | "desktop" | "both";
  resource: ResourceType;
}) {
  // Contexts
  const { handleSelectResource, fetchResource } = useResourceProvider();
  const { currentLastPageUrl } = useAppProvider();
  const { userLogged } = useAuth();

  // Controls
  const searchParms = useSearchParams();
  const pathname = usePathname();

  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const [selectedNewPost, setSelectedNewPost] = useState<
    ICreatorPost | undefined
  >();

  const fetchNewPostsComment = useCallback(async () => {
    try {
      const resp = await internalApi.get("/creators/posts", {
        params: {
          id: resource?.id,
        },
      });
      handleSelectResource(resp.data.post);
      setSelectedNewPost(resp.data.post);
      setIsLoadingComments(false);
    } catch (err) {}
  }, [resource]);

  useEffect(() => {
    handleSelectResource(resource);
  }, []);

  useEffect(() => {
    if (fetchResource) fetchNewPostsComment();
  }, [fetchResource, resource]);

  useEffect(() => {
    fetchNewPostsComment();
  }, []);

  const scrollToComment = (commentId: string) => {
    setTimeout(() => {
      const commentElement = document.getElementById(`cm-${commentId}`);

      if (commentElement) {
        try {
          // Método 1: scrollIntoView com opções específicas
          commentElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Método 2: Scroll manual como fallback (especialmente para desktop)
          setTimeout(() => {
            const rect = commentElement.getBoundingClientRect();
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
            const targetScrollTop =
              scrollTop + rect.top - window.innerHeight / 2;

            // Verifica se o elemento está visível
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
              window.scrollTo({
                top: targetScrollTop,
                behavior: "smooth",
              });
            }
          }, 150);
        } catch (error) {}

        // Adiciona um highlight temporário mais visível
        commentElement.classList.add(
          "bg-yellow-100",
          "dark:bg-yellow-900/20",
          "transition-colors",
          "duration-300",
          "border-2",
          "border-yellow-400",
          "rounded-lg",
          "p-2"
        );
        setTimeout(() => {
          commentElement.classList.remove(
            "bg-yellow-100",
            "dark:bg-yellow-900/20",
            "border-2",
            "border-yellow-400",
            "rounded-lg",
            "p-2"
          );
        }, 3000);
      } else {
        // Tenta encontrar todos os elementos com ID que começam com cm-
        const allCommentElements = document.querySelectorAll('[id^="cm-"]');
      }
    }, 800); // Aumentei o delay para garantir que tudo esteja renderizado
  };

  useEffect(() => {
    const commentId = searchParms.get("cm");
    if (commentId && resource?.comments && resource.comments.length > 0) {
      scrollToComment(commentId);
    }
  }, [searchParms, resource, pathname, displayMode]);

  return (
    <div
      className={`${
        displayMode == "mobile"
          ? "md:hidden flex flex-1 w-full"
          : displayMode == "desktop"
          ? "md:flex hidden mx-[3rem] w-[62vw]"
          : "w-full"
      } md:h-fit h-full md:pb-8 pb-20`}
    >
      <div className="flex flex-col gap-4 w-full h-full">
        {userLogged && <CRTCommentInputPost />}

        {!userLogged && (
          <Link href={`/${langByCookies}/sign-in`} className="w-full">
            <AuSoftUI.UI.Button
              onClick={() => {
                LocalStorageServices.setCommentURL(currentLastPageUrl);
              }}
              variant={"primary"}
              size={"md"}
              className="w-full"
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
              {selectedNewPost?.comments.length || 0}
            </div>
          </h1>
          <div className="flex flex-col gap-2 pt-4 w-full">
            {selectedNewPost && selectedNewPost?.comments?.length <= 0 && (
              <div className="">
                <h2 className="text-base text-slate-600 dark:text-slate-300">
                  <CTranslateTo
                    eng="Be the first to comment 😀"
                    pt="Seja o primeiro a comentar 😀"
                  />
                </h2>
              </div>
            )}

            {isLoadingComments && (
              <>
                {Array.from({ length: 8 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="p-8 rounded-lg bg-slate-200 dark:bg-slate-800/50 animate-pulse"
                    ></div>
                  );
                })}
              </>
            )}

            {selectedNewPost &&
              selectedNewPost.comments.length > 0 &&
              !isLoadingComments && (
                <>
                  {selectedNewPost.comments
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
                      return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                      );
                    })
                    .map((comment, i) => {
                      return <CRTCommentCard key={i} comment={comment} />;
                    })}
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
