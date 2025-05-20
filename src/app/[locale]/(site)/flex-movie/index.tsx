"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ITVCategoryMovieSafed } from "@/http/interfaces/models/tv/ITVMovie";
import { useAppProvider } from "@/providers/app/AppProvider";
import { ReactIcons } from "@/utils/icons";

import HeroMovie from "./components/Hero";
import TVCategorysItem from "./components/MovieCategorysItem";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TVFilterBox from "./components/MovieFilterBox";
import useMyMovies from "@/hooks/api/flex-tv/useMyMovies";
import Link from "next/link";

export default function FlexMoviePage() {
  const { isLoadingCurrentSubsUsage } = useAuth();

  const { allTVMovies, handleSeachByName, isLoadingAllTVMovies } =
    useMyMovies();

  const { handleCloseLeagueBox } = useAppProvider();

  const [newCategory, setNewCategory] = useState<ITVCategoryMovieSafed[]>([]);
  const [previousNewCategory, setPreviousNewCategory] = useState<
    ITVCategoryMovieSafed[]
  >([]);

  const [searchField, setSearchField] = useState("");
  const [selectedTypeChannel, setSelectedTypeChannel] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoadingAllTVMovies) return;
    if (!allTVMovies) return;

    const safedCategory: ITVCategoryMovieSafed[] = [];

    if (allTVMovies.length > 0) {
      allTVMovies.forEach((cat) => {
        if (cat.tv_movies.length <= 0) return;

        const find = safedCategory.find((i) => i.id == cat.id);

        if (!find) {
          safedCategory.push({
            id: cat.id,
            name: cat.name,
            tv: [
              {
                id: cat.tv_movies[0].id,
                st: cat.tv_movies[0].st,
                logo: cat.tv_movies[0].thumbnail,
                name: cat.tv_movies[0].name,
                plan: cat.tv_movies[0].plan,
                public: cat.tv_movies[0].is_public,
                is_live: cat.tv_movies[0].is_live,
                rating: cat.tv_movies[0].rating,
                me: true,
              },
            ],
          });

          const updateCategory = safedCategory.find((i) => i.id == cat.id);
          if (updateCategory)
            cat.tv_movies.forEach((tv) => {
              const findTV = updateCategory.tv.find((i) => i.st == tv.st);
              if (!findTV) {
                updateCategory.tv.push({
                  id: tv.id,
                  st: tv.st,
                  logo: tv.thumbnail,
                  name: tv.name,
                  plan: tv.plan,
                  public: tv.is_public,
                  is_live: tv.is_live,
                  rating: tv.rating,
                  me: true,
                });
              }
            });
        }
      });
    }
    setNewCategory(safedCategory);
    setPreviousNewCategory(safedCategory);
    setSelectedTypeChannel("all");
    setIsLoading(false);
  }, [allTVMovies, isLoadingAllTVMovies]);

  useEffect(() => {
    if (selectedTypeChannel == "all") setNewCategory(previousNewCategory);
    if (selectedTypeChannel == "active") {
      const categories = previousNewCategory.map((cat) => {
        const tvs = cat.tv.filter((i) => i.public);
        return {
          id: cat.id,
          name: cat.name,
          tv: tvs,
        };
      });
      setNewCategory(categories);
    }
  }, [selectedTypeChannel]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex fixed md:bottom-[4rem] bottom-[4.9rem] md:right-[4rem] right-[4rem] z-20 animate-fade-up">
        <Link href="#start">
          <AuSoftUI.UI.Button
            onClick={handleCloseLeagueBox}
            className="rounded-full p-3 animate-pulse  hover:dark:bg-orange-700 hover:bg-orange-600 transition-all duration-300 dark:bg-orange-600 bg-orange-500 "
          >
            <ReactIcons.BiIcon.BiCaretUp size={18} />
          </AuSoftUI.UI.Button>
        </Link>
      </div>
      <HeroMovie />
      <div className="flex flex-col gap-4 relative">
        <div className="z-20 flex w-full items-center justify-center absolute -top-28 flex-col gap-4">
          <div className="w-full justify-center text-center flex flex-col gap-2">
            <h4 className="text-white font-bold md:text-2xl text-xl">
              <CTranslateTo eng="Flex Movie 🎬" pt="Flex Movie 🎬" />
            </h4>
            <h2 className="text-white text-base">
              <CTranslateTo
                eng="Search for the movie that you want"
                pt="Pesquise pelo filme que deseja"
              />
            </h2>
          </div>
          <AuSoftUI.UI.TextField.Default
            value={searchField}
            onChange={(e) => {
              setSearchField(e.target.value);
              setTimeout(() => {
                handleSeachByName(e.target.value);
              }, 800);
            }}
            placeholder="Pesquisar..."
            weight={"lg"}
            className="rounded-full md:text-lg text-base text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
          />
        </div>

        <div className="flex flex-col gap-4 md:p-12 m-6">
          {(isLoading || isLoadingCurrentSubsUsage) && (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 7 }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl flex justify-center items-center animate-pulse dark:bg-slate-800/30 p-8"
                  >
                    <ReactIcons.PiIcon.PiSpinner
                      size={20}
                      className="animate-spin dark:text-slate-500"
                    />
                  </div>
                );
              })}
            </div>
          )}
          {!isLoading && newCategory.length > 0 && (
            <>
              <TVFilterBox
                setValue={setSelectedTypeChannel}
                value={selectedTypeChannel}
              />
              {newCategory.map((cat, i) => {
                return <TVCategorysItem key={i} category={cat} />;
              })}
            </>
          )}

          {!isLoading && newCategory.length <= 0 && (
            <div className="animate-fade flex items-center w-full h-full justify-center md:mt-16 mt-12 md:mb-24 mb-12">
              <AuSoftUI.Component.ListEmpty
                action_en="Get In Touch"
                action_pt="Entrar em contacto"
                action_url="https://wa.me/244954974069?text=Olá, preciso de ajuda com a plataforma"
                description_en="OOops! The movies were not loaded correctly, please refresh the page. If the error persists, please contact us!"
                description_pt="OOops! Os filmes não foram carregados corretamente, atualize a página. Caso o erro persista, entre em contacto conosco!"
                title_en="Unavailable Movies"
                title_pt="Filmes Indisponíveis"
                action_blank
                hasAction
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
