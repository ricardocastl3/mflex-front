import VideoBackground from "../../components/video/VideoBackground";

export default function HeroNews() {
  return (
    <div id="start" className="md:h-[55vh] h-[35vh] w-full relative">
      <div className="absolute z-20 inset-0 bg-black/50"></div>
      <VideoBackground
        fallback_url="https://images.pexels.com/photos/4219812/pexels-photo-4219812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        video_url="/assets/futebol-3.mp4"
      />
    </div>
  );
}
