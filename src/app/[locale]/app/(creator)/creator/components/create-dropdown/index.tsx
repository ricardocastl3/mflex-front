import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";

import ContentDropdown from "./CContentDropdown";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function SelectCreatePostDropdown() {
  return (
    <AuSoftUI.Component.Dropdown
      trigger={
        <div className="md:w-full w-fit flex flex-col gap-2">
          <AuSoftUI.UI.Button
            className="items-center font-bold w-fit"
            variant={"outline"}
            size={"sm"}
          >
            <ReactIcons.AiICon.AiFillPlusCircle size={15} />
            <p className="md:flex hidden">
              <CTranslateTo eng="New Post" pt="Nova postagem" />
            </p>
          </AuSoftUI.UI.Button>
        </div>
      }
      DesktopContent
      MobileContent={(e) => <ContentDropdown callback={() => e.callback()} />}
      DesktopContentElement={(e) => (
        <ContentDropdown callback={() => e.callback!()} />
      )}
    />
  );
}
