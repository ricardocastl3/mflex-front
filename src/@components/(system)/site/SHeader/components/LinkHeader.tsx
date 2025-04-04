import CTranslateTo from "@/@components/(translation)/CTranslateTo";
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
}: {
  action: string;
  title_en: string;
  title_pt: string;
  Icon: IconType;
  isScrolled: boolean;
}) {
  const { currentPageByUrl } = useAppProvider();

  return (
    <Link
      href={`/${langByCookies}/${action}`}
      className={`${
        currentPageByUrl == action
          ? "dark:text-yellow-300 text-yellow-500"
          : `dark:hover:text-yellow-300 hover:text-yellow-500  ${
              isScrolled ? "dark:text-white" : "text-white"
            }`
      }  text-[0.9rem] flex items-center gap-2 cursor-pointer font-semibold rounded-full px-4 `}
    >
      <Icon size={18} />
      <CTranslateTo eng={title_en} pt={title_pt} />
    </Link>
  );
}
