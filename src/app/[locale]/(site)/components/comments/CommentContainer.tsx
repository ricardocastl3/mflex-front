"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import {
  ResourceType,
  useResourceProvider,
} from "@/providers/features/ResourceProvider";
import { useEffect } from "react";
import { useAppProvider } from "@/providers/app/AppProvider";
import { usePathname, useSearchParams } from "next/navigation";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CommentCard from "./cards/CommentCard";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import Link from "next/link";
import CommentInputPost from "./CommentInputPost";

export default function CommentContainer({
  resource,
  displayMode,
}: {
  displayMode: "mobile" | "desktop" | "both";
  resource: ResourceType;
}) {
  const { handleSelectResource } = useResourceProvider();
  const { currentLastPageUrl } = useAppProvider();
  const { userLogged } = useAuth();

  useEffect(() => {
    handleSelectResource(resource);
  }, []);

  const searchParms = useSearchParams();
  const pathname = usePathname();

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
          {userLogged && <CommentInputPost />}

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
