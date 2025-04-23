import { AuSoftUI } from "@/@components/(ausoft)";
import { langByCookies } from "@/http/axios/api";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function UserSecurityBox() {
  return (
    <BaseBox className="md:px-5 px-4 md:py-4 py-4">
      <div className="flex items-start gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 dark:text-slate-100">
            <h3 className="text-md font-bold">
              <CTranslateTo pt="Segurança" eng="Security" />
            </h3>
            <ReactIcons.AiICon.AiFillLock size={15} />
          </div>
          <h3 className="text-normal text-slate-500 dark:text-slate-400 md:w-[50vw] w-full">
            <CTranslateTo
              pt="Caso deseja alterar a sua senha, realize uma solicitação clicando no botão abaixo"
              eng="If you wish to change your password, please make a request by clicking the button below."
            />
          </h3>
        </div>
      </div>

      <div className="mt-4 border-t pt-2 border-slate-300/80 dark:border-slate-800">
        <Link href={`/${langByCookies}/forgot-pwd`}>
          <AuSoftUI.UI.Button
            type="button"
            variant={"primary"}
            size={"md"}
            className="md:w-fit w-full items-center"
          >
            <CTranslateTo
              eng="Request new password"
              pt="Solicitar nova senha"
            />
            <ReactIcons.AiICon.AiOutlineForm size={14} />
          </AuSoftUI.UI.Button>
        </Link>
      </div>
    </BaseBox>
  );
}
