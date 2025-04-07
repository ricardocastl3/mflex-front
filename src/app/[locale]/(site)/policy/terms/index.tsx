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
            title_en="Third-Party Integrations"
            title_pt="Integrações com Terceiros"
          />
          <PolicyMenuItem
            currentSection="3"
            isSelected={currentSection == "3" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Service Modifications"
            title_pt="Modificações nos Serviços"
          />
          <PolicyMenuItem
            currentSection="4"
            isSelected={currentSection == "4" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Free Trial and Subscription Charges"
            title_pt="Período de Teste e Cobranças de Assinatura"
          />

          <PolicyMenuItem
            currentSection="5"
            isSelected={currentSection == "5" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Cancellation and Refund Eligibility"
            title_pt="Cancelamento e Elegibilidade para Reembolso"
          />

          <PolicyMenuItem
            currentSection="6"
            isSelected={currentSection == "6" ? true : false}
            setCurrentSection={setCurrentSection}
            title_en="Policy Modifications"
            title_pt="Modificações na Política"
          />
        </div>
        <div className="md:w-[70vw] w-full flex flex-col gap-4 md:pl-8 pl-0 md:pt-0 pt-6">
          <PolicyContentItem
            description_en="By using our platform, you agree to comply with all applicable laws and regulations. You are responsible for maintaining the security of your account and for all activities that occur under your account. Unauthorized use of the platform, including attempts to gain unauthorized access, distribute malware, or disrupt services, is strictly prohibited and may result in termination of your account."
            description_pt="Ao utilizar nossa plataforma, você concorda em cumprir todas as leis e regulamentos aplicáveis. Você é responsável por manter a segurança da sua conta e por todas as atividades que ocorrem sob a sua conta. O uso não autorizado da plataforma, incluindo tentativas de obter acesso não autorizado, distribuir malware ou interromper os serviços, é estritamente proibido e pode resultar na rescisão da sua conta."
            title_en="User Responsibilities"
            title_pt="Responsabilidades do Usuário"
            section_id="1"
            position={1}
          />

          <PolicyContentItem
            description_en="Our platform may offer integrations with third-party services. By using these integrations, you agree to the terms and conditions of the third-party providers. We are not responsible for the privacy practices, data handling, or content of these third-party services. It is your responsibility to review and comply with the terms of service of any third-party services you use through our platform."
            description_pt="Nossa plataforma pode oferecer integrações com serviços de terceiros. Ao usar essas integrações, você concorda com os termos e condições dos provedores terceiros. Não somos responsáveis pelas práticas de privacidade, manuseio de dados ou conteúdo desses serviços de terceiros. É sua responsabilidade revisar e cumprir os termos de serviço de qualquer serviço de terceiros que você usar através de nossa plataforma."
            title_en="Third-Party Integrations"
            title_pt="Integrações com Terceiros"
            section_id="2"
            position={2}
          />

          <PolicyContentItem
            description_en="We reserve the right to modify or discontinue our services at any time, with or without notice. We may also update these terms of use from time to time. Your continued use of the platform after any changes to the terms will constitute your acceptance of the revised terms. It is your responsibility to review the terms of use regularly to ensure you are aware of any changes."
            description_pt="Reservamo-nos o direito de modificar ou descontinuar nossos serviços a qualquer momento, com ou sem aviso prévio. Também podemos atualizar estes termos de uso periodicamente. Seu uso continuado da plataforma após qualquer alteração nos termos constituirá sua aceitação dos termos revisados. É sua responsabilidade revisar os termos de uso regularmente para garantir que esteja ciente de quaisquer alterações."
            title_en="Service Modifications"
            title_pt="Modificações nos Serviços"
            section_id="3"
            position={3}
          />

          <PolicyContentItem
            description_en="We offer a 7-day free trial with access to all pro features, allowing you to evaluate our services before committing to a subscription. If you decide to subscribe, either monthly or annually, charges will apply at the end of the trial period. Once a subscription is active, refunds are not provided for any unused portion of the subscription term. We encourage you to use the trial period to ensure our services meet your needs."
            description_pt="Oferecemos um período de teste gratuito de 7 dias com acesso a todos os recursos pro, permitindo que você avalie nossos serviços antes de se comprometer com uma assinatura. Se decidir assinar, seja mensalmente ou anualmente, as cobranças serão aplicadas ao final do período de teste. Uma vez que a assinatura esteja ativa, não oferecemos reembolsos por qualquer parte não utilizada do período da assinatura. Recomendamos que você utilize o período de teste para garantir que nossos serviços atendam às suas necessidades."
            title_en="Free Trial and Subscription Charges"
            title_pt="Período de Teste e Cobranças de Assinatura"
            section_id="4"
            position={4}
          />

          <PolicyContentItem
            description_en="You may cancel your subscription at any time before the next billing cycle to avoid further charges. Monthly subscriptions will not be refunded once the payment has been processed. For annual subscriptions, if you cancel within the first 30 days after the initial charge, you may be eligible for a partial refund, calculated on a pro-rata basis. After 30 days, no refunds will be issued for annual subscriptions."
            description_pt="Você pode cancelar sua assinatura a qualquer momento antes do próximo ciclo de faturamento para evitar novas cobranças. Assinaturas mensais não serão reembolsadas uma vez que o pagamento tenha sido processado. Para assinaturas anuais, se você cancelar dentro dos primeiros 30 dias após a cobrança inicial, você poderá ser elegível para um reembolso parcial, calculado proporcionalmente. Após 30 dias, não serão emitidos reembolsos para assinaturas anuais."
            title_en="Cancellation and Refund Eligibility"
            title_pt="Cancelamento e Elegibilidade para Reembolso"
            section_id="5"
            position={5}
          />

          <PolicyContentItem
            description_en="We reserve the right to modify our refund policy at any time. Any changes to the refund policy will be communicated to you in advance, and your continued use of our services after the effective date of the changes will constitute your acceptance of the new policy. It is your responsibility to review the refund policy periodically to stay informed of any updates."
            description_pt="Reservamo-nos o direito de modificar nossa política de reembolso a qualquer momento. Quaisquer alterações na política de reembolso serão comunicadas a você com antecedência, e seu uso contínuo de nossos serviços após a data de vigência das alterações constituirá sua aceitação da nova política. É sua responsabilidade revisar a política de reembolso periodicamente para se manter informado sobre quaisquer atualizações."
            title_en="Policy Modifications"
            title_pt="Modificações na Política"
            section_id="6"
            position={6}
          />
        </div>
      </div>
    </div>
  );
}
