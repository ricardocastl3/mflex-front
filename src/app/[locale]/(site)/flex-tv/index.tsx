"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ITVCategorySafed,
  ITVChannel,
} from "@/http/interfaces/models/tv/ITVChannel";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useSearchParams } from "next/navigation";
import { internalApi } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { useAuth } from "@/providers/auth/AuthProvider";

import HeroTV from "./components/Hero";
import useMyChannels from "@/hooks/api/flex-tv/useMyChannels";
import TVCategorysItem from "./components/TVCategorysItem";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TVFilterBox from "./components/TVFilterBox";
import Link from "next/link";

export default function FlexTVPage() {
  const { allTVChannels, handleSeachByName, isLoadingAllTVChannels } =
    useMyChannels();
  const { handleCloseLeagueBox } = useAppProvider();
  const { currentSubscription } = useAuth();

  const { handleOpenModal } = useModal();
  const { handleSelectFlexTV } = useFlexTVProvider();

  const [newCategory, setNewCategory] = useState<ITVCategorySafed[]>([]);
  const [previousNewCategory, setPreviousNewCategory] = useState<
    ITVCategorySafed[]
  >([]);

  const [searchField, setSearchField] = useState("");
  const [selectedTypeChannel, setSelectedTypeChannel] = useState("active");
  const [firstWatch, setFirstWatch] = useState(true);
  const [isLoading, setIsLoadings] = useState(true);

  useEffect(() => {
    if (isLoadingAllTVChannels) {
      setIsLoadings(true);
      return;
    }
    if (!allTVChannels) return;

    const meRawCategory = allTVChannels.filter(
      (cat) => cat.tv_channels.length > 0
    );

    let safedCategory: ITVCategorySafed[] = [];

    meRawCategory.forEach((cat) => {
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
              public: cat.tv_channels[0].is_public,
              is_live: cat.tv_channels[0].is_live,
              views: cat.tv_channels[0].views,
              me: true,
            },
          ],
        });

        const updateCategory = safedCategory.find((i) => i.id == cat.id);
        if (updateCategory)
          cat.tv_channels.forEach((tv) => {
            const findTV = updateCategory.tv.find((i) => i.id == tv.id);
            if (!findTV) {
              updateCategory.tv.push({
                id: tv.id,
                st: tv.st,
                logo: tv.logo,
                name: tv.name,
                is_live: tv.is_live,
                public: tv.is_public,
                me: true,
                views: tv.views,
              });
            }
          });
      }
    });

    setPreviousNewCategory(safedCategory);

    const isFlexed =
      currentSubscription &&
      currentSubscription?.flex_tv &&
      !currentSubscription?.subscription.is_expired
        ? true
        : false;

    // Set new category in first use
    if (firstWatch && !isFlexed) {
      setFirstWatch(false);
      safedCategory = safedCategory.map((cat) => {
        const tvs = cat.tv.filter((i) => i.public);
        return {
          id: cat.id,
          name: cat.name,
          tv: tvs,
        };
      });
    }

    setNewCategory(safedCategory);
    setSelectedTypeChannel(firstWatch && !isFlexed ? "active" : "all");
    setIsLoadings(false);
  }, [allTVChannels, isLoadingAllTVChannels]);

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

  const searchParams = useSearchParams();
  const fetchTV = useCallback(async (id: string) => {
    try {
      const resp = await internalApi.get<{ tv: ITVChannel }>("/streams/chl", {
        params: { id },
      });
      const tv = resp.data.tv;
      handleSelectFlexTV({
        id: tv.id,
        is_live: tv.is_live,
        me: true,
        name: tv.name,
        public: tv.is_public,
        st: tv.st,
        logo: tv.logo,
        views: tv.views,
      });
      handleOpenModal("watch-tv");
    } catch (err) {}
  }, []);

  useEffect(() => {
    const id = searchParams.get("chl") || "";
    if (id == "") return;
    fetchTV(id);
  }, []);

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
      <HeroTV />
      <div className="flex flex-col gap-4 relative">
        <div className="z-20 flex w-full items-center justify-center absolute -top-32 flex-col gap-4">
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
            placeholder="Pesquisar..."
            weight={"lg"}
            className="rounded-full md:text-lg text-base text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
          />
        </div>

        <div className="flex flex-col gap-4 md:mx-[4.5rem] mx-6 md:my-8 my-6">
          {isLoading && (
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
                action_url="https://wa.me/244953320345?text=Olá, preciso de ajuda com a plataforma"
                description_en="OOops! The channels were not loaded correctly, please refresh the page. If the error persists, please contact us!"
                description_pt="OOops! Os canais não foram carregados corretamente, atualize a página. Caso o erro persista, entre em contacto conosco!"
                title_en="Unavailable Channels"
                title_pt="Canais Indisponíveis"
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
