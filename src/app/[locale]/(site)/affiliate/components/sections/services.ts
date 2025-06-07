import { ReactIcons } from "@/utils/icons";
import { IconType } from "react-icons";

export interface IServiceAffiliate {
  title_en: string;
  title_pt: string;
  icon: IconType;
  content_en: string;
  content_pt: string;
  action: string;
  action_pt: string;
  action_en: string;
}

export const stepToBecome: IServiceAffiliate[] = [
  {
    title_en: "1. Create an FLEX Account",
    title_pt: "1. Crie uma conta FLEX",
    icon: ReactIcons.HiIcon.HiUser,
    content_en:
      "Start your journey by creating a FLEX account. This is your first step towards becoming an affiliate and unlocking the potential to earn commissions by promoting our services.",
    content_pt:
      "Comece sua jornada criando uma conta FLEX. Este é seu primeiro passo para se tornar um afiliado e desbloquear o potencial de ganhar comissões promovendo nossos serviços.",
    action: "sign-up",
    action_en: "Create account Or Sign In",
    action_pt: "Criar conta ou iniciar sessão",
  },
  {
    title_en: "2. Access the Affiliate Dashboard",
    title_pt: "2. Acesse o Painel do Afiliado",
    icon: ReactIcons.HiIcon.HiPresentationChartLine,
    content_en:
      "Once your account is created, access our exclusive Affiliate Dashboard. Here you'll find all the tools, resources, and tracking features you need to manage your affiliate activities effectively.",
    content_pt:
      "Após criar sua conta, acesse nosso exclusivo Painel do Afiliado. Aqui você encontrará todas as ferramentas, recursos e funcionalidades de rastreamento necessárias para gerenciar suas atividades de afiliado de forma eficiente.",
    action: "",
    action_en: "",
    action_pt: "",
  },
  {
    title_en: "3. At the end...",
    title_pt: "3. E por fim...",
    icon: ReactIcons.HiIcon.HiCheckCircle,
    content_en:
      "Navigate to the MY COMMISSIONS section and click the REQUEST AFFILIATION button to start your affiliate journey. Our team will review your application and get you started with your affiliate program.",
    content_pt:
      "Navegue até a seção MINHAS COMISSÕES e clique no botão SOLICITAR AFILIAÇÃO para iniciar sua jornada como afiliado. Nossa equipe analisará sua solicitação e iniciará seu programa de afiliados.",
    action: "",
    action_en: "",
    action_pt: "",
  },
];

export const benefits: IServiceAffiliate[] = [
  {
    title_en: "Marketing Materials",
    title_pt: "Materiais de Marketing",
    icon: ReactIcons.HiIcon.HiDocumentText,
    content_en:
      "Get access to professional marketing materials, banners, and promotional content to help you effectively promote our services and maximize your earnings.",
    content_pt:
      "Tenha acesso a materiais de marketing profissionais, banners e conteúdo promocional para ajudar você a promover nossos serviços de forma eficaz e maximizar seus ganhos.",
    action: "",
    action_en: "",
    action_pt: "",
  },
  {
    title_en: "Earnings Monitoring",
    title_pt: "Monitoramento dos Ganhos",
    icon: ReactIcons.HiIcon.HiCurrencyDollar,
    content_en:
      "Track your earnings in real-time through our intuitive dashboard. Monitor your performance, view detailed reports, and stay updated on your commission status.",
    content_pt:
      "Acompanhe seus ganhos em tempo real através do nosso painel intuitivo. Monitore seu desempenho, visualize relatórios detalhados e mantenha-se atualizado sobre o status de suas comissões.",
    action: "",
    action_en: "",
    action_pt: "",
  },
  {
    title_en: "Affiliate Rankings",
    title_pt: "Ranking dos Afiliados",
    icon: ReactIcons.HiIcon.HiStar,
    content_en:
      "Compete in our weekly and monthly affiliate rankings. Showcase your performance, climb the leaderboard, and earn additional rewards for being a top performer.",
    content_pt:
      "Participe dos rankings semanais e mensais de afiliados. Destaque seu desempenho, suba no ranking e ganhe recompensas adicionais por ser um dos melhores afiliados.",
    action: "",
    action_en: "",
    action_pt: "",
  },
];
