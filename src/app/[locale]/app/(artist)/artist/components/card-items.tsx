import { BaseBox } from "@/@components/(box)/BaseBox";
import { IArtistService } from "./services";
import { langByCookies } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";
import { ReactIcons } from "@/utils/icons";

export default function CardAffiliateItem({
  service,
}: {
  service: IArtistService;
}) {
  const { handleOpenModal } = useModal();

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
      className="md:hover:scale-[1.03] scale-100 transition-all p-5"
    >
      <Link href={`${action}`} className="">
        <div className="flex items-center justify-center text-center flex-col gap-2.5">
          <service.Icon size={18} className={`${service.iconColor}`} />
          <div className="flex flex-col gap-1.5 items-center">
            {service.type == "manual" && (
              <h1 className="rounded-full text-xs font-bold text-orange-700 dark:text-orange-400 bg-orange-200 dark:bg-orange-800/40 px-2 py-0.5 flex items-center gap-2">
                <CTranslateTo eng="Manual" pt="Material" />
              </h1>
            )}
            {service.type == "tutorial" && (
              <h1 className="rounded-full text-xs font-bold text-red-700 dark:text-red-400 bg-red-200 dark:bg-red-800/40 px-2 py-0.5 flex items-center gap-2">
                <CTranslateTo eng="Video" pt="Vídeos" />
              </h1>
            )}
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
