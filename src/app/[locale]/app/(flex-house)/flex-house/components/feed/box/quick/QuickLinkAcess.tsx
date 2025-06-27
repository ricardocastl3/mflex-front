import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { langByCookies } from "@/http/axios/api";
import Link from "next/link";
import { IconType } from "react-icons";

export default function QuickLinkAcess({
  Icon,
  t_en,
  t_pt,
  action,
}: {
  t_pt: string;
  t_en: string;
  action: string;
  Icon: IconType;
}) {
  return (
    <Link
      href={`/${langByCookies}/${action}`}
      className="rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800/50 flex items-center gap-2 p-2 text-sm dark:text-white"
    >
      <Icon size={12} />
      <CTranslateTo eng={t_en} pt={t_pt} />
    </Link>
  );
}
