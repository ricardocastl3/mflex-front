import { BaseBox } from "@/@components/(box)/BaseBox";
import { IconType } from "react-icons";

import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function CardItem({
  content_en,
  content_pt,
  title_en,
  title_pt,
  Icon,
  action,
  ActionIcon,
  action_en,
  action_pt,
}: {
  title_pt: string;
  title_en: string;
  content_en: string;
  content_pt: string;
  action_pt: string;
  action_en: string;
  ActionIcon: IconType;
  Icon: IconType;
  action: string;
}) {
  return (
    <BaseBox className="cursor-pointer justify-between h-full p-4 flex flex-col gap-4 hover:scale-[1.03] transition-all border-l hover:border-l-yellow-500 dark:hover:border-l-yellow-800">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 dark:text-white">
          <Icon size={30} />
          <h1 className="text-xl font-bold">
            <CTranslateTo eng={title_en} pt={title_pt} />
          </h1>
        </div>
        <div className="text-base dark:text-slate-300">
          <CTranslateTo eng={content_en} pt={content_pt} />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Link target="_blank" href={action} className="w-full">
          <AuSoftUI.UI.Button
            variant={"primary"}
            size={"md"}
            className="w-full items-center"
          >
            <CTranslateTo eng={action_en} pt={action_pt} />
            <ActionIcon size={18} />
          </AuSoftUI.UI.Button>
        </Link>
      </div>
    </BaseBox>
  );
}
