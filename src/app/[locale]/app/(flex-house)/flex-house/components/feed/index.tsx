import { useEffect, useRef } from "react";
import { localImages } from "@/utils/images";
import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";

import PostCard from "./cards/PostCard";
import CreatorBox from "./box/creator/CreatorBox";
import PostInput from "./cards/PostInput";
import FollowCreatorsBox from "./box/follow-creators/FollowCreatorsBox";
import useCreatorPost from "@/hooks/api/creators/useCreatorPosts";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Image from "next/image";

export default function Feed() {
  const {
    allCreatorPosts,
    isLoadingCreatorPosts,
    fetchAllCreatorPosts,
    handleLoadMore,
    isLoadingMorePosts,
  } = useCreatorPost({ view: "feed" });

  const { fetchFHCreatorPost } = useFlexHouseProvider();
  const isLoadingRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoadingCreatorPosts || isLoadingMorePosts || !allCreatorPosts.has) {
      return;
    }

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
          if (entry.isIntersecting && !isLoadingRef.current) {
            isLoadingRef.current = true;
            setTimeout(async () => {
              await handleLoadMore({ name: "" });
              isLoadingRef.current = false;
            }, 500);
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
  }, [
    isLoadingMorePosts,
    isLoadingCreatorPosts,
    allCreatorPosts.has,
    handleLoadMore,
  ]);

  useEffect(() => {
    if (fetchFHCreatorPost) fetchAllCreatorPosts();
  }, [fetchFHCreatorPost]);

  return (
    <div className="">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:flex hidden md:w-[20vw] w-full h-[67vh] overflow-y-auto flex-col gap-4">
          <CreatorBox />
        </div>

        <div
          ref={scrollContainerRef}
          className="md:px-2 px-0 py-0 gap-4 flex-1 flex-col h-[67vh] overflow-y-auto"
        >
          <PostInput />
          <>
            {!isLoadingCreatorPosts && allCreatorPosts.posts.length > 0 && (
              <>
                {allCreatorPosts.posts.map((post, i) => {
                  return <PostCard key={i} post={post} />;
                })}
              </>
            )}

            {!isLoadingCreatorPosts &&
              !isLoadingMorePosts &&
              allCreatorPosts.posts.length <= 0 && (
                <div className="flex items-center flex-col gap-3 justify-center mt-12 md:px-6 px-4">
                  <Image
                    width={100}
                    height={100}
                    src={localImages.vectors.emptyBox}
                    alt="Imagem de lista não encontrado"
                  />
                  <div className="w-full flex flex-col gap-2">
                    <h4 className="text-lg text-center font-bold text-yellow-700 dark:text-yellow-400">
                      <CTranslateTo
                        eng={"Ops! Something went wrong"}
                        pt={"Opa! Algo deu errado"}
                      />
                    </h4>
                    <h4 className="text-base text-center text-slate-600 dark:text-slate-400">
                      <CTranslateTo
                        eng={"Refresh the page, if it persists, contact us"}
                        pt={
                          "Atualize a página, caso persistir entre em contacto conosco dfjdf dkfnkdf kdnfkdf"
                        }
                      />
                    </h4>
                  </div>
                </div>
              )}

            {isLoadingCreatorPosts && (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-16 mb-4 rounded-xl bg-slate-300 animate-pulse dark:bg-slate-800/70"
                  ></div>
                ))}
              </>
            )}

            {isLoadingMorePosts && (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-16 mb-4 rounded-xl bg-slate-300 animate-pulse dark:bg-slate-800/70"
                  ></div>
                ))}
              </>
            )}
          </>
        </div>
        <div className="md:flex hidden flex-col gap-4 md:w-[20vw] w-full h-[67vh] overflow-y-auto">
          <FollowCreatorsBox />
        </div>
      </div>
    </div>
  );
}
