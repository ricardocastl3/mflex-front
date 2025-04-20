"use client";

import { ReactIcons } from "@/utils/icons";
import { Meteors } from "@/@components/(aceternity)/Meteors";
import { services } from "./components/services";

import CardItem from "./components/CardItem";
import HeroServices from "./components/Hero";

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4 md:mb-8 mb-8">
      <HeroServices />

      <div
        data-aos="fade-up"
        className="relative md:px-16 px-5 grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 my-8"
      >
        {/*  <CardItem
          action={`/${langByCookies}/app/events`}
          ActionIcon={ReactIcons.BiIcon.BiLinkExternal}
          action_en={"Sale Ticket"}
          action_pt={"Vender ingressos"}
          Icon={ReactIcons.HiIcon.HiTag}
          content_en="Sell ​​event tickets in a simple, straightforward way, receiving payments instantly"
          content_pt="Venda ingressos para o evento de forma simples, descomplicada, recebendo os pagamentos na hora"
          title_en="Ticket Sales"
          title_pt="Venda de Ingressos"
        />

        <CardItem
          action={`/${langByCookies}/events`}
          ActionIcon={ReactIcons.BiIcon.BiLogoWhatsapp}
          action_en={"Request Service"}
          action_pt={"Solicitar serviço"}
          Icon={ReactIcons.BiIcon.BiMoney}
          content_en="Buy event tickets quickly, easily and efficiently"
          content_pt="Compre ingressos de eventos de forma simples, eficiente e rápida"
          title_en="Ticket Purchases"
          title_pt="Compra de ingressos"
        />
 */}

        {services.map((service, i) => {
          return (
            <CardItem
              key={i}
              action={service.action}
              ActionIcon={ReactIcons.BiIcon.BiLogoWhatsapp}
              action_en={"Request Service"}
              action_pt={"Solicitar serviço"}
              Icon={service.icon}
              content_en={service.content_en}
              content_pt={service.content_pt}
              title_en={service.title_en}
              title_pt={service.title_pt}
            />
          );
        })}

        {window.innerWidth > 765 && <Meteors number={10} />}
      </div>
    </div>
  );
}
