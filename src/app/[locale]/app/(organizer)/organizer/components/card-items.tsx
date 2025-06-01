import { BaseBox } from "@/@components/(box)/BaseBox";
import { IServiceOrganizer } from "./services";
import { langByCookies } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function CardItem({ service }: { service: IServiceOrganizer }) {
  const { handleOpenModal } = useModal();

  const action = `${
    service.action.startsWith("modal-validate")
      ? "#"
      : `/${langByCookies}/app/${service.action}`
  }`;

  return (
    <BaseBox
      onClick={() => {
        if (action == "#") {
          handleOpenModal("validate-ticket");
        }
      }}
      className="md:hover:scale-[1.03] scale-100 transition-all p-5"
    >
      <Link href={`${action}`} className="">
        <div className="flex items-center justify-center text-center flex-col gap-2.5">
          <service.Icon size={20} className={`${service.iconColor}`} />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-base dark:text-white">
              <CTranslateTo eng={service.t_en} pt={service.t_pt} />
            </h1>
            <h4 className="text-sm dark:text-slate-400 text-slate-600">
              <CTranslateTo eng={service.d_en} pt={service.d_pt} />
            </h4>
          </div>
        </div>
      </Link>
    </BaseBox>
  );
}
