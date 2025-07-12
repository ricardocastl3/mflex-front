import { ReactIcons } from "@/utils/icons";
import { IconType } from "react-icons";

export interface IServiceOrganizer {
  t_pt: string;
  t_en: string;
  d_pt: string;
  d_en: string;
  iconColor: string;
  Icon: IconType;
  action: string;
  priority: number;
}

export const organizerServices: IServiceOrganizer[] = [
  {
    t_pt: "Meus Eventos",
    t_en: "My Events",
    d_pt: "Gerencie seus eventos e ingressos",
    d_en: "Manage your events and tickets",
    iconColor: "text-emerald-500 hover:text-emerald-600",
    Icon: ReactIcons.MdIcon.MdEvent,
    action: "/events",
    priority: 0,
  },
  {
    t_pt: "Minhas Vendas",
    t_en: "My Sales",
    d_pt: "Acompanhe suas vendas e o estado das transações",
    d_en: "Track your sales and transaction status",
    iconColor: "text-blue-500 hover:text-blue-600",
    Icon: ReactIcons.MdIcon.MdPayments,
    action: "/transactions",
    priority: 0,
  },
  {
    t_pt: "Transferências Bancárias",
    t_en: "Bank Transfers",
    d_pt: "Acompanhe os valores transferidos para sua conta",
    d_en: "Track the amounts transferred to your account",
    iconColor: "text-purple-500 hover:text-purple-600",
    Icon: ReactIcons.MdIcon.MdAccountBalance,
    action: "/transfer",
    priority: 0,
  },
  {
    t_pt: "Validar Ingresso",
    t_en: "Validate Ticket",
    d_pt: "Valide ingressos comprados pelos clientes",
    d_en: "Validate tickets purchased by customers",
    iconColor: "text-orange-500 hover:text-orange-600",
    Icon: ReactIcons.MdIcon.MdQrCodeScanner,
    action: "modal-validate",
    priority: 0,
  },
  {
    t_pt: "Meus Afiliados",
    t_en: "My Affiliates",
    d_pt: "Monitore os seus afiliados, e gerencie os seus acessos",
    d_en: "Monitor your affiliates and manage their access",
    iconColor: "text-yellow-500 hover:text-yellow-600",
    Icon: ReactIcons.FaIcon.FaUserAlt,
    action: "org-affiliates",
    priority: 1,
  },
  {
    t_pt: "Video aulas",
    t_en: "Tutoriais",
    d_pt: "Aprenda como criar eventos, ver afiliados, no seu painel",
    d_en: "Learn how to create events, view affiliates, in your dashboard",
    iconColor: "text-red-500 hover:text-red-600",
    Icon: ReactIcons.MdIcon.MdPlayCircle,
    action: "modal-org-tutorials",
    priority: 1,
  },
];
