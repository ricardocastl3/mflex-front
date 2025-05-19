import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";

import LinkHeader from "../LinkHeader";
import CContentFlexTV from "./content";

export default function FlexTvDropdown({
  isScrolled,
}: {
  isScrolled: boolean;
}) {
  const { currentPageByUrl } = useAppProvider();
  return (
    <AuSoftUI.Component.Dropdown
      right={false}
      trigger={
        <LinkHeader
          isButton
          isSelected={
            currentPageByUrl == "flex-tv" || currentPageByUrl == "flex-movie"
          }
          isScrolled={isScrolled}
          Icon={ReactIcons.BiIcon.BiTv}
          action="#"
          title_en="Flex TV"
          title_pt="Flex TV"
        />
      }
      DesktopContent
      DesktopContentElement={(e) => {
        return <CContentFlexTV callback={() => e.callback!()} />;
      }}
      MobileContent={(e) => {
        return <CContentFlexTV callback={() => e.callback()} />;
      }}
    />
  );
}
