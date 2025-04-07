"use client";

import { useState } from "react";
import { PrivacySections } from "./components";
import PolicyContentItem from "../components/content";
import PolicyMenuItem from "../components/items";

export default function Terms() {
  const [currentSection, setCurrentSection] = useState("1");

  return (
    <div className="flex flex-col w-full md:pb-16 pb-12">
      <PrivacySections.HeroSection />
      <div className="flex md:flex-row flex-col gap-8 items-start md:px-24 px-7 pt-8 md:divide-x-2 divide-x-0 md:divide-y-0 divide-y-2 divide-slate-300 dark:divide-slate-800">
        <div className="md:w-[18vw] flex md:flex-col flex-row gap-2 w-full overflow-x-auto">
          <PolicyMenuItem
            currentSection="1"
            isSelected={currentSection == "1" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="User Responsibilities"
            title_pt="Responsabilidades do Usuário"
          />
          <PolicyMenuItem
            currentSection="2"
            isSelected={currentSection == "2" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Phone Number Requirement"
            title_pt="Requisito de Número de Telefone"
          />

          <PolicyMenuItem
            currentSection="3"
            isSelected={currentSection == "3" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Ticket Purchase Refunds"
            title_pt="Reembolsos de Compra de Ingressos"
          />

          <PolicyMenuItem
            currentSection="4"
            isSelected={currentSection == "4" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Service Modifications"
            title_pt="Modificações nos Serviços"
          />
        </div>
        <div className="md:w-[70vw] w-full flex flex-col gap-4 md:pl-8 pl-0 md:pt-0 pt-6">
          <PolicyContentItem
            description_en="To authenticate on our platform, you only need a valid phone number. We recommend using strong passwords to ensure the security of your account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Unauthorized use of the platform, including attempts to gain unauthorized access, distribute malware, or disrupt services, is strictly prohibited and may result in termination of your account."
            description_pt="Para se autenticar em nossa plataforma, você precisa apenas de um número de celular válido. Recomendamos o uso de senhas fortes para garantir a segurança da sua conta. Você é responsável por manter a confidencialidade das suas credenciais de login e por todas as atividades que ocorrem sob sua conta. O uso não autorizado da plataforma, incluindo tentativas de obter acesso não autorizado, distribuir malware ou interromper os serviços, é estritamente proibido e pode resultar na rescisão da sua conta."
            title_en="User Responsibilities"
            title_pt="Responsabilidades do Usuário"
            section_id="1"
            position={1}
          />

          <PolicyContentItem
            description_en="To access our platform, you are required to provide a valid phone number. This number is used solely for authentication and communication purposes related to your account activity. You are responsible for ensuring the accuracy of your contact information."
            description_pt="Para acessar nossa plataforma, é necessário fornecer um número de telefone válido. Esse número é utilizado exclusivamente para fins de autenticação e comunicação relacionada às atividades da sua conta. Você é responsável por garantir a precisão das suas informações de contato."
            title_en="Phone Number Requirement"
            title_pt="Requisito de Número de Telefone"
            section_id="2"
            position={2}
          />

          <PolicyContentItem
            description_en="Refunds apply only to ticket purchases. If you wish to request a refund for a purchased ticket, it is the responsibility of the event organizer (event owner) to process the refund. The event organizer will decide whether or not to offer a refund, in accordance with their event's policies."
            description_pt="Os reembolsos se aplicam apenas à compra de ingressos. Se você desejar solicitar um reembolso por um ingresso adquirido, é responsabilidade do organizador do evento (dono do evento) processar o reembolso. O organizador do evento decidirá se oferecerá ou não o reembolso, de acordo com as políticas do evento."
            title_en="Ticket Purchase Refunds"
            title_pt="Reembolsos de Compra de Ingressos"
            section_id="3"
            position={3}
          />

          <PolicyContentItem
            description_en="We reserve the right to modify or discontinue our services at any time, with or without notice. We may also update these terms of use from time to time. Your continued use of the platform after any changes to the terms will constitute your acceptance of the revised terms. It is your responsibility to review the terms of use regularly to ensure you are aware of any changes."
            description_pt="Reservamo-nos o direito de modificar ou descontinuar nossos serviços a qualquer momento, com ou sem aviso prévio. Também podemos atualizar estes termos de uso periodicamente. Seu uso continuado da plataforma após qualquer alteração nos termos constituirá sua aceitação dos termos revisados. É sua responsabilidade revisar os termos de uso regularmente para garantir que esteja ciente de quaisquer alterações."
            title_en="Service Modifications"
            title_pt="Modificações nos Serviços"
            section_id="4"
            position={4}
          />
        </div>
      </div>
    </div>
  );
}
