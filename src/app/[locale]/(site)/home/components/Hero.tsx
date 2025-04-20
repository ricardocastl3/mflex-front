import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import VideoBackground from "../../components/video/VideoBackground";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="h-screen md:flex-row flex-col flex w-full relative md:mb-12 mb-4">
      <VideoBackground
        fallback_url="https://images.pexels.com/photos/3122799/pexels-photo-3122799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        video_url="/assets/party.mp4"
      />

      <div className="z-20 absolute inset-0 bg-black/50 flex justify-center h-full items-center">
        <div className="flex flex-col items-center">
          <AAuSoftLogo size={90} />
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
          <Link data-aos="fade-up" href={`/${langByCookies}/events`}>
            <AuSoftUI.UI.Button
              size={"lg"}
              className="rounded-full md:mt-4 mt-2.5 animate-pulse items-center"
              variant={"primary"}
            >
              <ReactIcons.AiICon.AiFillEnvironment size={19} />
              <CTranslateTo eng="View Events" pt="Acessar eventos" />
            </AuSoftUI.UI.Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
