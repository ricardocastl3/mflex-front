import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useState } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BaseModal from "../base";

export default function TechnicalSupport() {
  const { handleOpenModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BaseModal
      callbackClose={() => handleOpenModal("")}
      customDesktop="pt-2 pb-2"
    >
      <div className="md:w-[50vw] w-[90vw] md:h-[90vh] h-[90vh] flex flex-col">
        <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-end gap-2">
            <AuSoftUI.Component.AuSoftLogo size={36} />
            <h3 className="text-normal font-bold dark:text-white">
              <CTranslateTo eng="Customer Support" pt="Apoio Ao Cliente" />
            </h3>
          </div>
          <button onClick={() => handleOpenModal("")}>
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>
        {isLoading && (
          <div className="flex flex-col items-center h-full justify-center">
            <ReactIcons.PiIcon.PiSpinner
              size={40}
              className="dark:text-white animate-spin"
            />
          </div>
        )}
        <div className="w-full h-full">
          <iframe
            src="https://tawk.to/chat/67fa4313db1039190df39137/1iokpc18u"
            allowFullScreen
            width={"100%"}
            height={"100%"}
            className="z-30"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </BaseModal>
  );
}
