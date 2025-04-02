import { useAuth } from "@/providers/auth/AuthProvider";
import { langByCookies } from "@/http/axios/api";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { AuSoftUI } from "@/@components/(ausoft)";
import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";

export default function Hero() {
  const { userLogged } = useAuth();
  function handleStarted() {
    if (!userLogged) {
      window.location.href = `/${langByCookies}/sign-in`;
    } else {
      window.location.href = `/${langByCookies}/app`;
    }
  }

  return (
    <div className="md:py-[20rem] py-[27rem] md:flex-row flex-col h-screen flex w-full justify-center">
      <div className="relative w-full h-full">
        <video
          loop
          muted
          autoPlay
          className="fixed inset-0 min-h-full min-w-full object-fill"
        >
          <source src="/assets/party.mp4" type="video/mp4" />
        </video>
        <div className="z-10 fixed inset-0 bg-black/50 flex justify-center h-full items-center">
          <div className="flex flex-col items-center">
            <AAuSoftLogo size={100} />
            <h4 className="md:text-[2rem] text-xl font-bold text-yellow-500 md:mt-2 mt-2">
              <CTranslateTo
                eng="The best event at moment"
                pt="Os melhores eventos da atualidade"
              />
            </h4>
            <h4 className="md:text-[1.2rem] text-lg font-bold text-white md:mt-2 mt-2">
              <CTranslateTo
                eng="Here you have, the good and the best 🔥"
                pt="Aqui você tem, do bom e do melhor 🔥"
              />
            </h4>
            <AuSoftUI.UI.Button
              size={"lg"}
              className="rounded-full md:mt-4 mt-2.5 animate-pulse"
              variant={"primary"}
            >
              <CTranslateTo eng="Access our page" pt="Acessar a nossa página" />
            </AuSoftUI.UI.Button>
          </div>
        </div>
      </div>
    </div>
  );
}
