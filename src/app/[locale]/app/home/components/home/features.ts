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
    t_en: "View Subscriptions",
    t_pt: "Ver Assinaturas",
    d_en: "Access and manage all your active subscriptions in one place",
    d_pt: "Acesse e gerencie todas as suas assinaturas ativas em um só lugar",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    action_url: "/app/subscriptions",
  },
  {
    t_en: "Create Events with Tickets",
    t_pt: "Criar Eventos com Ingressos",
    d_en: "Create and manage your own events, set up ticket sales and track attendance",
    d_pt: "Crie e gerencie seus próprios eventos e comece a vender ingressos",
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    action_url: "/app/events",
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
    t_en: "Event Sales Dashboard",
    t_pt: "Vendas dos Eventos",
    d_en: "Monitor your event sales and track revenue in real-time",
    d_pt: "Monitore suas vendas de eventos e acompanhe a receita em tempo real",
    color:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    action_url: "/app/transactions",
  },
  {
    t_en: "Transfer Monitoring",
    t_pt: "Monitorar Transferências",
    d_en: "Track all your financial transfers and payment history",
    d_pt: "Acompanhe todas as suas transferências financeiras e histórico de pagamentos",
    color:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    action_url: "/app/transfer",
  },
];
