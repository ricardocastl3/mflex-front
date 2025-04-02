import { ReactIcons } from "@/utils/icons";

import CContent from "./CContent";
import ADropdownBase from "@/@components/(ausoft)/ADropdownBase";

export function CAuSoftApps() {
  return (
    <>
      <ADropdownBase
        trigger={
          <div>
            <span className="flex p-2 cursor-pointer rounded-full border dark:border-none border-slate-300 dark:text-white text-sm font-bold bg-white dark:bg-slate-800">
              <ReactIcons.AiICon.AiFillAppstore size={20} />
            </span>
          </div>
        }
        MobileContent={(call) => {
          return <CContent callback={() => call.callback()} />;
        }}
        DesktopContent={<CContent />}
      />
    </>
  );
}
