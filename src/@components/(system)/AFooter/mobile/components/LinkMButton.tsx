import { IconType } from "react-icons";
import { useAppProvider } from "@/providers/app/AppProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

interface ILinkMButton {
  title_pt: string;
  title_en: string;
  isSelected: boolean;
  Icon: IconType;
  action: string;
  action_blank?: boolean;
}

export default function LinkMButton({
  isSelected,
  title_en,
  title_pt,
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
        isSelected ? "border-blue-600" : "border-transparent"
      }  border-t-2 flex justify-center dark:text-white items-center p-3`}
    >
      <div
        className={`${
          isSelected
            ? "dark:bg-blue-900/20 bg-blue-200/50 text-blue-800 dark:text-blue-200 font-bold"
            : ""
        } mx-2 px-2 py-1 rounded-xl w-[40vw] text-center  flex flex-col items-center gap-1 text-xs text-nowrap`}
      >
        <Icon size={15} />
        <CTranslateTo pt={title_pt} eng={title_en} />
      </div>
    </Link>
  );
}
