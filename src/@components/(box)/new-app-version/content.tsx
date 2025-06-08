import { BaseBox } from "../BaseBox";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function ContentVersion() {
  const { handleAppSystemModal } = useAppProvider();

  return (
    <>
      <BaseBox className="p-5 md:w-[35vw] w-[90vw]">
        <div className="flex flex-col gap-1.5">
          <h1 className="dark:text-yellow-500 text-yellow-600 font-bold text-base">
            <CTranslateTo
              eng="New Version Available 🚀"
              pt="Nova Versão Disponível 🚀"
            />
          </h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-slate-500 text-sm dark:text-slate-400">
              <CTranslateTo
                eng="A new version is ready to install"
                pt="Uma nova versão está pronta para instalar"
              />
            </h2>
            <h2 className="text-slate-600 text-sm dark:text-slate-200">
              <b className="font-bold mr-2">Obs:</b>
              <CTranslateTo
                eng="If fefreshing now will clear any unsaved changes"
                pt="Se atualizar agora irá limpar alterações não salvas"
              />
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <AuSoftUI.UI.Button
              onClick={() => {
                window.location.reload();
              }}
              variant={"primary"}
              className="w-full items-center justify-center"
            >
              <CTranslateTo eng="Update now" pt="Atualizar agora" />
              <ReactIcons.AiICon.AiFillRocket size={15} />
            </AuSoftUI.UI.Button>
            <AuSoftUI.UI.Button
              onClick={() => {
                handleAppSystemModal({ openNewVersion: false });
              }}
              variant={"outline"}
              className="w-full items-center justify-center"
            >
              <CTranslateTo eng="Later" pt="Depois" />
              <ReactIcons.AiICon.AiOutlineGlobal size={15} />
            </AuSoftUI.UI.Button>
          </div>
        </div>
      </BaseBox>
    </>
  );
}
