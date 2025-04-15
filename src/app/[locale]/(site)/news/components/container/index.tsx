"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { useEffect, useState } from "react";
import { useCategoryProvider } from "@/providers/features/CategoryProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BoxCategories from "../../../components/BoxCategories";
import NewsCard from "./NewsCard";
import useNews from "@/hooks/api/useNews";

export default function NewsContainer() {
  // Contexts
  const {
    allNews,
    hasMoreNews,
    isLoadingMoreNews,
    handleLoadMore,
    handleSeachByName,
    isLoadingAllNews,
  } = useNews({ route: "news" });
  const { selectedCategory } = useCategoryProvider();

  // Controls
  const getItemIndex = (i: number) => {
    return i % 4; // Retorna 0, 1, 2 ou 3 ciclicamente
  };

  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    if (
      !hasMoreNews ||
      isLoadingAllNews ||
      isLoadingMoreNews ||
      (!isLoadingMoreNews && !hasMoreNews)
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
          await handleLoadMore({
            category_id: selectedCategory?.id,
            name: searchField,
          });
          isLoading = false;
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMoreNews, isLoadingAllNews]);

  return (
    <div className="flex flex-col gap-5 relative md:mb-28 mb-12">
      <div className="z-20 flex w-full items-center justify-center absolute -top-24 flex-col gap-4">
        <div className="w-full justify-center text-center">
          <h4 className="text-white font-bold md:text-2xl text-xl">
            <CTranslateTo eng="The big news 🔥" pt="As Grandes Novidades 🔥" />
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
          placeholder="Ex: Concursos Públicos"
          weight={"lg"}
          className="rounded-full md:text-lg text-base text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
        />
      </div>

      <BoxCategories
        view="news"
        callback={(e) => {
          handleSeachByName({
            name: searchField,
            category_id: e,
          });
        }}
      />

      <div className="flex flex-col md:px-[3rem] px-5">
        {!isLoadingAllNews && allNews.length > 0 && (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            {allNews.map((event, i) => {
              const currentIndex = getItemIndex(i);
              return <NewsCard key={i} index={currentIndex} news={event} />;
            })}

            {isLoadingMoreNews && (
              <>
                {Array.from({ length: 4 }).map((event, i) => {
                  return (
                    <div
                      key={i}
                      className="p-8 h-[40vh] rounded-xl bg-slate-300/40 dark:bg-ausoft-slate-900 animate-pulse"
                    ></div>
                  );
                })}
              </>
            )}
          </div>
        )}
        {!isLoadingAllNews && !isLoadingMoreNews && allNews.length <= 0 && (
          <div className="w-full h-full flex justify-center py-12 md:px-[3rem] px-5 flex-col">
            <AuSoftUI.Component.ListEmpty
              action_en=""
              action_pt=""
              action_url=""
              description_en="No available news at moment"
              description_pt="Sem novidades disponíveis de momento"
              title_en="No News"
              title_pt="Sem Novidades"
              hasAction={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
