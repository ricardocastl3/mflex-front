import { localImages } from "@/utils/images";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function HeroPlans() {
  return (
    <div
      id="start"
      style={{
        objectFit: "fill",
        backgroundRepeat: "no-repeat",
        backgroundPosition: window.innerWidth <= 765 ? "center" : "",
        backgroundImage: `url(${localImages.banner.banner2.src})`,
        backgroundSize: "cover",
      }}
      className="md:h-[60vh] h-[45vh] flex-col relative flex  items-center text-center justify-center md:px-14 px-4"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex flex-col gap-2 z-20 md:px-0 px-8 md:w-[50vw] w-full">
        <h1 className="md:text-[2rem] text-[1.7rem] font-bold text-white">
          <CTranslateTo eng="Flex Plans" pt="Planos Flex" />
        </h1>
        <h4 className="flex text-white md:mt-2 t-2 text-lg">
          <CTranslateTo
            eng="Enjoy unlimited access to exclusive features: AI Game Analysis, Ad-Free Live Gaming, and much more! 🚀"
            pt="Desfrute de acesso ilimitado a recursos exclusivos: Análise de Jogos com IA, Jogos Ao Vivo sem Ads e muito mais! 🚀"
          />
        </h4>
      </div>
    </div>
  );
}
