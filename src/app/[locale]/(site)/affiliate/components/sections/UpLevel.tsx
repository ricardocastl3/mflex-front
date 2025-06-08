import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function UpLevelSectionAffiliate() {
  return (
    <section
      style={{
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${"https://img.freepik.com/free-vector/gradient-technology-futuristic-background_23-2149115555.jpg?t=st=1749302886~exp=1749306486~hmac=49a2db7771248d2d946242ce9ff71c19509b8906387c9f97e4fd26a2433d5032&w=1380"})`,
      }}
      className="relative md:h-[70vh] h-[60vh] flex items-center justify-center bg-yellow-500  md:my-8 my-6"
    >
      <div className="absolute z-0 flex-col gap-2 bg-black/50 inset-0 flex justify-center items-center">
        <div className="p-2 rounded-full bg-yellow-500 text-white">
          <ReactIcons.AiICon.AiFillStar size={14} />
        </div>
        <div className="md:w-[60vw] w-[90vw] text-center flex-col gap-6 items-center flex justify-center">
          <h1 className="md:text-[2rem] text-[1.5rem] text-white font-extrabold border-b-4 border-white">
            <CTranslateTo eng="Level Up Your Success" pt="Eleve Seu Sucesso" />
          </h1>
          <h3 className="md:text-xl text-lg text-yellow-50 font-medium">
            <CTranslateTo
              eng="Join FLEX's elite affiliate program and unlock exclusive rewards, monthly prizes, and earning potential"
              pt="Junte-se ao programa de afiliados elite da FLEX e desbloqueie recompensas exclusivas, prêmios mensais e potencial de ganhos"
            />
          </h3>
        </div>
      </div>
    </section>
  );
}
