export interface IFaqItem {
  t_pt: string;
  t_en: string;
  d_en: string;
  d_pt: string;
}

export const faqTickets: IFaqItem[] = [
  {
    t_en: "How do I buy tickets for an event?",
    t_pt: "Como compro ingressos para um evento?",
    d_en: "Simply browse our events list, select the event you want to attend, choose your ticket type, and complete the payment. You'll receive your ticket via email and can also access it in your account.",
    d_pt: "Basta navegar pela nossa lista de eventos, selecionar o evento desejado, escolher o tipo de ingresso e completar o pagamento. Você receberá seu ingresso por e-mail e também poderá acessá-lo em sua conta.",
  },
  {
    t_en: "Can I get a refund if I can't attend the event?",
    t_pt: "Posso receber reembolso se não puder comparecer ao evento?",
    d_en: "Refund policies vary by event. Each event organizer sets their own refund policy, which is clearly displayed during the ticket purchase process. We recommend reviewing the policy before completing your purchase.",
    d_pt: "As políticas de reembolso variam de acordo com o evento. Cada organizador define sua própria política de reembolso, que é claramente exibida durante o processo de compra do ingresso. Recomendamos revisar a política antes de completar sua compra.",
  },
  {
    t_en: "How do I transfer my ticket to someone else?",
    t_pt: "Como transfiro meu ingresso para outra pessoa?",
    d_en: "You can transfer your ticket through your account dashboard. Select the ticket you want to transfer, enter the recipient's email, and they'll receive instructions to claim their ticket.",
    d_pt: "Você pode transferir seu ingresso através do painel da sua conta. Selecione o ingresso que deseja transferir, insira o e-mail do destinatário, e ele receberá instruções para reivindicar o ingresso.",
  },
  {
    t_en: "What is the service fee for ticket sales?",
    t_pt: "Qual é a taxa de serviço para venda de ingressos?",
    d_en: "We charge an 8% service fee on each ticket sold. This fee helps us maintain the platform, ensure secure payments, and provide customer support. The fee is automatically calculated and displayed before you complete your purchase.",
    d_pt: "Cobramos uma taxa de serviço de 8% por cada ingresso vendido. Esta taxa nos ajuda a manter a plataforma, garantir pagamentos seguros e fornecer suporte ao cliente. A taxa é calculada automaticamente e exibida antes de você completar sua compra.",
  },
  {
    t_en: "How do I create and sell tickets for my event?",
    t_pt: "Como crio e vendo ingressos para meu evento?",
    d_en: "To create and sell tickets, log into your MFLEX account, go to the 'My Events' section, fill in your event details, set ticket prices, and publish. Your event will be visible in our public events list, and you'll receive payments automatically, minus the 8% service fee.",
    d_pt: "Para criar e vender ingressos, faça login na sua conta MFLEX, vá para a seção 'Meus Eventos', preencha os detalhes do seu evento, defina os preços dos ingressos e publique. Seu evento ficará visível na nossa lista pública de eventos, e você receberá os pagamentos automaticamente, com desconto da taxa de serviço de 8%.",
  },
  {
    t_en: "How do I receive payments from ticket sales?",
    t_pt: "Como recebo os pagamentos das vendas de ingressos?",
    d_en: "Payments are automatically processed and transferred to your registered bank account after each sale, minus the 8% service fee. You can track all transactions and earnings in your MFLEX dashboard.",
    d_pt: "Os pagamentos são processados e transferidos automaticamente para sua conta bancária registrada após cada venda, com desconto da taxa de serviço de 8%. Você pode acompanhar todas as transações e ganhos no seu painel MFLEX.",
  },
];

export const faqFlexTv: IFaqItem[] = [
  {
    t_en: "What content is available on FlexTV?",
    t_pt: "Qual conteúdo está disponível na FlexTV?",
    d_en: "FlexTV offers a diverse range of content including sports analysis, entertainment shows, exclusive interviews, and live event coverage. Our content is regularly updated to bring you the latest in entertainment and sports.",
    d_pt: "A FlexTV oferece uma ampla variedade de conteúdo, incluindo análises esportivas, programas de entretenimento, entrevistas exclusivas e cobertura de eventos ao vivo. Nosso conteúdo é atualizado regularmente para trazer o que há de mais recente em entretenimento e esportes.",
  },
  {
    t_en: "How can I access FlexTV content?",
    t_pt: "Como posso acessar o conteúdo da FlexTV?",
    d_en: "You can access FlexTV content through our website or mobile app. Simply create an account, choose your preferred subscription plan, and start enjoying our content immediately.",
    d_pt: "Você pode acessar o conteúdo da FlexTV através do nosso site ou aplicativo móvel. Basta criar uma conta, escolher seu plano de assinatura preferido e começar a desfrutar do nosso conteúdo imediatamente.",
  },
  {
    t_en: "Are there different subscription plans available?",
    t_pt: "Existem diferentes planos de assinatura disponíveis?",
    d_en: "Yes, we offer various subscription plans to suit different needs. From basic access to premium content, you can choose the plan that best fits your entertainment preferences and budget.",
    d_pt: "Sim, oferecemos vários planos de assinatura para atender diferentes necessidades. Do acesso básico ao conteúdo premium, você pode escolher o plano que melhor se adapta às suas preferências de entretenimento e orçamento.",
  },
  {
    t_en: "How do I get access to all FlexTV channels?",
    t_pt: "Como obtenho acesso a todos os canais da FlexTV?",
    d_en: "To access all FlexTV channels, you'll need to subscribe to one of our plans available in the 'Flex Plans' section of our platform. Each plan offers different channel packages, allowing you to choose the one that best suits your viewing preferences.",
    d_pt: "Para acessar todos os canais da FlexTV, você precisará assinar um dos nossos planos disponíveis na seção 'Planos Flex' da nossa plataforma. Cada plano oferece diferentes pacotes de canais, permitindo que você escolha o que melhor se adapta às suas preferências de visualização.",
  },
  {
    t_en: "Can I watch FlexTV content on multiple devices?",
    t_pt: "Posso assistir ao conteúdo da FlexTV em vários dispositivos?",
    d_en: "Yes, you can stream FlexTV content on multiple devices simultaneously. Check the specific details of your plan in the 'Flex Plans'.",
    d_pt: "Sim, você pode transmitir o conteúdo da FlexTV em vários dispositivos simultaneamente. Verifique os detalhes específicos do seu plano na seção 'Planos Flex'.",
  },
  {
    t_en: "What payment methods are accepted for FlexTV subscriptions?",
    t_pt: "Quais métodos de pagamento são aceitos para assinaturas da FlexTV?",
    d_en: "We accept various Angolan payment methods including Pagamento Por Referência, Multicaixa Express, and the PayPay App. All payments are processed securely through our platform. You can manage your payment methods and subscription details in your MFLEX account settings.",
    d_pt: "Aceitamos vários métodos de pagamento angolanos, incluindo Pagamento Por Referência, Multicaixa Express e o App da PayPay. Todos os pagamentos são processados com segurança através da nossa plataforma. Você pode gerenciar seus métodos de pagamento e detalhes da assinatura nas configurações da sua conta MFLEX.",
  },
];

export const faqFlexMovie: IFaqItem[] = [
  {
    t_en: "What is Flex Movie?",
    t_pt: "O que é a Flex Movie?",
    d_en: "Flex Movie is an upcoming feature of our MFLEX platform that will offer a vast collection of films, from the latest blockbusters to classic cinema. While we're currently developing this exciting new feature, we're working hard to bring you the best movie streaming experience soon.",
    d_pt: "Flex Movie é um recurso futuro da nossa plataforma MFLEX que oferecerá uma vasta coleção de filmes, desde os últimos lançamentos até o cinema clássico. Embora estejamos atualmente desenvolvendo este novo recurso, estamos trabalhando para trazer a melhor experiência de streaming de filmes em breve.",
  },
  {
    t_en: "When will Flex Movie be available?",
    t_pt: "Quando a Flex Movie estará disponível?",
    d_en: "Flex Movie is currently under development as part of our MFLEX platform. We're working to create an exceptional movie streaming experience with a carefully curated selection of films. Stay tuned to our social media channels for updates on our launch date.",
    d_pt: "A Flex Movie está atualmente em desenvolvimento como parte da nossa plataforma MFLEX. Estamos trabalhando para criar uma experiência excepcional de streaming de filmes com uma seleção cuidadosamente curada de filmes. Fique atento aos nossos canais de mídia social para atualizações sobre nossa data de lançamento.",
  },
  {
    t_en: "What kind of movies will be available?",
    t_pt: "Que tipo de filmes estarão disponíveis?",
    d_en: "Once launched, Flex Movie will be accessible through your MFLEX account, featuring a diverse catalog including new releases, classic films, international cinema, and exclusive content. We're curating a selection that caters to all movie enthusiasts, from mainstream hits to independent gems.",
    d_pt: "Após o lançamento, a Flex Movie estará acessível através da sua conta MFLEX, apresentando um catálogo diversificado incluindo novos lançamentos, filmes clássicos, cinema internacional e conteúdo exclusivo. Estamos preparando uma seleção que atende a todos os entusiastas de cinema, desde sucessos do mainstream até pérolas independentes.",
  },
];
