import { Dispatch, SetStateAction } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

interface IPolicyMenuItem {
  title_pt: string;
  title_en: string;
  isSelected: boolean;
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
}

export default function PolicyMenuItem({
  isSelected,
  currentSection,
  setCurrentSection,
  title_en,
  title_pt,
}: IPolicyMenuItem) {
  return (
    <div className="flex items-center gap-2">
      <Link
        onClick={() => setCurrentSection(currentSection)}
        href={`#${currentSection}`}
        className={`${
          isSelected ? "text-white bg-yellow-500" : "dark:text-white"
        } rounded-full px-4 py-2 text-nowrap md:text-sm text-base `}
      >
        <CTranslateTo eng={title_en} pt={title_pt} />
      </Link>
    </div>
  );
}
