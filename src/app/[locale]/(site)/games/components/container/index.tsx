"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { useEffect, useState } from "react";
import { useCategoryProvider } from "@/providers/features/CategoryProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BoxCategories from "../../../components/BoxCategories";
import useNews from "@/hooks/api/useNews";
import ScorebatWidget from "@/styles/scorebat/ScoreBatWidget";
import WatchGameModal from "@/@components/(modals)/watch-game";
import { ReactIcons } from "@/utils/icons";
import LiveGame from "./LiveGame";

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
            <CTranslateTo
              eng="Your Favourite Games ⚽"
              pt="Seus Jogos Favoritos ⚽"
            />
          </h4>
        </div>

        <AuSoftUI.UI.TextField.Default
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value);
            setTimeout(() => {
              handleSeachByName({
                name: e.target.value,
                category_id: selectedCategory?.id,
              });
            }, 800);
          }}
          placeholder="Ex: Manchester United"
          weight={"lg"}
          className="rounded-full md:text-lg text-base text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
        />
      </div>

      <div className="md:m-8 m-4 flex flex-col">
        <LiveGame />
      </div>
    </div>
  );
}
