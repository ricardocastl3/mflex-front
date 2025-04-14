import VideoBackground from "../../components/video/VideoBackground";

export default function HeroPodFlex({ route }: { route: string }) {
  return (
    <div
      className={`${
        route == "slug" ? "md:h-[55vh] h-[0vh] md:flex hidden" : "md:h-[55vh] h-[35vh]"
      }  w-full relative`}
    >
      <div className="absolute z-20 inset-0 bg-black/70"></div>

      <VideoBackground
        fallback_url="https://images.pexels.com/photos/270288/pexels-photo-270288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        video_url={route == "list" ? "/assets/podcasts.mp4" : "/video"}
      />
    </div>
  );
}
