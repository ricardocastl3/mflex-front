export interface IHomeFeature {
  t_en: string;
  t_pt: string;
  d_en: string;
  d_pt: string;
  color: string;
  action_url: string;
}

export const homeFeatures: IHomeFeature[] = [
  {
    t_en: "Watch TV",
    t_pt: "Assistir Canais Televisivos",
    d_en: "Watch your favorite TV channels live, with high quality streaming",
    d_pt: "Assista seus canais de TV favoritos ao vivo, com streaming de alta qualidade",
    color:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    action_url: "/flex-tv",
  },
  {
    t_en: "Games Track",
    t_pt: "Analisar Jogos",
    d_en: "Analyze and track your favorite games with detailed statistics and insights",
    d_pt: "Analise e acompanhe seus jogos favoritos com estatísticas e insights detalhados",
    color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
    action_url: "/games",
  },
  {
    t_en: "Watch Movies",
    t_pt: "Assistir Filmes",
    d_en: "Watch your favorite movies, with high quality streaming",
    d_pt: "Assista seus films favoritos, com streaming de alta qualidade",
    color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    action_url: "/flex-movie",
  },
  {
    t_en: "View Subscriptions",
    t_pt: "Ver Assinaturas",
    d_en: "Access and manage all your active subscriptions in one place",
    d_pt: "Acesse e gerencie todas as suas assinaturas ativas em um só lugar",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    action_url: "/app/subscriptions",
  },
  {
    t_en: "View Purchased Tickets",
    t_pt: "Consultar Ingressos",
    d_en: "Check all tickets you've purchased for different events",
    d_pt: "Consulte todos os ingressos que você comprou para diferentes eventos",
    color:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    action_url: "/app/tickets",
  },
  {
    t_en: "Account Settings",
    t_pt: "Configurações da Conta",
    d_en: "Manage your account preferences and personal information",
    d_pt: "Gerencie suas preferências de conta e informações pessoais",
    color: "bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400",
    action_url: "/app/settings",
  },
  {
    t_en: "Organizer Dashboard",
    t_pt: "Painel do Organizador",
    d_en: "Create and manage your own events, set up ticket sales and track attendance",
    d_pt: "Crie e gerencie seus próprios eventos e comece a vender ingressos",
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    action_url: "/app/organizer",
  },
  {
    t_en: "Affiliate Dashboard",
    t_pt: "Painel do Afiliado",
    d_en: "Monitor your commissions and transfers as event affiliate",
    d_pt: "Monitore suas comissões e transferências como afiliados de eventos",
    color:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    action_url: "/app/affiliate",
  },
  {
    t_en: "Flex Plans",
    t_pt: "Planos Flex",
    d_en: "Make the most of our services with our top-quality plans",
    d_pt: "Aproveite ao máximo dos nossos serviços com os nossos planos",
    color:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    action_url: "/pricing",
  },
];
