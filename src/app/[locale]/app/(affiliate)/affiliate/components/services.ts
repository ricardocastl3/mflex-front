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
  },
];
