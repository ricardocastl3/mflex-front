"use client";

import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";
import { useMusicProvider } from "@/providers/features/MusicProvider";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";
import useMusics from "@/hooks/api/musics/useMusics";
import MusicBox from "./box/MusicBox";
import MusicNoSubscription from "./box/MusicNoSubscription";
import Link from "next/link";

export default function MusicPage() {
  const { handleOpenModal } = useModal();
  const {
    handleSeachByName,
    allMusics,
    isLoadingAllMusics,
    handleLoadMore,
    isLoadingMoreMusics,
    fetchAllMusics,
  } = useMusics({
    route: "app",
  });
  const { handleSelectMusic, fetchMusic } = useMusicProvider();
  const { currentArtistSubscription } = useAuth();

  // Controls
  const [canSearch, setCanSearch] = useState(false);
  const [searchMusic, setSearchMusic] = useState("");

  // Debounced search effect
  useEffect(() => {
    if (!canSearch) return;

    const handler = setTimeout(() => {
      if (searchMusic === "") {
        fetchAllMusics();
      } else {
        handleSeachByName({ name: searchMusic });
      }
      setCanSearch(false);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchMusic, canSearch]);

  useEffect(() => {
    if (fetchMusic) fetchAllMusics();
  }, [fetchMusic]);

  return (
    <PageBase>
      <div className="flex md:items-center items-stretch md:flex-row flex-col gap-4 justify-between border-b w-full pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.FaIcon.FaMusic size={18} />
          <CTranslateTo eng="My Musics" pt="Minhas Músicas" />
        </h4>
        <div className="flex items-center gap-3">
          <AuSoftUI.UI.TextField.Default
            value={searchMusic}
            onChange={(e) => {
              handleSeachByName({ name: e.target.value, mode: "app" });
              setSearchMusic(e.target.value);
            }}
            weight={"sm"}
            className="md:w-[19rem] w-full rounded-full font-bold border-slate-400"
            placeholder="→ Informe o título da música..."
          />
          {currentArtistSubscription && (
            <div className="md:flex hidden items-center gap-3">
              <AuSoftUI.UI.Button
                onClick={() => {
                  if (
                    currentArtistSubscription.subscription.is_expired ||
                    currentArtistSubscription.musics == 0
                  ) {
                    handleOpenModal("art-subs-limit");
                  }
                  if (
                    !currentArtistSubscription.subscription.is_expired &&
                    currentArtistSubscription.musics > 0
                  ) {
                    handleSelectMusic(undefined);
                    handleOpenModal("art-add-music");
                  }
                }}
                size={"sm"}
                className="rounded-full py-2"
                variant={"primary"}
              >
                <CTranslateTo eng="New Music" pt="Nova Música" />
                <ReactIcons.Hi2Icon.HiMusicalNote size={18} />
              </AuSoftUI.UI.Button>

              {currentArtistSubscription.subscription.is_expired && (
                <Link href={`/${langByCookies}/art-pricing`}>
                  <AuSoftUI.UI.Button
                    size={"sm"}
                    className="rounded-full py-2 animate-pulse"
                    variant={"primary"}
                  >
                    <CTranslateTo eng="Renew plan" pt="Renovar plano" />
                    <ReactIcons.Hi2Icon.HiMusicalNote size={18} />
                  </AuSoftUI.UI.Button>
                </Link>
              )}
            </div>
          )}
        </div>
        {currentArtistSubscription && (
          <div className="md:hidden flex fixed gap-4 bottom-[4.9rem] right-[4.4rem] z-20">
            <AuSoftUI.UI.Button
              size={"sm"}
              onClick={() => {
                if (
                  currentArtistSubscription.subscription.is_expired ||
                  currentArtistSubscription.musics == 0
                ) {
                  handleOpenModal("art-subs-limit");
                }
                if (
                  !currentArtistSubscription.subscription.is_expired &&
                  currentArtistSubscription.musics > 0
                ) {
                  handleSelectMusic(undefined);
                  handleOpenModal("art-add-music");
                }
              }}
              className="rounded-full p-3"
              variant={"primary"}
            >
              <ReactIcons.Hi2Icon.HiMusicalNote size={18} />
            </AuSoftUI.UI.Button>
          </div>
        )}
      </div>

      <ContainerBase>
        {!currentArtistSubscription && <MusicNoSubscription />}

        {currentArtistSubscription && (
          <MusicBox
            isLoading={isLoadingAllMusics}
            isLoadingMore={isLoadingMoreMusics}
            musicsAPI={allMusics}
            fetchMore={() => handleLoadMore({ name: searchMusic })}
          />
        )}
      </ContainerBase>
    </PageBase>
  );
}
