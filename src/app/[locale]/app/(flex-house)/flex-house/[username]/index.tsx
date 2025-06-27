"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { internalApi, langByCookies } from "@/http/axios/api";
import { ICreator } from "@/http/interfaces/models/fhouse/ICreator";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";

import PageBase from "../../../@components/PageBase";
import ContainerBase from "../../../@components/ContainerBase";
import CoverBox from "./box/CoverBox";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import FollowCreatorButton from "../../../@components/creator/FollowCreatorButton";
import CreatorStat from "../components/feed/box/creator/CreatorStat";
import PostCard from "../components/feed/cards/PostCard";

const SLICE_POST = 20;

export default function FlexHousePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);

  const { handleOpenModal } = useModal();
  const { userLogged } = useAuth();

  const [selectedCreator, setSelectedCreator] = useState<
    ICreator | undefined
  >();

  const [allPosts, setAllPosts] = useState<ICreatorPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const fetchCreator = useCallback(async () => {
    try {
      setIsLoading(true);

      const resp = await internalApi.get(`/creators`, {
        params: {
          username,
        },
      });

      setSelectedCreator(resp.data.creator);
      setAllPosts(resp.data.creator.posts.slice(0, SLICE_POST));
      setHasMorePosts(resp.data.creator.posts.length > SLICE_POST);
      setIsLoading(false);
    } catch (err) {
      window.location.href = `/${langByCookies}/app/flex-house`;
    }
  }, []);

  useEffect(() => {
    fetchCreator();
  }, []);

  const isLoadingRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const loadMorePosts = useCallback(() => {
    if (!selectedCreator) return;

    isLoadingRef.current = true;

    const nextPosts = selectedCreator.posts.slice(
      allPosts.length,
      allPosts.length + SLICE_POST
    );

    if (nextPosts.length > 0) {
      setAllPosts((prev) => [...prev, ...nextPosts]);
      setHasMorePosts(
        allPosts.length + nextPosts.length < selectedCreator.posts.length
      );
    } else {
      setHasMorePosts(false);
    }

    isLoadingRef.current = false;
  }, [allPosts.length, hasMorePosts, selectedCreator]);

  useEffect(() => {
    // Criar um elemento sentinela para detectar quando chegamos ao final
    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    sentinel.style.width = "100%";

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    // Adicionar o sentinela ao final do container
    scrollContainer.appendChild(sentinel);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMorePosts) {
            loadMorePosts();
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: "100px", // Carrega quando está a 100px do final
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (scrollContainer.contains(sentinel)) {
        scrollContainer.removeChild(sentinel);
      }
    };
  }, [loadMorePosts, hasMorePosts]);

  return (
    <PageBase customTop="md:pt-[4.5rem] pt-[4.5rem]">
      {isLoading && (
        <ContainerBase customHeight="h-[80vh]">
          <div className="flex flex-col gap-4">
            <div className="p-18 bg-slate-200 animate-pulse dark:bg-slate-800/50"></div>
            <div className="p-18 flex-1 h-full bg-slate-200 animate-pulse dark:bg-slate-800/50"></div>
          </div>
        </ContainerBase>
      )}

      {!isLoading && selectedCreator && (
        <ContainerBase customHeight="h-[80vh]" ref={scrollContainerRef}>
          <div className="flex flex-col gap-4">
            <CoverBox creator={selectedCreator} />
            <div className="md:mt-10 mt-8 flex flex-col gap-4">
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-2 md:w-[50vw] w-[80vw]">
                  <h1 className="dark:text-white text-xl font-extrabold">
                    {`${selectedCreator?.user.first_name} ${selectedCreator?.user.last_name}`}
                  </h1>

                  <div className="grid grid-cols-3 gap-4">
                    <CreatorStat
                      color="bg-yellow-100 dark:bg-yellow-800/10 dark:text-yellow-500 text-yellow-600"
                      t_en="Followers"
                      t_pt="Seguidores"
                      value={
                        selectedCreator?.followers.filter(
                          (i) => i.creator_id == selectedCreator?.id
                        ).length!
                      }
                    />
                    <CreatorStat
                      color="bg-blue-200/50 dark:bg-blue-800/10 dark:text-blue-500 text-blue-600"
                      t_en="Posts"
                      t_pt="Postagens"
                      value={
                        selectedCreator.posts.filter((i) => i.type == "image")
                          .length
                      }
                    />
                    <CreatorStat
                      color="bg-emerald-100 dark:bg-emerald-800/10 dark:text-emerald-500 text-emerald-600"
                      t_en="Videos"
                      t_pt="Vídeos"
                      value={
                        selectedCreator.posts.filter((i) => i.type == "reel")
                          .length
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 border-t border-b border-slate-300/80 dark:border-slate-800 p-2">
                <div className="flex items-center gap-2">
                  {userLogged?.id == selectedCreator.user.id && (
                    <>
                      <AuSoftUI.UI.Button
                        onClick={() => handleOpenModal("ct-info")}
                        variant={"outline"}
                        size={"sm"}
                        className="items-center"
                      >
                        <CTranslateTo eng="Edit Profile" pt="Editar Perfil" />
                        <ReactIcons.AiICon.AiFillEdit size={15} />
                      </AuSoftUI.UI.Button>
                    </>
                  )}
                  {userLogged?.id != selectedCreator.user.id && (
                    <FollowCreatorButton creator={selectedCreator} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="md:w-[50vw] w-full flex flex-col gap-4">
              {allPosts.length <= 0 && (
                <div className="py-12">
                  <AuSoftUI.Component.ListEmpty
                    action_en=""
                    action_pt=""
                    action_url=""
                    description_en="The creator has not posted anything at the moment."
                    description_pt="O criador ainda não postou nada de momento"
                    title_en="No Creator Post"
                    title_pt="Criador sem postagens"
                    hasAction={false}
                  />
                </div>
              )}
              {allPosts.length > 0 && (
                <>
                  {allPosts.map((post, i) => {
                    return <PostCard post={post} key={i} />;
                  })}
                </>
              )}
            </div>
          </div>
        </ContainerBase>
      )}
    </PageBase>
  );
}
