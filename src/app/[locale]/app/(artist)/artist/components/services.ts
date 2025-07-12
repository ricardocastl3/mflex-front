import { ReactIcons } from "@/utils/icons";
import { IconType } from "react-icons";

export interface IArtistService {
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

export const artistServices: IArtistService[] = [
  {
    t_pt: "Minhas Músicas",
    t_en: "My Musics",
    d_pt: "Gerencie seu catálogo musical e faça uploads",
    d_en: "Manage your music catalog and upload tracks",
    iconColor: "text-yellow-500 hover:text-yellow-600",
    Icon: ReactIcons.FaIcon.FaMusic,
    action: "art-musics",
    affiliateRequire: false,
    type: "menu",
  },
  {
    t_pt: "Doações Recebidas",
    t_en: "Received Donations",
    d_pt: "Doações recebidas dos seus fãs e apoiadores",
    d_en: "Donations received from your fans and supporters",
    iconColor: "text-emerald-500 hover:text-emerald-600",
    Icon: ReactIcons.FaIcon.FaDonate,
    action: "art-donations",
    affiliateRequire: false,
    type: "menu",
  },
  {
    t_pt: "Meus Dados",
    t_en: "My Artist Info",
    d_pt: "Acesso as minhas informações de artista música",
    d_en: "Access my music artist information",
    iconColor: "text-blue-500 hover:text-blue-600",
    Icon: ReactIcons.MdIcon.MdVerifiedUser,
    action: "modal-artist-info",
    affiliateRequire: false,
    type: "menu",
  },
  {
    t_pt: "Artista Flex",
    t_en: "Flex Artist",
    d_pt: "Saiba como ser um artista Flex de sucesso",
    d_en: "Learn how to be a successful Flex artist",
    iconColor: "text-orange-500 hover:text-orange-600",
    Icon: ReactIcons.FaIcon.FaBook,
    action: "modal-art-success-material",
    affiliateRequire: false,
    type: "manual",
  },
  {
    t_pt: "Vídeo Aulas",
    t_en: "Tutorials",
    d_pt: "Aprenda como postar músicas, e usar o seu painel",
    d_en: "Learn how to post music and use your dashboard",
    iconColor: "text-red-500 hover:text-red-600",
    Icon: ReactIcons.MdIcon.MdPlayCircle,
    action: "modal-art-tutorials",
    affiliateRequire: true,
    type: "tutorial",
  },
];
