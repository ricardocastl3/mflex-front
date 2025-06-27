import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BaseModal from "../../base";

export default function CreatorPublishPostMusicModal() {
  const { handleOpenModal } = useModal();

  function handleClose() {
    handleOpenModal("");
  }

  return (
    <BaseModal callbackClose={handleClose}>
      <div className="flex flex-col justify-between md:w-[50vw] w-[90vw]">
        <div>
          <div className="div flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <AuSoftUI.Component.Avatar
                size={40}
                width={40}
                wsite=""
                src={localImages.logos.flexUser.src}
              />
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex items-center gap-4 border-t border-slate-200 dark:border-slate-800 pt-4">
          <AuSoftUI.UI.Button variant={"primary"} size={"sm"}>
            <CTranslateTo eng="Publish" pt="Publicar" />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button
            onClick={handleClose}
            variant={"outline"}
            size={"sm"}
          >
            <CTranslateTo eng="Cancel" pt="Cancelar" />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </BaseModal>
  );
}
