"use client";

import { useState } from "react";
import { PrivacySections } from "./components";
import PolicyContentItem from "../components/content";
import PolicyMenuItem from "../components/items";

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
        </div>
        <div className="md:w-[70vw] w-full flex flex-col gap-4 md:pl-8 pl-0 md:pt-0 pt-6">
          <PolicyContentItem
            description_en="We prioritize the security of your account and implement various safeguards to protect your information. Whether you log in using Google, Facebook, or traditional methods, it is essential that you keep your login credentials confidential. You are responsible for maintaining the confidentiality of your password and account information. We recommend using strong passwords and regularly updating them to ensure continued security. In the event of unauthorized access to your account, please notify us immediately so we can take appropriate actions."
            description_pt="Priorizamos a segurança da sua conta e implementamos diversas medidas para proteger suas informações. Seja fazendo login pelo Google, Facebook ou métodos tradicionais, é essencial que você mantenha suas credenciais de login confidenciais. Você é responsável por manter a confidencialidade da sua senha e das informações da conta. Recomendamos o uso de senhas fortes e a atualização regular delas para garantir segurança contínua. Em caso de acesso não autorizado à sua conta, notifique-nos imediatamente para que possamos tomar as medidas apropriadas."
            title_en="User Account Security"
            title_pt="Segurança da Conta do Usuário"
            section_id="1"
            position={1}
          />

          <PolicyContentItem
            description_en="We collect, store, and process personal data to improve and personalize your experience on our platform. This includes information provided directly by you during registration, as well as data obtained through third-party login services like Google and Facebook. The data we collect may include your name, email address, profile picture, and other details depending on the permissions you grant. We use this information to enhance platform functionality, deliver personalized content, and ensure a secure user environment. Your data will not be shared with unauthorized third parties and will be used solely in accordance with our privacy policy."
            description_pt="Coletamos, armazenamos e processamos dados pessoais para melhorar e personalizar sua experiência em nossa plataforma. Isso inclui informações fornecidas diretamente por você durante o cadastro, bem como dados obtidos através de serviços de login de terceiros, como Google e Facebook. Os dados que coletamos podem incluir seu nome, endereço de e-mail, foto de perfil e outros detalhes, dependendo das permissões concedidas. Usamos essas informações para melhorar a funcionalidade da plataforma, entregar conteúdo personalizado e garantir um ambiente seguro para o usuário. Seus dados não serão compartilhados com terceiros não autorizados e serão utilizados exclusivamente de acordo com nossa política de privacidade."
            title_en="Data Collection and Usage"
            title_pt="Coleta e Uso de Dados"
            section_id="2"
            position={2}
          />

          <PolicyContentItem
            description_en="Our platform integrates with third-party services like Google and Facebook to provide you with seamless login options. When you use these services to log in, we may receive certain data from these providers, such as your name, email address, and profile picture. This data is used to create and manage your account on our platform. We do not share your personal information with these third parties beyond what is necessary for account creation and login purposes. However, by using third-party login services, you agree to the privacy policies and terms of use of those providers."
            description_pt="Nossa plataforma se integra a serviços de terceiros, como Google e Facebook, para fornecer opções de login mais convenientes. Quando você usa esses serviços para fazer login, podemos receber determinados dados desses provedores, como seu nome, endereço de e-mail e foto de perfil. Esses dados são usados para criar e gerenciar sua conta em nossa plataforma. Não compartilhamos suas informações pessoais com esses terceiros além do necessário para fins de criação de conta e login. No entanto, ao usar serviços de login de terceiros, você concorda com as políticas de privacidade e os termos de uso desses provedores."
            title_en="Third-Party Services"
            title_pt="Serviços de Terceiros"
            section_id="3"
            position={3}
          />
        </div>
      </div>
    </div>
  );
}
