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
        fallback_url="https://img.freepik.com/free-vector/musical-clef-notation-background-your-concert-vector_1017-47633.jpg?t=st=1749675612~exp=1749679212~hmac=a778b40ffe4acc3b09b34c13402fb9bf645e288b688b8cfe23562db0ac9598c9&w=1380"
        video_url={slug ? "/sd" : "/assets/drums.mp4"}
      />
    </div>
  );
}
