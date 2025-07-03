"use client";

import { ReactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import { useCreatorProvider } from "@/providers/features/CreatorProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useOwnCreatorPost from "@/hooks/api/creators/useOwnCreatorPost";
import PageBase from "@/app/[locale]/app/@components/PageBase";

export default function CreatorPage() {
  const {
    isLoadingMorePosts,
    handleLoadMore,
    allCreatorPosts,
    fetchAllCreatorPosts,
    isLoadingCreatorPosts,
  } = useOwnCreatorPost({ side: "page" });

  const { fetchCreatorPost } = useCreatorProvider();

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
            <ReactIcons.HiIcon.HiChartPie size={18} />
            <CTranslateTo eng="Statistics" pt="Estatísicas" />
          </h4>
        </div>
      </PageBase>
    </>
  );
}
