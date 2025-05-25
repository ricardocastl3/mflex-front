import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import GAEventsServices from "@/services/GAEventsServices";
import Link from "next/link";

import { langByCookies } from "@/http/axios/api";
import { IconType } from "react-icons";
import { useAppProvider } from "@/providers/app/AppProvider";

export default function LinkHeader({
  Icon,
  action,
  title_en,
  title_pt,
  isScrolled,
  isSelected,
  isButton,
}: {
  action: string;
  title_en: string;
  title_pt: string;
  Icon: IconType;
  isButton?: boolean;
  isScrolled: boolean;
  isSelected: boolean;
}) {
  const { currentPageByUrl } = useAppProvider();

  return (
    <div
      onClick={() => {
        LocalStorageServices.resetAllKeys(),
          GAEventsServices.send({
            event_name: `desktop-cl-header-${action}`,
            metadata: "Click Button",
          });
      }}
    >
      {!isButton && (
        <Link
          href={`/${langByCookies}/${action}`}
          className={`${
            isSelected
              ? "dark:text-yellow-300 text-yellow-500"
              : `dark:hover:text-yellow-300 hover:text-yellow-500  ${
                  isScrolled ? "dark:text-white" : "text-white"
                }`
          }  text-[0.9rem] flex items-center gap-2 cursor-pointer font-semibold rounded-full px-4 `}
        >
          <Icon size={18} />
          <CTranslateTo eng={title_en} pt={title_pt} />
        </Link>
      )}
      {isButton && (
        <button
          className={`${
            isSelected
              ? "dark:text-yellow-300 text-yellow-500"
              : `dark:hover:text-yellow-300 hover:text-yellow-500  ${
                  isScrolled ? "dark:text-white" : "text-white"
                }`
          } appearance-none text-[0.9rem] flex items-center gap-2 cursor-pointer font-semibold rounded-full px-4 `}
        >
          <Icon size={18} />
          <CTranslateTo eng={title_en} pt={title_pt} />
        </button>
      )}
    </div>
  );
}
