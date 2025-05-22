import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { langByCookies } from "@/http/axios/api";

import AAnimated from "@/@components/(ausoft)/AAnimated";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function FlexSection() {
  return (
    <AAnimated animate="animate-fade-up mb-12">
      <section className="md:h-[70vh] h-[60vh] flex items-center justify-center bg-yellow-500  md:my-8 my-6">
        <div className="md:w-[60vw] w-[90vw] text-center flex-col gap-6 items-center flex justify-center">
          <div className="p-2 rounded-full dark:bg-yellow-600 bg-yellow-800 text-white">
            <ReactIcons.AiICon.AiFillStar size={14} />
          </div>
          <h1 className="text-[2rem] text-white font-extrabold border-b-4 border-white">
            <CTranslateTo eng="Who We Are" pt="Quem Somos" />
          </h1>
          <h3 className="md:text-xl text-lg text-yellow-900 font-medium">
            <CTranslateTo
              eng="Welcome to MFLEX, your all-in-one entertainment platform! We bring you the best podcasts, latest news, and a unique space to sell your event tickets. Whether you're looking to discover amazing content or create and monetize your own events, we're here to make your entertainment journey extraordinary."
              pt="Bem-vindo à MFLEX, sua plataforma completa de entretenimento! Oferecemos os melhores podcasts, as últimas novidades e um espaço exclusivo para vender seus ingressos de eventos. Seja para descobrir conteúdo incrível ou criar e monetizar seus próprios eventos, estamos aqui para tornar sua jornada de entretenimento extraordinária."
            />
          </h3>
          <div className="flex justify-center items-center text-center mt-3">
            <Link
              href={`/${langByCookies}/about-us`}
              className="animate-bounce"
            >
              <AuSoftUI.UI.Button
                size={"md"}
                className="rounded-full font-bold items-center"
                variant={"primary"}
              >
                <CTranslateTo
                  eng="Know more about us"
                  pt="Saiba mais sobre nós"
                />
                <ReactIcons.AiICon.AiOutlineLink size={12} />
              </AuSoftUI.UI.Button>
            </Link>
          </div>
        </div>
      </section>
    </AAnimated>
  );
}
