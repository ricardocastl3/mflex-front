import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";

import LinkMButton from "./components/LinkMButton";

export default function SMobileFooter() {
  const { currentPageByUrl } = useAppProvider();

  return (
    <BaseBox className="dark:bg-ausoft-slate-950 transition-all z-20 md:hidden border-t rounded-t-xl border-slate-200 dark:border-slate-800 fixed bottom-0 rounded-none grid grid-cols-4 inset-x-0">
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
        title_en="PodFlex"
        title_pt="PodFlex"
        bar
      />

      <LinkMButton
        Icon={ReactIcons.AiICon.AiFillSignal}
        action="services"
        isSelected={currentPageByUrl == "services"}
        title_en="Services"
        title_pt="Serviços"
        bar
      />
    </BaseBox>
  );
}
