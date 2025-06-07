"use client";

import { ReactIcons } from "@/utils/icons";
import { Meteors } from "@/@components/(aceternity)/Meteors";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import HeroAbout from "./components/Hero";
import SocialItem from "./components/SocialItem";
import AboutItem from "./components/AboutItem";

export default function AboutUsPage() {
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
              eng="Entertainment Digital Platform"
              pt="Plataforma de Entretenimento Digital"
            />
          </h2>
        </div>

        <AboutItem
          Icon={ReactIcons.PiIcon.PiStar}
          title_en="Our Essence"
          title_pt="Nossa Essência"
          des_en="We are your ultimate entertainment destination, bringing together TV content, engaging podcasts, and a seamless ticket marketplace. We create immersive experiences that connect you with the best in entertainment, sports, and cultural events."
          des_pt="Somos seu destino definitivo de entretenimento, unindo conteúdo de TV, podcasts envolventes e uma plataforma integrada de ingressos. Criamos experiências imersivas que conectam você ao melhor do entretenimento, esportes e eventos culturais."
        />

        <AboutItem
          Icon={ReactIcons.PiIcon.PiMapPin}
          des_en="To revolutionize entertainment access by providing a comprehensive platform where fans can enjoy premium content, secure event tickets, and engage with their favorite shows and games through expert analysis."
          des_pt="Revolucionar o acesso ao entretenimento oferecendo uma plataforma completa onde os fãs podem desfrutar de conteúdo premium, garantir ingressos para eventos e se envolver com seus programas e jogos favoritos através de análises especializadas."
          title_en="Mission"
          title_pt="Missão"
        />
        <AboutItem
          Icon={ReactIcons.AiICon.AiFillEye}
          des_en="To become the leading entertainment hub in Angola, where fans can discover, engage, and experience the best in TV, podcasts, sports analysis, and live events all in one place."
          des_pt="Tornar-se o principal hub de entretenimento em Angola, onde os fãs podem descobrir, se envolver e vivenciar o melhor da TV, podcasts, análises esportivas e eventos ao vivo, tudo em um só lugar."
          title_en="Vision"
          title_pt="Visão"
        />
        <AboutItem
          Icon={ReactIcons.PiIcon.PiBird}
          des_en="Entertainment Excellence, Innovation, Community Engagement, and Authentic Content Creation drive everything we do, ensuring we deliver the best experience to our audience."
          des_pt="Excelência no Entretenimento, Inovação, Engajamento Comunitário e Criação de Conteúdo Autêntico impulsionam tudo o que fazemos, garantindo a melhor experiência para nosso público."
          title_en="Values"
          title_pt="Valores"
        />
        <AboutItem
          Icon={ReactIcons.PiIcon.PiAngle}
          des_en="We offer a complete entertainment ecosystem: stream exclusive TV content, listen to engaging podcasts, buy and sell event tickets, and get expert analysis of games and sports events. Our platform brings together the best of entertainment, making it easy for you to stay connected with what matters most."
          des_pt="Oferecemos um ecossistema completo de entretenimento: assista conteúdo exclusivo de TV, ouça podcasts envolventes, compre e venda ingressos para eventos, e obtenha análises especializadas de jogos e eventos esportivos. Nossa plataforma reúne o melhor do entretenimento, facilitando sua conexão com o que mais importa."
          title_en="What We Do"
          title_pt="O que Fazemos"
        />

        {window.innerWidth > 765 && <Meteors number={10} />}
      </div>

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
    </div>
  );
}
