"use client";

import { ReactIcons } from "@/utils/icons";
import { creatorServices } from "./components/services";
import { useEffect, useState } from "react";
import { useCreatorProvider } from "@/providers/features/CreatorProvider";
import { AuSoftUI } from "@/@components/(ausoft)";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";
import CardCreatorItem from "./components/card-items";
import PostCard from "./components/PostCard";
import SelectCreatePostDropdown from "./components/create-dropdown";
import useOwnCreatorPost from "@/hooks/api/creators/useOwnCreatorPost";

export default function CreatorPage() {
  const {
    isLoadingMorePosts,
    handleLoadMore,
    allCreatorPosts,
    fetchAllCreatorPosts,
    isLoadingCreatorPosts,
  } = useOwnCreatorPost({ side: "page" });

  const { fetchCreatorPost } = useCreatorProvider();

  // Controls
  const [canSearch, setCanSearch] = useState(false);
  const [searchMusic, setSearchMusic] = useState("");

  // Debounced search effect
  useEffect(() => {
    if (!canSearch) return;

    const handler = setTimeout(() => {
      if (searchMusic === "") {
        //fetchAll
      } else {
        ///  handleSeachByName({ name: searchMusic });
      }
      setCanSearch(false);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchMusic, canSearch]);

  useEffect(() => {
    if (
      !allCreatorPosts.has ||
      isLoadingCreatorPosts ||
      isLoadingMorePosts ||
      (!isLoadingMorePosts && !allCreatorPosts.has)
    )
      return;

    let isLoading = false; // Controle para evitar chamadas repetidas

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;

      const height = window.innerWidth > 765 ? 1000 : 800;

      if (scrollTop + clientHeight >= scrollHeight - height && !isLoading) {
        isLoading = true; // Marcar como carregando
        setTimeout(async () => {
          await handleLoadMore({ name: "" });
          isLoading = false;
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMorePosts, isLoadingCreatorPosts]);

  useEffect(() => {
    if (fetchCreatorPost) fetchAllCreatorPosts();
  }, [fetchCreatorPost]);

  return (
    <>
      <PageBase>
        <div className="flex md:items-center items-stretch flex-row  gap-4 justify-between border-b w-full pb-2 border-slate-300 dark:border-slate-800">
          <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
            <ReactIcons.HiIcon.HiColorSwatch size={18} />
            <CTranslateTo eng="Creator Panel" pt="Painel do Criador" />
          </h4>
          <div className="flex items-center gap-3 w-fit">
            <SelectCreatePostDropdown />
          </div>
        </div>

        <ContainerBase>
          <div className="md:py-4 py-0.5 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {creatorServices.map((service, i) => {
                  return <CardCreatorItem service={service} key={i} />;
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-base dark:text-white font-bold">
                <CTranslateTo eng="Posts" pt="Publicações" />
              </h1>
            </div>
            {!isLoadingCreatorPosts && allCreatorPosts.posts.length > 0 && (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {allCreatorPosts.posts.map((post, i) => {
                  return <PostCard post={post} key={i} />;
                })}
              </div>
            )}

            {!isLoadingCreatorPosts && allCreatorPosts.posts.length <= 0 && (
              <div className="md:py-12 py-8">
                <AuSoftUI.Component.ListEmpty
                  action_en=""
                  action_pt=""
                  action_url=""
                  description_en="All posts you create will be displayed here."
                  description_pt="Todas publicações que criares serão mostradas aqui"
                  title_en="No Result"
                  title_pt="Sem Resultados"
                  hasAction={false}
                />
              </div>
            )}

            {isLoadingCreatorPosts && (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {Array.from({ length: 6 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="rounded-xl bg-slate-300 dark:bg-slate-800/50 animate-pulse p-24"
                    ></div>
                  );
                })}
              </div>
            )}
          </div>
        </ContainerBase>
      </PageBase>
    </>
  );
}
