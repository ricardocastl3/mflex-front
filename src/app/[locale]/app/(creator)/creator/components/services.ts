import { ReactIcons } from "@/utils/icons";
import { IconType } from "react-icons";

export interface ICreatorService {
  t_pt: string;
  t_en: string;
  d_pt: string;
  d_en: string;
  iconColor: string;
  Icon: IconType;
  action: string;
  type: string;
}

export const creatorServices: ICreatorService[] = [
  {
    t_pt: "Estatísticas",
    t_en: "Statistics",
    d_pt: "Estatísticas das suas publicações",
    d_en: "Your publication statistics",
    iconColor: "text-violet-500 hover:text-violet-600",
    Icon: ReactIcons.FaIcon.FaChartArea,
    action: "creators/stats",
    type: "menu",
  },
  {
    t_pt: "Casa da Flex",
    t_en: "Flex House",
    d_pt: "Ir para Casa da Flex",
    d_en: "Go to Flex House",
    iconColor: "text-yellow-500 hover:text-yellow-600",
    Icon: ReactIcons.MdIcon.MdHouse,
    action: "flex-house",
    type: "menu",
  },
  {
    t_pt: "Perfil Público",
    t_en: "Public Profile",
    d_pt: "Visualize seu perfil",
    d_en: "Preview your profile",
    iconColor: "text-slate-500 hover:text-slate-600",
    Icon: ReactIcons.AiICon.AiOutlineUser,
    action: "#",
    type: "profile",
  },
];
