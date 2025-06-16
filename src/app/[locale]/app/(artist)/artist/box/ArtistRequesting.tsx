import { useAppProvider } from "@/providers/app/AppProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";

import ASoundPlayer from "@/@components/(system)/ASoundPlayer";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function ArtistRequesting() {
  const { openBanner } = useAppProvider();
  const { handleOpenModal } = useModal();

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
            <ASoundPlayer url="/snds/artistas.mp3" style="animate-pulse" />
            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-xl text-yellow-500 font-bold">
                <CTranslateTo
                  eng="Please confirm your identification"
                  pt="Por favor, confirme sua identificação"
                />
              </h1>
              <h1 className="md:text-lg text-base text-white">
                <CTranslateTo
                  eng="Click the button below to verify your identity as an artist. This step is required for us to analyze your profile and ensure you are a real artist. The verification process may take up to 2 days."
                  pt="Clique no botão abaixo para verificar sua identidade como artista. Esta etapa é necessária para que possamos analisar seu perfil e garantir que você é um artista real. O processo de verificação pode levar até 2 dias."
                />
              </h1>
              <p className="text-sm text-gray-300 italic font-bold">
                <CTranslateTo
                  eng="Note: If you have already submitted your documents, please wait for our analysis."
                  pt="Obs: Se você já enviou seus documentos, aguarde nossa análise."
                />
              </p>
            </div>
          </div>
          <AuSoftUI.UI.Button
            onClick={() => handleOpenModal("art-send-identity")}
            variant={"primary"}
            size={"lg"}
            className="rounded-full mt-3"
          >
            <CTranslateTo
              eng="Send Identification"
              pt="Confirmar Identificação"
            />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </div>
  );
}
