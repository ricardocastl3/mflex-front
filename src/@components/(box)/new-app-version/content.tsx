import { BaseBox } from "../BaseBox";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useSocketProvider } from "@/providers/auth/SocketProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function ContentVersion() {
  const { socketEvent } = useSocketProvider();

  return (
    <>
      {socketEvent?.name == "new-app-version" && (
        <BaseBox className="p-5 md:w-fit w-[90wv]">
          <div className="flex flex-col gap-2">
            <h1 className="dark:text-yellow-500 text-yellow-600 font-bold text-base">
              <CTranslateTo
                eng="New Version Available 🚀"
                pt="Nova Versão Disponível 🚀"
              />
            </h1>
            <h2 className="text-slate-500 dark:text-slate-200">
              <CTranslateTo
                eng="A new version of the platform is available"
                pt="Está disponível uma nova versão da plataforma"
              />
            </h2>
            <AuSoftUI.UI.Button
              onClick={() => {
                window.location.reload();
              }}
              variant={"outline"}
              className="w-fit items-center"
            >
              <CTranslateTo eng="Upgrade" pt="Atualizar" />
              <ReactIcons.AiICon.AiFillRocket size={15} />
            </AuSoftUI.UI.Button>
          </div>
        </BaseBox>
      )}
    </>
  );
}
