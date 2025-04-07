"use client";

import { useState } from "react";
import HeroFaqs from "./components/Hero";
import CollapseItem from "./components/CollapseItem";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { AuSoftUI } from "@/@components/(ausoft)";

export default function Privacy() {
  const [currectSection, setCurrentSection] = useState("services");

  return (
    <div className="flex flex-col w-full md:pb-4 pb-4">
      <HeroFaqs />
      <div className="flex flex-col gap-5 md:px-[7rem] px-5 md:py-12 py-8">
        <div className="md:w-[20vw] w-full">
          <h1 className="text-base dark:text-white">
            <CTranslateTo eng="" pt="" />
          </h1>
          <AuSoftUI.UI.Select
            className="w-full"
            value={currectSection}
            onChange={(e) => setCurrentSection(e.target.value)}
          >
            <option
              value={"services"}
              className="dark:bg-ausoft-slate-950 dark:text-white"
            >
              <CTranslateTo eng="Our Services" pt="Nossos Serviços" />
            </option>
            <option
              value={"tickets"}
              className="dark:bg-ausoft-slate-950 dark:text-white"
            >
              <CTranslateTo eng="Eventos & Ingressos" pt="Events & Tickets" />
            </option>
          </AuSoftUI.UI.Select>
        </div>
        <div className="flex flex-col gap-4 ">
          {currectSection == "tickets" && (
            <>
              <CollapseItem
                title_en="Can I create and sell tickets for my own event?"
                title_pt="Posso criar e vender ingressos para o meu próprio evento?"
                content_en="Yes! Our platform allows you to create your event, set ticket prices, and start selling directly through our public events list. It’s fast, simple, and secure."
                content_pt="Sim! A nossa plataforma permite que você crie seu evento, defina os preços dos ingressos e comece a vender diretamente na lista pública de eventos. É rápido, simples e seguro."
              />

              <CollapseItem
                title_en="How do I receive the money from my ticket sales?"
                title_pt="Como recebo o dinheiro das vendas dos meus ingressos?"
                content_en="Each time someone buys a ticket to your event, the payment is automatically sent to your bank account, minus a 5% service fee. No delays, no complications."
                content_pt="Sempre que alguém compra um ingresso do seu evento, o valor é automaticamente transferido para sua conta bancária, com desconto de uma taxa de serviço de 5%. Sem atrasos, sem complicações."
              />

              <CollapseItem
                title_en="What is the service fee for selling tickets?"
                title_pt="Qual é a taxa cobrada pela venda de ingressos?"
                content_en="We charge a 5% service fee on each ticket sold. This helps us maintain the platform, ensure secure payments, and offer customer support."
                content_pt="Cobramos uma taxa de serviço de 5% por cada ingresso vendido. Isso nos permite manter a plataforma, garantir pagamentos seguros e oferecer suporte ao cliente."
              />

              <CollapseItem
                title_en="Where will my event be visible?"
                title_pt="Onde o meu evento ficará visível?"
                content_en="Your event will appear on our public events list, where all users can explore and purchase tickets. You can also share your unique event link to boost your sales."
                content_pt="Seu evento ficará visível na nossa lista pública de eventos, onde todos os usuários podem visualizar e comprar ingressos. Você também pode compartilhar seu link exclusivo para aumentar as vendas."
              />

              <CollapseItem
                title_en="Can I manage the number of tickets available?"
                title_pt="Posso controlar a quantidade de ingressos disponíveis?"
                content_en="Yes! When creating your event, you can set the total number of tickets available. The system will automatically stop sales when the limit is reached."
                content_pt="Sim! Ao criar seu evento, você pode definir a quantidade total de ingressos disponíveis. O sistema interromperá automaticamente as vendas quando o limite for atingido."
              />
            </>
          )}
          {currectSection == "services" && (
            <>
              <CollapseItem
                title_en="Is the Paid Traffic Management service suitable for small businesses?"
                title_pt="O serviço de Gestão de Tráfego Pago é indicado para pequenos negócios?"
                content_en="Absolutely! Our paid traffic strategies are tailored to fit businesses of all sizes, including small and local ones. We focus on cost-effective solutions that deliver real results."
                content_pt="Com certeza! As nossas estratégias de tráfego pago são adaptadas para negócios de todos os tamanhos, incluindo os pequenos e locais. Focamos em soluções econômicas que geram resultados reais."
              />

              <CollapseItem
                title_en="Can I get a professional email with my business domain?"
                title_pt="Posso ter um e-mail profissional com o domínio do meu negócio?"
                content_en="Yes! We create professional emails using your business domain (e.g., contact@yourcompany.com), helping to boost your brand's credibility and trust."
                content_pt="Sim! Criamos e-mails profissionais com o domínio do seu negócio (ex: contato@suaempresa.com), aumentando a credibilidade e a confiança da sua marca."
              />

              <CollapseItem
                title_en="What’s included in the Visual Identity service?"
                title_pt="O que está incluído no serviço de Identidade Visual?"
                content_en="Our Visual Identity service includes logo design, color palette, typography selection, brand guide, and everything your brand needs to stand out with consistency."
                content_pt="Nosso serviço de Identidade Visual inclui criação de logotipo, paleta de cores, tipografia, manual da marca e tudo o que sua marca precisa para se destacar com consistência."
              />

              <CollapseItem
                title_en="Do you also manage the content for social media?"
                title_pt="Vocês também gerenciam o conteúdo das redes sociais?"
                content_en="Yes, we handle everything—from content planning and creation to posting and performance monitoring. We keep your brand active and engaging across social platforms."
                content_pt="Sim, cuidamos de tudo—desde o planejamento e criação de conteúdo até a publicação e o monitoramento de desempenho. Mantemos sua marca ativa e envolvente nas redes sociais."
              />

              <CollapseItem
                title_en="What kind of designs are included in Custom Designs?"
                title_pt="Que tipo de materiais estão incluídos nos Designs Personalizados?"
                content_en="Our Custom Designs include social media posts, banners, flyers, presentations, and any visual material your brand may need to communicate with impact."
                content_pt="Nossos Designs Personalizados incluem postagens para redes sociais, banners, panfletos, apresentações e todo tipo de material visual que sua marca precisar para comunicar com impacto."
              />

              <CollapseItem
                title_en="Do you also automate email marketing campaigns?"
                title_pt="Vocês também automatizam as campanhas de email marketing?"
                content_en="Yes! We not only create the content and design, but also automate the delivery using platforms like Mailchimp, Brevo, and others—making sure your message reaches the right audience at the right time."
                content_pt="Sim! Nós não apenas criamos o conteúdo e o design, como também automatizamos o envio usando plataformas como Mailchimp, Brevo e outras—garantindo que sua mensagem chegue ao público certo no momento ideal."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
