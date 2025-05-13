import { AuSoftUI } from "@/@components/(ausoft)";
import { useTranslate } from "@/providers/app/TranslateProvider";
import { useFootballProvider } from "@/providers/features/FootballProvider";

import ContentCategory from "./CContentTeams";

export default function FootballTeamDropdown() {
  const { currentLang } = useTranslate();
  const { selectedFootballAPITeam } = useFootballProvider();

  return (
    <AuSoftUI.Component.Dropdown
      right={false}
      trigger={
        <div className="w-full flex flex-col gap-2">
          <AuSoftUI.UI.TextField.Default
            value={
              selectedFootballAPITeam
                ? selectedFootballAPITeam.name
                : currentLang.code == "EN"
                ? "-- Select team -----"
                : "-- Selecione uma equipa -----"
            }
            readOnly
            className="md:w-fit w-full text-[0.85rem] z-0 cursor-pointer h-[40px] px-[15px] py-[18px]"
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
