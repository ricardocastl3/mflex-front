import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ReactIcons } from "@/utils/icons";

import BaseModal from "@/@components/(modals)/base";
import LinkButton from "@/@components/(system)/ASidebar/components/LinkButton";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function MobileMoreOptions() {
  //Contexts
  const { handleOpenModal } = useModal();
  const { currentAppPageUrl } = useAppProvider();

  return (
    <BaseModal callbackClose={() => handleOpenModal("")}>
      <BaseBox className="w-[90vw] h-fit flex flex-col justify-between">
        <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-end gap-2">
            <AuSoftUI.Component.AuSoftLogo size={40} />
            <h4 className="font-bold text-base dark:text-white">
              <CTranslateTo eng="More Options" pt="Mais Opções" />
            </h4>
          </div>
          <button onClick={() => handleOpenModal("")}>
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>
        <div
          onClick={() => handleOpenModal("")}
          className="flex flex-col gap-3 px-4 py-5 h-[40vh] overflow-y-auto"
        >
          <h4 className="text-normal text-slate-500 dark:text-slate-300">
            <CTranslateTo eng="Navigation" pt="Navegação" />
          </h4>
          <div className="flex flex-col gap-2">
            <LinkButton
              isExpanded={true}
              Icon={ReactIcons.HiIcon.HiCreditCard}
              href="subscriptions"
              isSelected={currentAppPageUrl == "subscriptions"}
              title_en="Subscriptions"
              title_pt="Assinaturas"
            />

            <LinkButton
              isExpanded={true}
              Icon={ReactIcons.FaIcon.FaDonate}
              href="donations"
              isSelected={currentAppPageUrl == "donations"}
              title_en="My Donations"
              title_pt="Minhas doações"
            />
          </div>
          <h4 className="text-normal text-slate-500 dark:text-slate-300">
            <CTranslateTo eng="Panels" pt="Paineis" />
          </h4>
          <div className="flex flex-col gap-2">
            <LinkButton
              isExpanded={true}
              Icon={ReactIcons.HiIcon.HiColorSwatch}
              href="creator"
              isSelected={currentAppPageUrl == "creator"}
              title_en="Creator Panel"
              title_pt="Painel do Criador"
            />

            <LinkButton
              isExpanded={true}
              Icon={ReactIcons.FaIcon.FaMusic}
              href="artist"
              isSelected={currentAppPageUrl == "artist"}
              title_en="Artists Panel"
              title_pt="Painel do Artista"
            />

            <LinkButton
              isExpanded={true}
              Icon={ReactIcons.MdIcon.MdDashboard}
              href="affiliate"
              isSelected={currentAppPageUrl == "affiliate"}
              title_en="Affiliate Panel"
              title_pt="Painel do Afiliado"
            />
            <LinkButton
              isExpanded={true}
              Icon={ReactIcons.FaIcon.FaCalendarWeek}
              href="organizer"
              isSelected={currentAppPageUrl == "organizer"}
              title_en="Organizer Panel"
              title_pt="Painel do Organizador"
            />
          </div>
        </div>
        <div className="border-t border-slate-300 dark:border-t-slate-700 px-4 py-2.5">
          <AuSoftUI.UI.Button
            onClick={() => handleOpenModal("")}
            className="rounded-full py-3 justify-center w-full"
            variant={"outline"}
          >
            <CTranslateTo eng="Close" pt="Fechar" />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
