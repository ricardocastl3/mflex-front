import VideoBackground from "../../components/video/VideoBackground";

export default function HeroEvents({
  route = "all",
}: {
  route?: "slug" | "all";
}) {
  return (
    <div className="md:h-[55vh] h-[35vh] w-full relative">
      <div className="absolute z-10 inset-0 bg-black/70"></div>

      <VideoBackground
        fallback_url="https://images.pexels.com/photos/3122799/pexels-photo-3122799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        video_url={route == "all" ? "/assets/events.mp4" : "/video"}
      />
    </div>
  );
}
