import { AuSoftUI } from "@/@components/(ausoft)";
import { useTranslate } from "@/providers/app/TranslateProvider";
import { useFootballProvider } from "@/providers/features/FootballProvider";

import ContentCategory from "./CContentLeagues";

export default function FootballLeagueDropdown() {
  const { currentLang } = useTranslate();
  const { selectedFootballAPILeague } = useFootballProvider();

  return (
    <AuSoftUI.Component.Dropdown
      right={false}
      trigger={
        <div className="w-full flex flex-col gap-2">
          <AuSoftUI.UI.TextField.Default
            value={
              selectedFootballAPILeague
                ? selectedFootballAPILeague.name
                : currentLang.code == "EN"
                ? "-- Select league --"
                : "-- Selecione uma liga --"
            }
            readOnly
            className="md:w-fit w-full z-0 text-[0.85rem] cursor-pointer h-[40px] px-[15px] py-[18px]"
          />
        </div>
      }
      DesktopContent
      MobileContent={(e) => <ContentCategory callback={() => e.callback()} />}
      DesktopContentElement={(e) => (
        <ContentCategory callback={() => e.callback!()} />
      )}
    />
  );
}
