"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";

import HeroNews from "./components/Hero";
import GameContainer from "./components/container";
import Link from "next/link";

export default function NewsPage() {
  const { handleCloseLeagueBox } = useAppProvider();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex fixed md:bottom-[4rem] bottom-[4.9rem] md:right-[4rem] right-[4rem] z-20 animate-fade-up">
        <Link href="#start">
          <AuSoftUI.UI.Button
            onClick={handleCloseLeagueBox}
            className="rounded-full p-3 animate-pulse  hover:dark:bg-orange-700 hover:bg-orange-600 transition-all duration-300 dark:bg-orange-600 bg-orange-500 "
          >
            <ReactIcons.BiIcon.BiCaretUp size={18} />
          </AuSoftUI.UI.Button>
        </Link>
      </div>
      <HeroNews />
      <GameContainer />
    </div>
  );
}
