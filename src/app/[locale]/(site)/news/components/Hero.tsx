import VideoBackground from "../../components/video/VideoBackground";

export default function HeroNews() {
  return (
    <div className="md:h-[55vh] h-[35vh] w-full relative">
      <div className="absolute z-20 inset-0 bg-black/70"></div>
      <VideoBackground
        fallback_url="https://images.pexels.com/photos/246684/pexels-photo-246684.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
        video_url="/assets/big-news.mp4"
      />
    </div>
  );
}
