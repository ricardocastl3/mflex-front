import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";

import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TVPlayer from "./components/TVPlayer";

export default function WatchTVModal() {
  // Contexts
  const { handleOpenModal } = useModal();
  const { selectedFlexTV } = useFlexTVProvider();
  return (
    <BaseModal
      callbackClose={() => handleOpenModal("")}
      customDesktop="pt-2 pb-2"
    >
      <div className="md:w-[70vw] w-[100vw] md:h-[95vh] h-[50vh] flex flex-col">
        <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-end gap-2">
            <AuSoftUI.Component.AuSoftLogo size={36} />
            <div className="flex items-center gap-2 dark:text-white">
              <h3 className="text-normal font-bold dark:text-white">
                <CTranslateTo eng="Watch TV - Online" pt="TV - Online" />
              </h3>
            </div>
          </div>
          <button onClick={() => handleOpenModal("")}>
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>

        <TVPlayer item={selectedFlexTV!} />
      </div>
    </BaseModal>
  );
}
