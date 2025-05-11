import { BaseBox } from "@/@components/(box)/BaseBox";
import { motion } from "framer-motion";
import { useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { ILeagues } from "@/http/interfaces/models/IFixtures";

import TeamItem from "./TeamItem";

export default function LeagueItem({ league }: { league: ILeagues }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <BaseBox
        onClick={() => setShow((state) => !state)}
        className={`${
          show ? "rounded-t-xl rounded-b-none" : "rounded-xl"
        } z-10 w-full p-4 flex items-center justify-between cursor-pointer`}
      >
        <div className="flex items-center gap-3">
          <img
            src={league.logo}
            alt={league.leagueName}
            width={20}
            height={20}
          />
          <h1 className="md:text-[1rem] text-base dark:text-white font-bold">
            {league.leagueName}
          </h1>
        </div>

        <button className="dark:text-white">
          <ReactIcons.PiIcon.PiCaretDoubleDown
            size={15}
            className={`${show ? "rotate-180" : ""} transition-all`}
          />
        </button>
      </BaseBox>
      {show && (
        <motion.div
          initial={{ translateY: "-0.5rem" }}
          animate={{ translateY: "0rem" }}
          className="w-full z-0 rounded-b-xl top-[3rem] px-4 pt-4 pb-4 text-base dark:bg-ausoft-slate-900 bg-slate-300/50 text-slate-800 dark:text-slate-400"
        >
          {league.teams.map((team, i) => {
            return <TeamItem key={i} team={team} />;
          })}
        </motion.div>
      )}
    </div>
  );
}
