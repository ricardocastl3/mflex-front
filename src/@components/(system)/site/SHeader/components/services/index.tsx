import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";

import LinkHeader from "../LinkHeader";
import CContentServices from "./content";

export default function ServicesDropdown({
  isScrolled,
}: {
  isScrolled: boolean;
}) {
  const { currentPageByUrl } = useAppProvider();
  return (
    <AuSoftUI.Component.Dropdown
      trigger={
        <LinkHeader
          isButton
          isSelected={
            currentPageByUrl == "services" || currentPageByUrl == "about-us"
          }
          isScrolled={isScrolled}
          Icon={ReactIcons.AiICon.AiFillSignal}
          action="#"
          title_en="Services"
          title_pt="Serviços"
        />
      }
      DesktopContent
      DesktopContentElement={(e) => {
        return <CContentServices callback={() => e.callback!()} />;
      }}
      MobileContent={(e) => {
        return <CContentServices callback={() => e.callback()} />;
      }}
    />
  );
}
