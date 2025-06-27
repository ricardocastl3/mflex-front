import { BaseBox } from "@/@components/(box)/BaseBox";
import { ICreatorService } from "./services";
import { langByCookies } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";
import { useAuth } from "@/providers/auth/AuthProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function CardCreatorItem({
  service,
}: {
  service: ICreatorService;
}) {
  const { handleOpenModal } = useModal();
  const { userLogged } = useAuth();

  const action = `${
    service.action.startsWith("modal")
      ? "#"
      : `/${langByCookies}/app/${service.action}`
  }`;

  return (
    <BaseBox
      onClick={() => {
        if (action == "#") {
          handleOpenModal(service.action.split("modal-")[1] as any);
        }
      }}
      className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all p-4 border-l-2 border-l-slate-500 dark:border-l-slate-600"
    >
      <Link
        href={`${
          service.type == "profile"
            ? `/${langByCookies}/app/flex-house/${userLogged?.creator?.username}`
            : action
        }`}
        className=""
      >
        <div className="flex  flex-col gap-2.5">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h1 className="text-base dark:text-white">
                <CTranslateTo eng={service.t_en} pt={service.t_pt} />
              </h1>
              <service.Icon size={18} className={`${service.iconColor}`} />
            </div>
            <h4 className="text-sm dark:text-slate-400 text-slate-600">
              <CTranslateTo eng={service.d_en} pt={service.d_pt} />
            </h4>
          </div>
        </div>
      </Link>
    </BaseBox>
  );
}
