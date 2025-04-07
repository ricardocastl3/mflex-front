"use client";

import { useState } from "react";
import { PrivacySections } from "./components/_index";
import PolicyContentItem from "../components/content/_index";
import PolicyMenuItem from "../components/items/_index";

export default function Privacy() {
  const [currectSection, setCurrentSection] = useState("1");

  return (
    <div className="flex flex-col w-full md:pb-16 pb-12">
      <PrivacySections.HeroSection />
      <div className="flex md:flex-row flex-col gap-8 items-start md:px-24 px-7 pt-8 md:divide-x-2 divide-x-0 md:divide-y-0 divide-y-2 divide-slate-300 dark:divide-slate-800">
        <div className="md:w-[18vw] flex md:flex-col flex-row gap-2 w-full overflow-x-auto">
          <PolicyMenuItem
            currentSection="1"
            isSelected={currectSection == "1" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="User Account Security"
            title_pt="Segurança da Conta do Usuário"
          />
          <PolicyMenuItem
            currentSection="2"
            isSelected={currectSection == "2" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Data Collection and Usage"
            title_pt="Coleta e Uso de Dados"
          />
          <PolicyMenuItem
            currentSection="3"
            isSelected={currectSection == "3" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Third-Party Services"
            title_pt="Serviços de Terceiros"
          />
          <PolicyMenuItem
            currentSection="4"
            isSelected={currectSection == "4" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Event and Ticket Sales Policy"
            title_pt="Eventos e Venda de Ingressos"
          />
        </div>
        <div className="md:w-[70vw] w-full flex flex-col gap-4 md:pl-8 pl-0 md:pt-0 pt-6">
          <PolicyContentItem
            description_en="To authenticate on our platform, you only need a valid phone number. We recommend using strong passwords to ensure the security of your account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Unauthorized use of the platform, including attempts to gain unauthorized access, distribute malware, or disrupt services, is strictly prohibited and may result in termination of your account."
            description_pt="Para se autenticar em nossa plataforma, você precisa apenas de um número de celular válido. Recomendamos o uso de senhas fortes para garantir a segurança da sua conta. Você é responsável por manter a confidencialidade das suas credenciais de login e por todas as atividades que ocorrem sob sua conta. O uso não autorizado da plataforma, incluindo tentativas de obter acesso não autorizado, distribuir malware ou interromper os serviços, é estritamente proibido e pode resultar na rescisão da sua conta."
            title_en="User Account Security"
            title_pt="Segurança da Conta do Usuário"
            section_id="1"
            position={1}
          />

          <PolicyContentItem
            description_en="We collect, store, and process personal data to improve and personalize your experience on our platform. This includes information provided directly by you during registration, as well as data obtained through your phone number. The data we collect may include your name, email address, profile picture, and other details depending on the permissions you grant. We also collect interaction data for features such as event creation, email marketing, and ticket sales. Your data is used to optimize your experience, ensure platform security, and personalize content."
            description_pt="Coletamos, armazenamos e processamos dados pessoais para melhorar e personalizar sua experiência em nossa plataforma. Isso inclui informações fornecidas diretamente por você durante o cadastro, bem como dados obtidos através do seu número de telefone. Os dados que coletamos podem incluir seu nome, endereço de e-mail, foto de perfil e outros detalhes, conforme as permissões concedidas. Também coletamos dados de interação com funcionalidades como criação de eventos, campanhas de e-mail marketing e venda de ingressos. Seus dados são usados para otimizar sua experiência, garantir a segurança da plataforma e personalizar o conteúdo."
            title_en="Data Collection and Usage"
            title_pt="Coleta e Uso de Dados"
            section_id="2"
            position={2}
          />

          <PolicyContentItem
            description_en="Our platform's main objective is to offer the best service to our users. We do not share your personal data with unauthorized third-party services. All services, such as ticket purchases, email campaigns, or event promotion, are handled internally or with authorized tools that follow our privacy standards."
            description_pt="Nossa plataforma tem como principal objetivo oferecer o melhor serviço aos nossos usuários. Não compartilhamos seus dados pessoais com serviços de terceiros não autorizados. Todos os serviços, como compra de ingressos, campanhas de e-mail ou divulgação de eventos, são realizados internamente ou com ferramentas autorizadas que seguem os nossos padrões de privacidade."
            title_en="Third-Party Services"
            title_pt="Serviços de Terceiros"
            section_id="3"
            position={3}
          />

          <PolicyContentItem
            description_en="When you create events and sell tickets through our platform, we collect information such as event details, ticket pricing, and banking data for transactions. Revenue from ticket sales is transferred directly to your bank account, minus a 5% service fee. We ensure that all financial data is encrypted and securely processed."
            description_pt="Ao criar eventos e vender ingressos através da nossa plataforma, coletamos informações como os detalhes do evento, preços dos ingressos e dados bancários para transações. A receita da venda de ingressos é transferida diretamente para sua conta bancária, descontando uma taxa de 5% pelo serviço. Garantimos que todos os dados financeiros sejam criptografados e processados com segurança."
            title_en="Event and Ticket Sales Policy"
            title_pt="Política de Eventos e Venda de Ingressos"
            section_id="4"
            position={4}
          />
        </div>
      </div>
    </div>
  );
}
