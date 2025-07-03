"use client";

import { ReactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import { useCreatorProvider } from "@/providers/features/CreatorProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useOwnCreatorPost from "@/hooks/api/creators/useOwnCreatorPost";
import PageBase from "@/app/[locale]/app/@components/PageBase";
import ContainerBase from "@/app/[locale]/app/@components/ContainerBase";

export default function CreatorPage() {
  const {
    isLoadingMorePosts,
    handleLoadMore,
    allCreatorPosts,
    fetchAllCreatorPosts,
    isLoadingCreatorPosts,
  } = useOwnCreatorPost({ side: "page" });

  const { fetchCreatorPost } = useCreatorProvider();

  return (
    <>
      <PageBase>
        <div className="flex md:items-center items-stretch flex-row  gap-4 justify-between border-b w-full pb-2 border-slate-300 dark:border-slate-800">
          <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
            <ReactIcons.HiIcon.HiChartPie size={18} />
            <CTranslateTo eng="Statistics" pt="Estatísicas" />
          </h4>
        </div>
        <ContainerBase>
          <div>
            <h1 className="text-yellow-500">
              <CTranslateTo
                eng="We are working on your statistics..."
                pt="Estamos trabalhando nas suas estatísticas..."
              />{" "}
              {` 🙂‍↔️`}
            </h1>
          </div>
        </ContainerBase>
      </PageBase>
    </>
  );
}
