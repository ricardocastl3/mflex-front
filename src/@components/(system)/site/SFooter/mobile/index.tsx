import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";

import LinkMButton from "./components/LinkMButton";
import CContentServices from "../../SHeader/components/services/content";

export default function SMobileFooter() {
  const { currentPageByUrl } = useAppProvider();
  const { handleOpenModal } = useModal();

  return (
    <div>
    {/*   <div className="md:hidden flex fixed bottom-[4.9rem] right-3 z-20 animate-fade-up">
        <AuSoftUI.UI.Button
          onClick={() => handleOpenModal("mobile-site-more-options")}
          className="rounded-full p-3"
          variant={"primary"}
        >
          <ReactIcons.BiIcon.BiDotsHorizontal size={18} />
        </AuSoftUI.UI.Button>
      </div> */}
      <BaseBox className="dark:bg-ausoft-slate-950 transition-all w-full z-20 md:hidden border-t rounded-t-xl border-slate-200 dark:border-slate-800 fixed bottom-0 rounded-none grid grid-cols-4 inset-x-0">
        <LinkMButton
          Icon={ReactIcons.AiICon.AiFillFire}
          action="news"
          isSelected={currentPageByUrl == "news"}
          title_en="News"
          title_pt="Novidades"
          bar
        />

        <LinkMButton
          Icon={ReactIcons.AiICon.AiOutlineVerified}
          action="events"
          isSelected={currentPageByUrl == "events"}
          title_en="Events"
          title_pt="Eventos"
          bar
        />

        <LinkMButton
          Icon={ReactIcons.AiICon.AiOutlineAudio}
          action="podflex"
          isSelected={currentPageByUrl == "podflex"}
          title_en="PodCasts"
          title_pt="PodCasts"
          bar
        />

        <AuSoftUI.Component.Dropdown
          trigger={
            <LinkMButton
              Icon={ReactIcons.AiICon.AiFillSignal}
              action="#"
              isSelected={
                currentPageByUrl == "about-us" || currentPageByUrl == "services"
              }
              title_en="Services"
              title_pt="Serviços"
              bar
            />
          }
          DesktopContent={<CContentServices />}
          MobileContent={(e) => {
            return <CContentServices callback={() => e.callback()} />;
          }}
        />
      </BaseBox>
    </div>
  );
}
