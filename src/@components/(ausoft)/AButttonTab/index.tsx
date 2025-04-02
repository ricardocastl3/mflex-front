import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

interface IAButtonTab {
  tab: string;
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  title_pt: string;
  title_en: string;
  Icon: IconType;
}

export default function AButtonTab({
  tab,
  setCurrentTab,
  currentTab,
  title_en,
  title_pt,
  Icon,
}: IAButtonTab) {
  return (
    <button
      onClick={() => setCurrentTab(tab)}
      className={`${
        tab == currentTab
          ? "text-violet-600 dark:text-violet-400 rounded-t-lg  font-bold bg-violet-200 dark:bg-violet-900/10 border-violet-600 dark:border-violet-800"
          : "border-transparent dark:text-slate-100 hover:bg-violet-200 hover:dark:bg-violet-800/20 rounded-lg"
      } pb-2 border-b-2 text-sm flex items-center gap-2 text-center px-4  pt-3 text-nowrap`}
    >
      <Icon size={15} className="mb-1.5"/>
      <CTranslateTo eng={title_en} pt={title_pt} />
    </button>
  );
}
