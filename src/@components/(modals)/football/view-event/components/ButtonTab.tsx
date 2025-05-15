import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function ButtonTab({
  t_en,
  t_pt,
  value,
  setTab,
  Icon,
  tab,
}: {
  t_pt: string;
  t_en: string;
  value: string;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  Icon: IconType;
}) {
  return (
    <button
      onClick={() => setTab(value)}
      className={`${
        value == tab
          ? " bg-white dark:bg-slate-800/70 dark:text-white"
          : " hover:bg-white text-slate-600 dark:text-slate-500 hover:dark:bg-slate-800/30 bg-slate-300 dark:bg-slate-800/30"
      } transition-all flex text-[0.9rem] items-center font-bold mr-[0.13rem] gap-2 md:py-2.5 py-3 px-4 dark:text-white rounded-t-xl`}
    >
      <Icon size={15} />
      <h1 className="text-nowrap">
        <CTranslateTo eng={t_en} pt={t_pt} />
      </h1>
    </button>
  );
}
