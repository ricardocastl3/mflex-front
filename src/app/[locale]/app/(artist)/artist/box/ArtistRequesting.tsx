import { useAppProvider } from "@/providers/app/AppProvider";

import ASoundPlayer from "@/@components/(system)/ASoundPlayer";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function ArtistRequesting() {
  const { openBanner } = useAppProvider();

  return (
    <div
      className={`${
        openBanner ? "md:pt-[7rem] pt-28" : "md:pt-[5.2rem] pt-20"
      } flex flex-col gap-4 w-full md:h-full h-screen animate-fade`}
    >
      <div
        style={{
          backgroundImage: `url(https://img.freepik.com/free-vector/musical-clef-notation-background-your-concert-vector_1017-47633.jpg?t=st=1749600952~exp=1749604552~hmac=dbacb9b41e594529e325d356caedf0d0e691ee312d1eac77209e4d86995d25c2&w=740)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        className="relative flex-1 h-full w-full flex md:px-0 px-4 justify-center items-center"
      >
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center">
          <div className="md:w-[50vw] w-[80vw] text-center flex items-center flex-col gap-4">
            <ASoundPlayer url="" style="animate-pulse" />
            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-xl text-yellow-500 font-bold">
                <CTranslateTo
                  eng="We are analyzing your profile"
                  pt="Estamos analisando o seu perfil"
                />
              </h1>
              <h1 className="md:text-lg text-base text-white">
                <CTranslateTo
                  eng="We will contact you very soon, the process can take up to 2 days for general approval."
                  pt="Entraremos em contacto muito embreve, o processo pode demorar até 2 dias, para a aprovação geral"
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
