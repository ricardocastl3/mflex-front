import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ReactIcons } from "@/utils/icons";

import BaseModal from "@/@components/(modals)/base";
import LinkButton from "@/@components/(system)/ASidebar/components/LinkButton";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function MobileMoreSiteOptions() {
  //Contexts
  const { handleOpenModal } = useModal();
  const { currentPageByUrl } = useAppProvider();

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
          onClick={() => {
            handleOpenModal("");
            LocalStorageServices.resetAllKeys();
          }}
          className="flex flex-col gap-3 px-4 py-5 h-[35vh] overflow-y-auto"
        >
          <h4 className="text-normal text-slate-500 dark:text-slate-300">
            <CTranslateTo eng="Navigation" pt="Navegação" />
          </h4>
          <div className="flex flex-col gap-2">
            <LinkButton
              isExpanded={true}
              isPublic
              Icon={ReactIcons.FaIcon.FaMusic}
              href="musics"
              isSelected={currentPageByUrl == "musics"}
              title_en="Musics"
              title_pt="Músicas"
            />
            <LinkButton
              isExpanded={true}
              isPublic
              Icon={ReactIcons.Io5Icon.IoFootball}
              href="games"
              isSelected={currentPageByUrl == "games"}
              title_en="Games"
              title_pt="Jogos"
            />
            <LinkButton
              isExpanded={true}
              isPublic
              Icon={ReactIcons.MdIcon.MdTv}
              href="flex-tv"
              isSelected={currentPageByUrl == "flex-tv"}
              title_en="Flex TV"
              title_pt="Flex TV"
            />
            <LinkButton
              isExpanded={true}
              isPublic
              Icon={ReactIcons.PiIcon.PiPlay}
              href="flex-movie"
              isSelected={currentPageByUrl == "flex-movie"}
              title_en="Flex Movie"
              title_pt="Flex Movie"
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
