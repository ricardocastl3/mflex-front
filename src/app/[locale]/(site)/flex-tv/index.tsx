"use client";

import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { Meteors } from "@/@components/(aceternity)/Meteors";

import usePlan from "@/hooks/api/usePlan";
import HeroTV from "./components/Hero";
import TVItem from "./components/TVITem";
import { localImages } from "@/utils/images";

export default function NewsPage() {
  const { isLoadingAllPlans, allPlans } = usePlan();
  const { isLoadingCurrentSubsUsage } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <HeroTV />
      <div className="relative">
        {(isLoadingAllPlans || isLoadingCurrentSubsUsage) && (
          <div className="p-4 flex w-full h-full justify-center items-center md:my-16 my-12">
            <div>
              <ReactIcons.CgIcon.CgSpinner
                size={30}
                className="dark:text-white animate-spin"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 md:p-12 m-6">
          <TVItem
            item={{
              channel: "TV Zimbo",
              id: "ddsd",
              image: localImages.logos.mflex.src,
              url: "https://sgn-cdn-video.vods2africa.com/Tv-Zimbo/index.fmp4.m3u8",
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
          />
        </div>
      </div>
    </div>
  );
}
