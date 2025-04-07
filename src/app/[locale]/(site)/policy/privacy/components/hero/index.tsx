import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function HeroSection() {
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
          "url(https://img.freepik.com/free-photo/full-length-portrait-cherry-young-african-american-man-listening-music-with-headphones-d_1258-116404.jpg?t=st=1744019235~exp=1744022835~hmac=fd86e0a4a64a4ab34705c0d5b60fac6fb4579e7b7b126bcee1447c4362a112f6&w=1380)",
      }}
      className="flex  md:h-[60vh] h-[50vh] md:pt-36 pt-8 md:pb-28 pb-0 relative justify-center items-center"
    >
      <div className="absolute inset-0 z-0 bg-black/50"></div>
      <div className="z-10 flex absolute flex-col gap-4 md:w-[60vw] w-[90vw] items-center text-center">
        <h4 className="md:text-[2.5rem] md:leading-[2.7rem] leading-8 text-3xl text-white">
          <CTranslateTo eng="Privacy Policies" pt="Políticas de Privacidade" />
        </h4>
        <h4 className="text-md text-slate-200">
          <CTranslateTo
            eng="Last update: 07/04/2025"
            pt="Última atualização: 07/04/2025"
          />
        </h4>
      </div>
    </div>
  );
}
