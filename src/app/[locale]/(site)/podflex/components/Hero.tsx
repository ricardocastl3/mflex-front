
export default function HeroNews() {
  return (
    <div className="md:h-[55vh] h-[35vh] w-full relative">
      <div className="absolute z-10 inset-0 bg-black/70"></div>
      <video
        loop
        autoPlay
        muted
        className="absolute -z-0 w-full h-full object-cover m-0 p-0"
      >
        <source src="/assets/podcasts.mp4" height={100}></source>
      </video>
    </div>
  );
}
