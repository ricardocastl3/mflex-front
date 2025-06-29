"use client";

import { use, useCallback, useEffect, useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { internalApi, langByCookies } from "@/http/axios/api";
import { IMusic } from "@/http/interfaces/models/artists/IMusic";
import { useResourceProvider } from "@/providers/features/ResourceProvider";

import NewSkeleton from "./components/MusicSkeleton";
import HeroMusics from "../components/Hero";

import useMusics from "@/hooks/api/musics/useMusics";
import MusicContent from "./components/MusicContent";
import MusicRelated from "./components/MusicRelated";
import MusicOthers from "./components/MusicOthers";
import CommentContainer from "../../components/comments/CommentContainer";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function PreviewMusic({ params }: Props) {
  const pars = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMusic, setSelectedMusic] = useState<IMusic | undefined>();

  const { isLoadingAllMusics, allMusics } = useMusics({ route: "slug" });

  const { fetchResource } = useResourceProvider();

  const fetchMusics = useCallback(async () => {
    try {
      const resp = await internalApi.get("/artists/musics", {
        params: {
          slug: pars.slug,
        },
      });

      if (!resp.data.music.is_online) {
        window.location.href = `/${langByCookies}/musics`;
        return;
      }

      setSelectedMusic(resp.data.music);
      setIsLoading(false);
    } catch (err) {
      window.location.href = `/${langByCookies}/musics`;
    }
  }, []);

  useEffect(() => {
    if (fetchResource) fetchMusics();
  }, [fetchResource]);

  useEffect(() => {
    fetchMusics();
  }, []);

  if (isLoading || isLoadingAllMusics) {
    return (
      <div className="flex flex-col">
        <div className="relative">
          <HeroMusics />
          <div className="absolute inset-0 justify-center flex items-center">
            <ReactIcons.PiIcon.PiSpinner
              size={40}
              className="animate-spin text-white"
            />
          </div>
        </div>
        <NewSkeleton />
      </div>
    );
  }

  if (selectedMusic && !isLoading && !isLoadingAllMusics)
    return (
      <div className="flex flex-col md:gap-8 gap-0">
        <div className="relative">
          <HeroMusics slug={true} />
          <div className="w-full md:flex hidden z-20 absolute inset-0 justify-center items-center">
            <div className="md:w-[60vw] w-[90vw] md:px-8 p-4 text-center">
              <h1 className="md:text-[1.8rem] text-2xl md:leading-[3rem] leading-[2rem] text-center text-white">
                {selectedMusic.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-8 md:px-[3rem] px-0">
          <MusicContent music={selectedMusic} />
          <MusicRelated
            displayMode="desktop"
            newElement={selectedMusic}
            musics={allMusics.musics}
          />
          <div className="md:hidden flex px-4 w-full">
            <CommentContainer displayMode="mobile" resource={selectedMusic} />
          </div>
        </div>

        <CommentContainer displayMode="desktop" resource={selectedMusic} />
        <MusicRelated
          displayMode="mobile"
          newElement={selectedMusic}
          musics={allMusics.musics}
        />

        <MusicOthers newElement={selectedMusic} musics={allMusics.musics} />
      </div>
    );
}
