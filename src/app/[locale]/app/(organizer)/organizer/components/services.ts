import { IconType } from "react-icons";
import {
  MdEvent,
  MdPayments,
  MdAccountBalance,
  MdQrCodeScanner,
} from "react-icons/md";

export interface IServiceOrganizer {
  t_pt: string;
  t_en: string;
  d_pt: string;
  d_en: string;
  iconColor: string;
  Icon: IconType;
  action: string;
}

export const organizerServices: IServiceOrganizer[] = [
  {
    t_pt: "Meus Eventos",
    t_en: "My Events",
    d_pt: "Gerencie seus eventos e ingressos",
    d_en: "Manage your events and tickets",
    iconColor: "text-emerald-500 hover:text-emerald-600",
    Icon: MdEvent,
    action: "/events",
  },
  {
    t_pt: "Minhas Vendas",
    t_en: "My Sales",
    d_pt: "Acompanhe suas vendas e o estado das transações",
    d_en: "Track your sales and transaction status",
    iconColor: "text-blue-500 hover:text-blue-600",
    Icon: MdPayments,
    action: "/transactions",
  },
  {
    t_pt: "Transferências Bancárias",
    t_en: "Bank Transfers",
    d_pt: "Acompanhe os valores transferidos para sua conta",
    d_en: "Track the amounts transferred to your account",
    iconColor: "text-purple-500 hover:text-purple-600",
    Icon: MdAccountBalance,
    action: "/transfer",
  },
  {
    t_pt: "Validar Ingresso",
    t_en: "Validate Ticket",
    d_pt: "Valide ingressos comprados pelos clientes",
    d_en: "Validate tickets purchased by customers",
    iconColor: "text-orange-500 hover:text-orange-600",
    Icon: MdQrCodeScanner,
    action: "modal-validate",
  },
];
