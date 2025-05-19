"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ITVCategoryMovieSafed } from "@/http/interfaces/models/tv/ITVMovie";

import HeroMovie from "./components/Hero";
import TVCategorysItem from "./components/MovieCategorysItem";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TVFilterBox from "./components/MovieFilterBox";
import useMyMovies from "@/hooks/api/flex-tv/useMyMovies";

export default function FlexMoviePage() {
  const { isLoadingCurrentSubsUsage } = useAuth();

  const { allTVMovies, handleSeachByName, isLoadingAllTVMovies } =
    useMyMovies();

  const [newCategory, setNewCategory] = useState<ITVCategoryMovieSafed[]>([]);
  const [previousNewCategory, setPreviousNewCategory] = useState<
    ITVCategoryMovieSafed[]
  >([]);

  const [searchField, setSearchField] = useState("");

  const [selectedTypeChannel, setSelectedTypeChannel] = useState("all");

  useEffect(() => {
    if (isLoadingAllTVMovies) return;
    if (!allTVMovies) return;

    setSelectedTypeChannel("all");

    const meRawCategory = allTVMovies.me;
    const otherRawCategory = allTVMovies.others;

    const safedCategory: ITVCategoryMovieSafed[] = [];

    meRawCategory.forEach((cat) => {
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
            const findTV = updateCategory.tv.find((i) => i.id == cat.id);
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

    otherRawCategory.forEach((cat) => {
      if (cat.tv_movies.length <= 0) return;

      const findCategory = safedCategory.find((i) => i.id == cat.id);
      if (findCategory) {
        cat.tv_movies.forEach((tv) => {
          const findTV = findCategory.tv.find((i) => i.st == tv.st);
          if (!findTV)
            findCategory.tv.push({
              id: tv.id,
              logo: tv.thumbnail,
              name: tv.name,
              st: tv.st,
              plan: tv.plan,
              public: tv.is_public,
              is_live: tv.is_live,
              rating: tv.rating,
              me: false,
            });
        });
      } else {
        safedCategory.push({
          id: cat.id,
          name: cat.name,
          tv: [
            {
              id: cat.tv_movies[0].id,
              logo: cat.tv_movies[0].thumbnail,
              name: cat.tv_movies[0].name,
              st: cat.tv_movies[0].st,
              plan: cat.tv_movies[0].plan,
              public: cat.tv_movies[0].is_public,
              is_live: cat.tv_movies[0].is_live,
              rating: cat.tv_movies[0].rating,
              me: false,
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
                logo: tv.thumbnail,
                name: tv.name,
                plan: tv.plan,
                st: tv.st,
                public: tv.is_public,
                is_live: tv.is_live,
                me: false,
                rating: tv.rating,
              });
            }
          });
      }
    });

    setNewCategory(safedCategory);
    setPreviousNewCategory(safedCategory);
  }, [allTVMovies, isLoadingAllTVMovies]);

  useEffect(() => {
    if (selectedTypeChannel == "all") setNewCategory(previousNewCategory);
    if (selectedTypeChannel == "active") {
      const categories = previousNewCategory.map((cat) => {
        const tvs = cat.tv.filter((i) => i.me || i.public);
        return {
          id: cat.id,
          name: cat.name,
          tv: tvs,
        };
      });
      setNewCategory(categories);
    }

    if (selectedTypeChannel == "noactive") {
      const categories = previousNewCategory.map((cat) => {
        const tvs = cat.tv.filter((i) => !i.me && !i.public);
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
          {(isLoadingAllTVMovies || isLoadingCurrentSubsUsage) && (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 7 }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl animate-pulse dark:bg-slate-800/30 p-8"
                  ></div>
                );
              })}
            </div>
          )}
          {!isLoadingAllTVMovies && newCategory.length > 0 && (
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

          {!isLoadingAllTVMovies && newCategory.length <= 0 && (
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
