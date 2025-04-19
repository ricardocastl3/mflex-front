"use client";

import { ReactIcons } from "@/utils/icons";
import { Meteors } from "@/@components/(aceternity)/Meteors";
import { langByCookies } from "@/http/axios/api";

import CardItem from "./components/CardItem";
import HeroServices from "./components/Hero";

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4 md:mb-8 mb-8">
      <HeroServices />

      <div className="relative md:px-16 px-5 grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 my-8">
        <CardItem
          action={`/${langByCookies}/app/events`}
          ActionIcon={ReactIcons.BiIcon.BiLinkExternal}
          action_en={"Sale Ticket"}
          action_pt={"Vender ingressos"}
          Icon={ReactIcons.HiIcon.HiTicket}
          content_en="Sell ​​event tickets in a simple, straightforward way, receiving payments instantly"
          content_pt="Venda ingressos para o evento de forma simples, descomplicada, recebendo os pagamentos na hora"
          title_en="Ticket Sales"
          title_pt="Venda de Igressos"
        />
        <CardItem
          action={`/${langByCookies}/events`}
          ActionIcon={ReactIcons.BiIcon.BiLinkAlt}
          action_en={"View events"}
          action_pt={"Ver eventos"}
          Icon={ReactIcons.BiIcon.BiMoney}
          content_en="Buy event tickets quickly, easily and efficiently"
          content_pt="Compre ingressos de eventos de forma simples, eficiente e rápida"
          title_en="Ticket Purchases"
          title_pt="Compra de ingressos"
        />
        {/*
        <CardItem
          action="#"
          ActionIcon={ReactIcons.BiIcon.BiLinkAlt}
          action_en={"View events"}
          action_pt={"Ver eventos"}
          Icon={ReactIcons.HiIcon.HiMail}
          content_en="We create and configure professional email addresses for your business, helping you strengthen your brand's credibility, improve client communication, and stand out in every interaction."
          content_pt="Criamos e configuramos e-mails profissionais para o seu negócio, fortalecendo a credibilidade da sua marca, melhorando a comunicação com seus clientes e destacando sua presença em cada interação."
          title_en="Professional Email Creation"
          title_pt="Criação de E-mails Profissionais"
        />
        <CardItem
          action="#"
          ActionIcon={ReactIcons.BiIcon.BiLinkAlt}
          action_en={"View events"}
          action_pt={"Ver eventos"}
          Icon={ReactIcons.HiIcon.HiLightBulb}
          content_en="We design a complete visual identity that expresses the essence of your brand. From logo and colors to typography and brand manual, we make sure your business communicates with personality and consistency."
          content_pt="Desenhamos uma identidade visual completa que transmite a essência da sua marca. Do logotipo às cores, tipografia e manual da marca, garantimos que o seu negócio comunique com personalidade e consistência."
          title_en="Visual Identity"
          title_pt="Identidade Visual"
        />
        <CardItem
          action="#"
          ActionIcon={ReactIcons.BiIcon.BiLinkAlt}
          action_en={"View events"}
          action_pt={"Ver eventos"}
          Icon={ReactIcons.Io5Icon.IoShareSocialSharp}
          content_en="We take care of your social media with strategic planning, engaging content, and a professional touch that boosts your brand, connects with your audience, and increases your online influence."
          content_pt="Cuidamos das suas redes sociais com planejamento estratégico, conteúdos envolventes e um toque profissional que fortalece sua marca, conecta com seu público e amplia sua influência online."
          title_en="Social Media Management"
          title_pt="Gestão de Mídias Sociais"
        />
        <CardItem
          action="#"
          ActionIcon={ReactIcons.BiIcon.BiLinkAlt}
          action_en={"View events"}
          action_pt={"Ver eventos"}
          Icon={ReactIcons.HiIcon.HiLightningBolt}
          content_en="We develop custom designs that elevate your brand’s visual impact. Whether for social media, banners, or marketing materials, our creations reflect your identity and capture attention."
          content_pt="Desenvolvemos designs personalizados que elevam o impacto visual da sua marca. Seja para redes sociais, banners ou materiais de marketing, nossas criações refletem sua identidade e captam a atenção do público."
          title_en="Custom Designs"
          title_pt="Designs Personalizados"
        />
        <CardItem
          action="#"
          ActionIcon={ReactIcons.BiIcon.BiLinkAlt}
          action_en={"View events"}
          action_pt={"Ver eventos"}
          Icon={ReactIcons.HiIcon.HiMailOpen}
          content_en="We create strategic and visually appealing email marketing campaigns that nurture your audience, promote your services, and generate real results. From planning to automation, we handle it all."
          content_pt="Criamos campanhas de email marketing estratégicas e visualmente atrativas, que nutrem seu público, promovem seus serviços e geram resultados reais. Do planejamento à automação, cuidamos de tudo para você."
          title_en="Email Marketing"
          title_pt="Email Marketing"
        /> */}

        {window.innerWidth > 765 && <Meteors number={10} />}
      </div>
    </div>
  );
}
