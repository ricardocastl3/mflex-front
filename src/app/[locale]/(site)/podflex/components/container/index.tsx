"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { useEffect, useState } from "react";
import { useCategoryProvider } from "@/providers/features/CategoryProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BoxCategories from "../../../components/BoxCategories";
import PodFlexCard from "./PodFlexCard";
import usePodcasts from "@/hooks/api/usePodCasts";

export default function PodFlexContainer() {
  // Contexts
  const {
    allPodcasts,
    hasMorePodcasts,
    isLoadingMorePodcasts,
    handleLoadMore,
    handleSeachByName,
    isLoadingAllPodcasts,
  } = usePodcasts();
  const { selectedCategory } = useCategoryProvider();

  // Controls
  const getItemIndex = (i: number) => {
    return i % 4; // Retorna 0, 1, 2 ou 3 ciclicamente
  };

  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    if (
      !hasMorePodcasts ||
      isLoadingAllPodcasts ||
      isLoadingMorePodcasts ||
      (!isLoadingMorePodcasts && !hasMorePodcasts)
    )
      return;

    let isLoading = false; // Controle para evitar chamadas repetidas

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;

      const height = window.innerWidth > 765 ? 400 : 500;

      if (scrollTop + clientHeight >= scrollHeight - height && !isLoading) {
        isLoading = true; // Marcar como carregando
        setTimeout(async () => {
          await handleLoadMore({
            category_id: selectedCategory?.id,
            name: searchField,
          });
          isLoading = false; // Resetar após a chamada
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMorePodcasts, isLoadingAllPodcasts]);

  return (
    <div className="flex flex-col gap-5 relative md:mb-28 mb-12">
      <div className="z-20 flex w-full items-center justify-center absolute -top-24 flex-col gap-4">
        <div className="w-full justify-center text-center">
          <h4 className="text-white font-bold md:text-2xl text-xl">
            <CTranslateTo
              eng="The Best PodCasts 🎙️"
              pt="Os Melhores PodCasts 🎙️"
            />
          </h4>
        </div>
        <AuSoftUI.UI.TextField.Default
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value);
            handleSeachByName({
              name: e.target.value,
              category_id: selectedCategory?.id,
            });
          }}
          placeholder="Ex: Fly PodCast...."
          weight={"lg"}
          className="rounded-full md:text-lg text-base text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
        />
      </div>

      <BoxCategories
        view="podflex"
        callback={(e) => {
          handleSeachByName({
            name: searchField,
            category_id: e,
          });
        }}
      />

      <div className="flex flex-col md:px-[3rem] px-5">
        {!isLoadingAllPodcasts && allPodcasts.length > 0 && (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            {allPodcasts.map((event, i) => {
              const currentIndex = getItemIndex(i);
              return (
                <PodFlexCard key={i} index={currentIndex} podcast={event} />
              );
            })}

            {isLoadingMorePodcasts && (
              <>
                {Array.from({ length: 4 }).map((event, i) => {
                  return (
                    <div
                      key={i}
                      className="p-8 h-[50vh] rounded-xl bg-slate-300/40 dark:bg-ausoft-slate-900 animate-pulse"
                    ></div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {!isLoadingAllPodcasts &&
          !isLoadingMorePodcasts &&
          allPodcasts.length <= 0 && (
            <div className="w-full h-full flex justify-center py-12 md:px-[3rem] px-5 flex-col">
              <AuSoftUI.Component.ListEmpty
                action_en=""
                action_pt=""
                action_url=""
                description_en="No available podcasts at moment"
                description_pt="Sem Podcasts disponíveis de momento"
                title_en="No PodCasts"
                title_pt="Sem PodCasts"
                hasAction={false}
              />
            </div>
          )}
      </div>
    </div>
  );
}
