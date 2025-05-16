"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import { ITVCategorySafed } from "@/http/interfaces/models/ITVChannel";
import { AuSoftUI } from "@/@components/(ausoft)";

import HeroTV from "./components/Hero";
import useMyChannels from "@/hooks/api/flex-tv/useMyChannels";
import TVCategorysItem from "./components/TVCategorysItem";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TVFilterBox from "./components/TVFilterBox";

export default function NewsPage() {
  const { isLoadingCurrentSubsUsage, currentSubscription } = useAuth();

  const { allTVChannels, handleSeachByName, isLoadingAllTVChannels } =
    useMyChannels();

  const [newCategory, setNewCategory] = useState<ITVCategorySafed[]>([]);
  const [previousNewCategory, setPreviousNewCategory] = useState<
    ITVCategorySafed[]
  >([]);

  const [searchField, setSearchField] = useState("");

  const [selectedTypeChannel, setSelectedTypeChannel] = useState("all");

  useEffect(() => {
    if (!allTVChannels) return;

    setSelectedTypeChannel("all");

    const meRawCategory = allTVChannels.me;
    const otherRawCategory = allTVChannels.others;

    const safedCategory: ITVCategorySafed[] = [];

    meRawCategory.forEach((cat) => {
      if (cat.tv_channels.length <= 0) return;

      const find = safedCategory.find((i) => i.id == cat.id);

      if (!find) {
        safedCategory.push({
          id: cat.id,
          name: cat.name,
          tv: [
            {
              id: cat.tv_channels[0].id,
              st: cat.tv_channels[0].st,
              logo: cat.tv_channels[0].logo,
              name: cat.tv_channels[0].name,
              plan: cat.tv_channels[0].plan,
              public: cat.tv_channels[0].is_public,
              me: true,
            },
          ],
        });

        const updateCategory = safedCategory.find((i) => i.id == cat.id);
        if (updateCategory)
          cat.tv_channels.forEach((tv) => {
            const findTV = updateCategory.tv.find((i) => i.id == cat.id);
            if (!findTV) {
              updateCategory.tv.push({
                id: tv.id,
                st: tv.st,
                logo: tv.logo,
                name: tv.name,
                plan: tv.plan,
                public: tv.is_public,
                me: true,
              });
            }
          });
      }
    });

    otherRawCategory.forEach((cat) => {
      if (cat.tv_channels.length <= 0) return;

      const findCategory = safedCategory.find((i) => i.id == cat.id);
      if (findCategory) {
        cat.tv_channels.forEach((tv) => {
          const findTV = findCategory.tv.find((i) => i.st == tv.st);
          if (!findTV)
            findCategory.tv.push({
              id: tv.id,
              logo: tv.logo,
              name: tv.name,
              st: tv.st,
              plan: tv.plan,
              public: tv.is_public,
              me: false,
            });
        });
      } else {
        safedCategory.push({
          id: cat.id,
          name: cat.name,
          tv: [
            {
              id: cat.tv_channels[0].id,
              logo: cat.tv_channels[0].logo,
              name: cat.tv_channels[0].name,
              st: cat.tv_channels[0].st,
              plan: cat.tv_channels[0].plan,
              public: cat.tv_channels[0].is_public,
              me: false,
            },
          ],
        });

        const updateCategory = safedCategory.find((i) => i.id == cat.id);
        if (updateCategory)
          cat.tv_channels.forEach((tv) => {
            const findTV = updateCategory.tv.find((i) => i.st == tv.st);
            if (!findTV) {
              updateCategory.tv.push({
                id: tv.id,
                logo: tv.logo,
                name: tv.name,
                plan: tv.plan,
                st: tv.st,
                public: tv.is_public,
                me: false,
              });
            }
          });
      }
    });

    setNewCategory(safedCategory);
    setPreviousNewCategory(safedCategory);
  }, [allTVChannels]);

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
        const tvs = cat.tv.filter((i) => !i.me || !i.public);
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
      <HeroTV />
      <div className="flex flex-col gap-4 relative">
        <div className="z-20 flex w-full items-center justify-center absolute -top-28 flex-col gap-4">
          <div className="w-full justify-center text-center flex flex-col gap-2">
            <h4 className="text-white font-bold md:text-2xl text-xl">
              <CTranslateTo eng="Flex TV 📺" pt="Flex TV 📺" />
            </h4>
            <h2 className="text-white text-base">
              <CTranslateTo
                eng="Search for the channel name"
                pt="Procure pelo nome do seu canal"
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
            placeholder="Ex: SIC K"
            weight={"lg"}
            className="rounded-full md:text-lg text-base text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
          />
        </div>

        <div className="flex flex-col gap-4 md:p-12 m-6">
          {(isLoadingAllTVChannels || isLoadingCurrentSubsUsage) && (
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
          {!isLoadingAllTVChannels && newCategory.length > 0 && (
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

          {!isLoadingAllTVChannels && newCategory.length <= 0 && (
            <div className="animate-fade flex items-center w-full h-full justify-center md:mt-16 mt-12 md:mb-24 mb-12">
              <AuSoftUI.Component.ListEmpty
                action_en="Get In Touch"
                action_pt="Entrar em contacto"
                action_url="https://wa.me/244954974069?text=Olá, preciso de ajuda com a plataforma"
                description_en="OOops! The channels were not loaded correctly, please refresh the page. If the error persists, please contact us!"
                description_pt="OOops! Os canais não foram carregados corretamente, atualize a página. Caso o erro persista, entre em contacto conosco!"
                title_en="Unavailable Channels"
                title_pt="Canais Indisponíveis"
                action_blank
                hasAction
              />
            </div>
          )}

          {/*         <TVItem
            item={{
              channel: "TV Zimbo",
              id: "ddsd",
              image: localImages.logos.mflex.src,
              url: `http://localhost:3080/api/streams/pbc/lg3026f-3d08-4ae1-a2cd-f35b0a98791a`,
            }}
          />
          <TVItem
            item={{
              channel: "TV Vitoria",
              id: "ddsd",
              image: localImages.logos.mflex.src,
              url: "https://stmv1.srvif.com/tvvitoriamz/tvvitoriamz/playlist.m3u8",
            }}
          />
          <TVItem
            item={{
              channel: "Revry Brasil",
              id: "ddsd",
              image: localImages.logos.mflex.src,
              url: "https://linear-181.frequency.stream/mt/brightcove/181/hls/master/playlist.m3u8",
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}
