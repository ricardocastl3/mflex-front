import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { langByCookies } from "@/http/axios/api";

import AAnimated from "@/@components/(ausoft)/AAnimated";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function FlexSection() {
  return (
    <AAnimated animate="animate-fade-up mb-12">
      <section className="md:h-[70vh] h-[60vh] flex items-center justify-center bg-yellow-500 dark:bg-yellow-700/30 md:my-8 my-6">
        <div className="md:w-[60vw] w-[90vw] text-center flex-col gap-6 items-center flex justify-center">
          <div className="p-2 rounded-full bg-yellow-600 text-white">
            <ReactIcons.AiICon.AiFillStar size={14} />
          </div>
          <h1 className="text-[2rem] text-white font-extrabold border-b-4 border-white">
            <CTranslateTo eng="Who We Are" pt="Quem Somos" />
          </h1>
          <h3 className="text-lg text-yellow-900">
            <CTranslateTo
              eng="At Marca Flex, we don't just build brands; we create a vibrant platform where you can explore events, discover the latest news, and dive into engaging podcasts. Our passion for creativity drives us to blend strategy and innovation, turning visions into impactful realities."
              pt="Na Marca Flex, não apenas construímos marcas; criamos uma plataforma vibrante onde você pode explorar eventos, descobrir as últimas novidades e mergulhar em podcasts envolventes. Nossa paixão pela criatividade nos impulsiona a unir estratégia e inovação, transformando visões em realidades impactantes."
            />
          </h3>
          <div className="flex justify-center items-center text-center">
            <Link href={`/${langByCookies}/news`} className="animate-bounce">
              <AuSoftUI.UI.Button
                size={"md"}
                className="rounded-full font-bold items-center"
                variant={"primary"}
              >
                <CTranslateTo eng="View all news" pt="Ver todas novidades" />
                <ReactIcons.AiICon.AiOutlineLink size={12} />
              </AuSoftUI.UI.Button>
            </Link>
          </div>
        </div>
      </section>
    </AAnimated>
  );
}
