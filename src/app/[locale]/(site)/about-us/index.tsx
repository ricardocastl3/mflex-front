"use client";

import { ReactIcons } from "@/utils/icons";
import { Meteors } from "@/@components/(aceternity)/Meteors";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import HeroAbout from "./components/Hero";
import SocialItem from "./components/SocialItem";
import AAnimated from "@/@components/(ausoft)/AAnimated";
import AboutItem from "./components/AboutItem";

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4 md:mb-8 mb-8">
      <HeroAbout />

      <div
        data-aos="fade-up"
        className="flex flex-col gap-6 md:px-16 px-5 md:pt-8 pt-4 md:w-[70vw] w-[90vw] md:pb-8 pb-4 relative"
      >
        <div className="flex flex-col gap-1">
          <h4 className="md:text-2xl text-xl font-extrabold dark:text-white">
            Marca Flex
          </h4>
          <h2 className="text-lg dark:text-slate-400 text-slate-600">
            <CTranslateTo
              eng="Marketing & Advertising Agency"
              pt="Agência de Marketing & Publicidade"
            />
          </h2>
        </div>

        <AboutItem
          Icon={ReactIcons.PiIcon.PiMapPin}
          des_en="Our mission is to empower our clients to achieve their goals through creative and innovative solutions, turning ideas into tangible results."
          des_pt="Nossa missão é capacitar nossos clientes a alcançarem seus objetivos por meio de soluções criativas e inovadoras, transformando ideias em resultados tangíveis."
          title_en="Mission"
          title_pt="Missão"
        />
        <AboutItem
          Icon={ReactIcons.AiICon.AiFillEye}
          des_en="To be recognized as the leading marketing and communication platform, where creativity and strategy meet to create a positive impact."
          des_pt="Ser reconhecida como a principal plataforma de marketing e comunicação, onde a criatividade e a estratégia se encontram para gerar impacto positivo."
          title_en="Vision"
          title_pt="Visão"
        />
        <AboutItem
          Icon={ReactIcons.PiIcon.PiBird}
          des_en="Innovation, Transparency, Collaboration, and Commitment are the core values that guide our actions and decisions."
          des_pt="Inovação, Transparência, Colaboração e Compromisso são os valores fundamentais que orientam nossas ações e decisões."
          title_en="Values"
          title_pt="Valores"
        />
        <AboutItem
          Icon={ReactIcons.PiIcon.PiAngle}
          des_en="On our platform, you can buy and sell tickets, explore must-see events, follow inspiring podcasts, and stay updated with the latest trends. We are here to connect you to the best in the market, making access to unique experiences easier."
          des_pt="Na nossa plataforma, você pode comprar e vender ingressos, explorar eventos imperdíveis, acompanhar podcasts inspiradores e ficar por dentro das novidades do momento. Estamos aqui para conectar você ao que há de melhor no mercado, facilitando o acesso a experiências únicas e enriquecedoras."
          title_en="What We Do"
          title_pt="O que Fazemos"
        />

        {window.innerWidth > 765 && <Meteors number={10} />}
      </div>
      <AAnimated animate="animate-fade">
        <div className="md:px-16 px-5 grid md:grid-cols-3 grid-cols-1 gap-6">
          <SocialItem
            des_en="Follow us on TikTok and stay updated with amazing news! 🚀"
            des_pt="Siga-nos no TikTok e fique por dentro das novidades incríveis! 🚀"
            social="tiktok"
            action="https://www.tiktok.com/@marcafl3x"
          />
          <SocialItem
            des_en="Follow us on Instagram for the latest news and inspiration! 🚀"
            des_pt="Siga-nos no Instagram para não perder as últimas novidades e inspirações! 🚀"
            social="instagram"
            action="https://www.instagram.com/marcafl3x"
            brand_color="text-violet-500 dark:text-violet-400"
          />
          <SocialItem
            des_en="Like our Facebook page and stay updated with the best news! 🚀"
            des_pt="Curta nossa página no Facebook e fique atualizado com as melhores novidades! 🚀"
            social="facebook"
            action="https://www.facebook.com/marcafl3x"
            brand_color="text-blue-500 dark:text-blue-400"
          />
        </div>
      </AAnimated>
    </div>
  );
}
