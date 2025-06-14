import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function HeroPlans() {
  return (
    <div
      id="start"
      style={{
        objectFit: "fill",
        backgroundRepeat: "no-repeat",
        backgroundPosition: window.innerWidth <= 765 ? "center" : "",
        backgroundImage: `url(${"https://img.freepik.com/free-vector/musical-clef-notation-background-your-concert-vector_1017-47633.jpg?t=st=1749675612~exp=1749679212~hmac=a778b40ffe4acc3b09b34c13402fb9bf645e288b688b8cfe23562db0ac9598c9&w=1380"})`,
        backgroundSize: "cover",
      }}
      className="md:h-[60vh] h-[45vh] flex-col relative flex  items-center text-center justify-center md:px-14 px-4"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex flex-col gap-2 z-20 md:px-0 px-8 md:w-[50vw] w-full">
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
