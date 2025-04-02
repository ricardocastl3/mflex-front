import { IconType } from "react-icons";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

interface ILinkMButton {
  title_pt: string;
  title_en: string;
  isSelected: boolean;
  isLink?: boolean;
  Icon: IconType;
  action: string;
}

export default function LinkMButton({
  isSelected,
  title_en,
  title_pt,
  action,
  Icon,
  isLink = true,
}: ILinkMButton) {
  return (
    <Link
      href={`${isLink ? `/${langByCookies}/${action}` : "#"}`}
      className={`${
        isSelected ? "border-yellow-600" : "border-transparent"
      }  border-t-2 flex justify-center dark:text-white items-center p-3`}
    >
      <div
        className={`${
          isSelected
            ? "dark:bg-yellow-900/20 bg-yellow-200/50 text-yellow-800 dark:text-yellow-200 font-bold"
            : ""
        } mx-2 px-2 py-1 rounded-xl  flex flex-col items-center gap-1 text-xs text-nowrap`}
      >
        <Icon size={15} />
        <CTranslateTo pt={title_pt} eng={title_en} />
      </div>
    </Link>
  );
}
