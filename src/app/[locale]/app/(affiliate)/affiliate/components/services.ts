import { ReactIcons } from "@/utils/icons";
import { IconType } from "react-icons";
import { MdPayments } from "react-icons/md";

export interface IAffiliateService {
  t_pt: string;
  t_en: string;
  d_pt: string;
  d_en: string;
  iconColor: string;
  Icon: IconType;
  action: string;
  type: string;
  affiliateRequire: boolean;
}

export const affiliateServices: IAffiliateService[] = [
  {
    t_pt: "Minhas comissões",
    t_en: "My Commissions",
    d_pt: "Acompanhe seus ganhos e histórico de comissões",
    d_en: "Track your earnings and commission history",
    iconColor: "text-emerald-500 hover:text-emerald-600",
    Icon: MdPayments,
    action: "af-commissions",
    affiliateRequire: false,
    type: "menu",
  },
  {
    t_pt: "Eventos",
    t_en: "Events",
    d_pt: "Monitore todos os eventos em que realizou afiliação",
    d_en: "Monitor all events you have joined",
    iconColor: "text-yellow-500 hover:text-yellow-600",
    Icon: ReactIcons.MdIcon.MdEditCalendar,
    action: "af-events",
    affiliateRequire: false,
    type: "menu",
  },
  {
    t_pt: "Afiliado de Eventos",
    t_en: "Affiliate For Events",
    d_pt: "Saiba como o nosso programa de afiliados funciona",
    d_en: "Learn how our affiliate program works",
    iconColor: "text-yellow-500 hover:text-yellow-600",
    Icon: ReactIcons.MdIcon.MdBook,
    action: "modal-event-affiliate-material",
    affiliateRequire: true,
    type: "manual",
  },
  {
    t_pt: "Afiliado de Elite",
    t_en: "Elite Affiliate",
    d_pt: "Saiba como o nosso programa de afiliados de elite funciona",
    d_en: "Learn how our elite affiliate program works",
    iconColor: "text-blue-500 hover:text-blue-600",
    Icon: ReactIcons.MdIcon.MdPersonalInjury,
    action: "modal-elite-affiliate-material",
    affiliateRequire: true,
    type: "manual",
  },
];
