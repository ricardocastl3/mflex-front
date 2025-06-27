import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";
import { IconType } from "react-icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function TabButton({
  t_en,
  t_pt,
  Icon,
}: {
  Icon: IconType;
  t_pt: string;
  t_en: string;
}) {
  const { selectedFHTab, handleSelectFHTab, handleFetchFHCreatorPost } =
    useFlexHouseProvider();
  const isSelected = selectedFHTab == t_en.toLowerCase();

  return (
    <button
      onClick={() => {
        if (t_en.toLowerCase() == "feed") {
          handleFetchFHCreatorPost(true);
          setTimeout(() => {
            handleFetchFHCreatorPost(false);
          }, 100);
        }
        handleSelectFHTab(t_en.toLowerCase());
      }}
      className={`w-fit flex justify-center dark:text-white items-center p-3 relative transition-all duration-300`}
    >
      <div
        className={`${
          isSelected
            ? "rounded-t-xl scale-105 dark:bg-yellow-800/30 transition-all bg-yellow-600/40 text-yellow-800 dark:text-yellow-500 font-bold"
            : "hover:dark:bg-yellow-800/30 transition-all hover:bg-yellow-600/40"
        } w-[4rem] px-2 py-1 rounded-xl  text-center flex flex-col items-center gap-0.5 text-xs text-nowrap`}
      >
        <Icon size={15} />
        <CTranslateTo eng={t_en} pt={t_pt} />
      </div>
    </button>
  );
}
