import { localImages } from "@/utils/images";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function HeroPlans() {
  return (
    <div
      id="start"
      style={{
        objectFit: "fill",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: window.innerWidth <= 765 ? "center" : "",
        backgroundImage: `url(${localImages.bgs.artistBg.src})`,
        backgroundSize: "cover",
      }}
      className="md:h-[60vh] h-[45vh] flex-col relative flex  items-center text-center justify-center md:px-14 px-4"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex flex-col items-center text-center gap-2 z-20 md:px-0 px-8 md:w-[50vw] w-full">
        <h1 className="md:text-[2rem] text-[1.7rem] font-bold text-white">
          <CTranslateTo eng="Artist Plans" pt="Planos para Artistas" />
        </h1>
        <h4 className="flex text-center text-white md:mt-2 t-2 text-lg">
          <CTranslateTo
            eng="Share your music with the world and receive direct support from your fans!"
            pt="Compartilhe sua música com o mundo e receba apoio direto dos seus fãs!"
          />
        </h4>
      </div>
    </div>
  );
}
