import { localImages } from "@/utils/images";

import VideoBackground from "../../components/video/VideoBackground";

export default function HeroTV() {
  return (
    <div id="start" className="md:h-[50vh] h-[35vh] w-full relative">
      <div className="absolute z-20 inset-0 bg-black/50"></div>
      <VideoBackground
        fallback_url={`${localImages.banner.bannerTv.src}`}
        video_url="/assets/movie.mp4"
      />
    </div>
  );
}
