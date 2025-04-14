"use client";

import { use, useCallback, useEffect, useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { internalApi, langByCookies } from "@/http/axios/api";
import { IPodcast } from "@/http/interfaces/models/IPodCast";

import HeroPodFlex from "../components/Hero";
import PodSkeleton from "./PodSkeleton";
import usePodcasts from "@/hooks/api/usePodCasts";
import PodContent from "./components/PodContent";
import PodRelated from "./components/PodRelated";
import PodOthers from "./components/PodOthers";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function PreviewNew({ params }: Props) {
  const pars = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPodcasts, setSelectedPodcasts] = useState<
    IPodcast | undefined
  >();

  const { allPodcasts, isLoadingAllPodcasts } = usePodcasts();

  const fetchPodFlex = useCallback(async () => {
    try {
      const resp = await internalApi.get("/podcasts", {
        params: {
          slug: pars.slug,
        },
      });

      if (!resp.data.podcast.available) {
        window.location.href = `/${langByCookies}/podflex`;
        return;
      }
      setSelectedPodcasts(resp.data.podcast);
      setIsLoading(false);
    } catch (err) {
      window.location.href = `/${langByCookies}/podflex`;
    }
  }, []);

  useEffect(() => {
    fetchPodFlex();
  }, []);

  if (isLoading || isLoadingAllPodcasts) {
    return (
      <div className="flex flex-col gap-8">
        <div className="relative">
          <HeroPodFlex route="slug" />
          <div className="absolute inset-0 justify-center flex items-center">
            <ReactIcons.PiIcon.PiSpinner
              size={40}
              className="animate-spin text-white"
            />
          </div>
        </div>
        <PodSkeleton />
      </div>
    );
  }

  if (selectedPodcasts && !isLoading && !isLoadingAllPodcasts)
    return (
      <div className="flex flex-col md:gap-8 gap-0">
        <div className="relative">
          <HeroPodFlex route="slug" />
          <div className="flex justify-center">
            <div className="md:w-[30vw] w-[90vw] md:flex hidden z-20 absolute inset-0 justify-center items-center md:px-8 p-4 text-center">
              <h1 className="md:text-[2rem] text-center text-2xl text-white">
                {selectedPodcasts.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:gap-8 gap-4 md:px-[3rem] px-0">
          <PodContent podflex={selectedPodcasts} />
          <PodRelated podElement={selectedPodcasts} podcasts={allPodcasts} />
        </div>

        <PodOthers podElement={selectedPodcasts} podcasts={allPodcasts} />
      </div>
    );
}
