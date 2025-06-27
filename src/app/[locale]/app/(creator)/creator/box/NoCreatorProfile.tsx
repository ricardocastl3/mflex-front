import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";
import { useState } from "react";
import { useAppProvider } from "@/providers/app/AppProvider";
import { internalApi } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import ASoundPlayer from "@/@components/(system)/ASoundPlayer";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function NoCreatorProfile() {
  const { handleOpenModal } = useModal();
  const [readTerms, setReadTerms] = useState(false);

  // Contexts
  const { handleAddToastOnArray, openBanner } = useAppProvider();
  const { fetchUserInformations } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRequestProfile() {
    try {
      setIsSubmitting(true);
      await internalApi.post("/creators/reqs", {});
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
          backgroundImage: `url(https://img.freepik.com/free-photo/digital-art-light-lamp-design_23-2151124110.jpg?t=st=1750880281~exp=1750883881~hmac=63e6e0b2daf5883e93c11eed391e4d919619fe006bcba7faac952af920bf5da0&w=1380)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        className="relative flex-1 h-full w-full flex md:px-0 px-4 justify-center items-center rounded-xl"
      >
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center">
          <div className="md:w-[50vw] w-[80vw] text-center flex items-center flex-col gap-4">
            <ASoundPlayer url="/snds/artistas.mp3" style="animate-pulse" />
            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-xl text-yellow-500 font-bold">
                <CTranslateTo
                  eng="Welcome to the Flex Creator Dashboard"
                  pt="Bem-vindo ao Painel do Criador Flex"
                />
              </h1>
              <h1 className="md:text-lg text-base text-white">
                <CTranslateTo
                  eng="Here you can track your performance statistics, manage your posts and short videos, and access or update your creator information. To get started, read the terms and create your creator profile."
                  pt="Aqui você pode acompanhar suas estatísticas de desempenho, gerenciar suas publicações e vídeos curtos, além de acessar e atualizar suas informações de criador. Para começar, leia os termos e crie seu perfil de criador."
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
                        <CTranslateTo
                          eng="Create my creator profile"
                          pt="Criar meu perfil de criador"
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
