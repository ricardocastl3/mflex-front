import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { Dispatch, SetStateAction } from "react";

export default function ButtonTab({
  t_en,
  t_pt,
  value,
  setTab,
  tab,
}: {
  t_pt: string;
  t_en: string;
  value: string;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
}) {
  return (
    <button
      onClick={() => setTab(value)}
      className={`${
        value == tab
          ? " bg-white dark:bg-slate-800/30"
          : " hover:bg-white hover:dark:bg-slate-800/30"
      } p-3 dark:text-white font-bold rounded-t-xl`}
    >
      <CTranslateTo eng={t_en} pt={t_pt} />
    </button>
  );
}
