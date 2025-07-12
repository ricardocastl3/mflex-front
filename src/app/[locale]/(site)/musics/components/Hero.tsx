import { localImages } from "@/utils/images";
import VideoBackground from "../../components/video/VideoBackground";

export default function HeroMusics({ slug }: { slug?: boolean }) {
  return (
    <div
      className={`${
        slug ? "md:h-[55vh] h-[0vh] md:flex hidden" : "md:h-[55vh] h-[35vh]"
      }  w-full relative`}
    >
      <div className="absolute z-20 inset-0 bg-black/70"></div>
      <VideoBackground
        fallback_url={localImages.bgs.artistBg.src}
        video_url={slug ? "/sd" : "/assets/drums.mp4"}
      />
    </div>
  );
}
