import { BaseBox } from "@/@components/(box)/BaseBox";
import { AuSoftUI } from "@/@components/(ausoft)";
import { IServiceAffiliate } from "./sections/services";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function CardItem({ service }: { service: IServiceAffiliate }) {
  return (
    <BaseBox className="cursor-pointer justify-between h-full p-4 flex flex-col gap-4 hover:scale-[1.03] transition-all border-l hover:border-l-yellow-500 dark:hover:border-l-yellow-800">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 dark:text-white">
          <service.icon size={30} />
          <h1 className="text-[1.1rem] font-bold">
            <CTranslateTo eng={service.title_en} pt={service.title_pt} />
          </h1>
        </div>
        <div className="text-base dark:text-slate-300">
          <CTranslateTo eng={service.content_en} pt={service.content_pt} />
        </div>
      </div>
      {service.action != "" && (
        <div className="flex justify-center gap-4">
          <Link target="_blank" href={service.action} className="w-full">
            <AuSoftUI.UI.Button
              variant={"primary"}
              size={"md"}
              className="w-full items-center"
            >
              <CTranslateTo eng={service.action_en} pt={service.action_pt} />
              <service.icon size={16} className="mb-0.5" />
            </AuSoftUI.UI.Button>
          </Link>
        </div>
      )}
    </BaseBox>
  );
}
