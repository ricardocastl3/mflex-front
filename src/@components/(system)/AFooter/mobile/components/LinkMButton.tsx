import { IconType } from "react-icons";
import { useAppProvider } from "@/providers/app/AppProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

interface ILinkMButton {
  title_pt: string;
  title_en: string;
  isSelected: boolean;
  Icon: IconType;
  bar?: boolean;
  action: string;
  action_blank?: boolean;
}

export default function LinkMButton({
  isSelected,
  title_en,
  title_pt,
  bar,
  action,
  Icon,
  action_blank = false,
}: ILinkMButton) {
  const { segmentedLayout, currentPageByUrl } = useAppProvider();
  return (
    <Link
      href={`${
        !action_blank
          ? `/${segmentedLayout}/${
              currentPageByUrl == "app" ? `app/${action}` : action
            }`
          : action
      }`}
      className={`${
        isSelected ? "border-yellow-600" : "border-transparent"
      }  border-t-2 flex justify-center dark:text-white items-center p-3 relative transition-all duration-300`}
    >
      <div
        className={`${
          isSelected
            ? "rounded-t-xl scale-105 dark:bg-yellow-800/30 transition-all bg-yellow-600/40 text-yellow-800 dark:text-yellow-500 font-bold"
            : ""
        } mx-2 px-2 py-1 rounded-xl w-[40vw] text-center  flex flex-col items-center gap-1 text-xs text-nowrap`}
      >
        <Icon size={15} />
        <CTranslateTo pt={title_pt} eng={title_en} />
      </div>
    </Link>
  );
}
