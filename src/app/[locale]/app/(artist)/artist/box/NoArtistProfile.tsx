import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";
import { useState } from "react";
import { useAppProvider } from "@/providers/app/AppProvider";
import { internalApi } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import ASoundPlayer from "@/@components/(system)/ASoundPlayer";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function NoArtistProfile() {
  const { handleOpenModal } = useModal();
  const [readTerms, setReadTerms] = useState(false);

  // Contexts
  const { handleAddToastOnArray, openBanner } = useAppProvider();
  const { fetchUserInformations } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRequestProfile() {
    try {
      setIsSubmitting(true);
      await internalApi.post("/artists/reqs", {});
      await fetchUserInformations();
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);

      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <div
      className={`${
        openBanner ? "md:pt-[7rem] pt-28" : "md:pt-[5.2rem] pt-20"
      } flex flex-col gap-4 w-full md:h-full h-screen`}
    >
      <div
        style={{
          backgroundImage: `url(https://img.freepik.com/free-photo/3d-music-related-scene_23-2151124956.jpg?t=st=1749596614~exp=1749600214~hmac=a4db7654836d6b398fe9530fc44ee338bed661e57343e51c159b9a2a4b9c116d&w=1380)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        className="relative flex-1 h-full w-full flex md:px-0 px-4 justify-center items-center rounded-xl"
      >
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center">
          <div className="md:w-[50vw] w-[80vw] text-center flex items-center flex-col gap-4">
            <ASoundPlayer url="" style="animate-pulse" />
            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-xl text-yellow-500 font-bold">
                <CTranslateTo
                  eng="Welcome to the Flex Artist Dashboard"
                  pt="Bem-vindo ao Painel do Artista Flex"
                />
              </h1>
              <h1 className="md:text-lg text-base text-white">
                <CTranslateTo
                  eng="As a Flex artist, you can receive donations from your fans on your songs, to proceed read the terms and conditions and then request the service"
                  pt="Sendo um artista Flex, você pode receber doações dos seus fãs em suas músicas, para prosseguir leia os termos e condições e depois solicite o serviço"
                />
              </h1>
              <div className="flex items-center gap-2 md:flex-row flex-col">
                {!isSubmitting && (
                  <AuSoftUI.UI.Button
                    onClick={() => {
                      setReadTerms(true);
                      handleOpenModal("art-view-policy");
                    }}
                    variant={readTerms ? "outline" : "primary"}
                    size={"lg"}
                    className="rounded-full"
                  >
                    <CTranslateTo
                      eng="Read terms and continue 🚀"
                      pt="Ler termos e avançar 🚀"
                    />
                  </AuSoftUI.UI.Button>
                )}
                {readTerms && (
                  <AuSoftUI.UI.Button
                    disabled={isSubmitting}
                    onClick={handleRequestProfile}
                    variant={"primary"}
                    size={"lg"}
                    className="rounded-full animate-pulse"
                  >
                    {!isSubmitting && (
                      <>
                        {" "}
                        <CTranslateTo
                          eng="Request Service"
                          pt="Solicitar Serviço"
                        />
                      </>
                    )}

                    <AuSoftUI.Component.isFormSubmitting
                      isSubmitting={isSubmitting}
                    />
                  </AuSoftUI.UI.Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
