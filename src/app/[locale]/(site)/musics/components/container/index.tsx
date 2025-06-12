"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { useEffect, useState } from "react";
import { useCategoryProvider } from "@/providers/features/CategoryProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BoxCategories from "../../../components/BoxCategories";
import MusicCardPublic from "./MusicCardPublic";
import useNews from "@/hooks/api/useNews";
import useMusics from "@/hooks/api/musics/useMusics";
import { langByCookies } from "@/http/axios/api";

export default function MusicsContainer() {
  // Contexts
  const {
    allMusics,
    isLoadingMoreMusics,
    handleLoadMore,
    handleSeachByName,
    isLoadingAllMusics,
  } = useMusics({ route: "public" });
  const { selectedCategory } = useCategoryProvider();

  // Controls
  const getItemIndex = (i: number) => {
    return i % 4; // Retorna 0, 1, 2 ou 3 ciclicamente
  };

  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    if (
      !allMusics.has ||
      isLoadingAllMusics ||
      isLoadingMoreMusics ||
      (!isLoadingMoreMusics && !allMusics.has)
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
  }, [isLoadingMoreMusics, isLoadingAllMusics]);

  return (
    <div className="flex flex-col gap-5 relative md:mb-28 mb-12">
      <div className="z-20 flex w-full items-center justify-center absolute md:-top-24 -top-24 flex-col gap-4">
        <div className="w-full justify-center text-center">
          <h4 className="text-white font-bold md:text-2xl text-xl">
            <CTranslateTo
              eng="Your favourite musics 🎼"
              pt="Suas músicas favoritas 🎼"
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
          placeholder={
            langByCookies == "pt"
              ? "Escreva o título da música..."
              : "Write the song title..."
          }
          weight={"lg"}
          className="rounded-full md:text-lg text-base text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
        />
      </div>

      <BoxCategories
        view="musics"
        callback={(e) => {
          handleSeachByName({
            name: searchField,
            category_id: e,
          });
        }}
      />

      <div className="flex flex-col md:px-[3rem] px-5">
        {!isLoadingAllMusics && allMusics.musics.length > 0 && (
          <div className="grid md:grid-cols-5 grid-cols-1 gap-x-6 gap-y-8 ">
            {allMusics.musics.map((event, i) => {
              const currentIndex = getItemIndex(i);
              return (
                <MusicCardPublic key={i} index={currentIndex} music={event} />
              );
            })}

            {isLoadingMoreMusics && (
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

        {isLoadingAllMusics && (
          <>
            <div className="grid md:grid-cols-5 grid-cols-1 gap-x-6 gap-y-8">
              {Array.from({ length: 4 }).map((event, i) => {
                return (
                  <div
                    key={i}
                    className="p-8 h-[40vh] rounded-xl bg-slate-300/40 dark:bg-ausoft-slate-900 animate-pulse"
                  ></div>
                );
              })}
            </div>
          </>
        )}

        {!isLoadingAllMusics &&
          !isLoadingMoreMusics &&
          allMusics.musics.length <= 0 && (
            <div className="w-full h-full flex justify-center py-12 md:px-[3rem] px-5 flex-col">
              <AuSoftUI.Component.ListEmpty
                action_en=""
                action_pt=""
                action_url=""
                description_en="No available musics at moment"
                description_pt="Sem músicas disponíveis de momento"
                title_en="No Musics"
                title_pt="Sem Músicas"
                hasAction={false}
              />
            </div>
          )}
      </div>
    </div>
  );
}
