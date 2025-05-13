import { BaseBox } from "@/@components/(box)/BaseBox";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { ILeagues } from "@/http/interfaces/models/football/IFixtures";
import { useAppProvider } from "@/providers/app/AppProvider";

import TeamItem from "./teams/TeamItem";

export default function LeagueItem({ league }: { league: ILeagues }) {
  const [show, setShow] = useState(false);

  const { closeLeagueBox } = useAppProvider();

  useEffect(() => {
    setShow(false);
  }, [closeLeagueBox]);

  return (
    <div className="relative animate-fade-up">
      <BaseBox
        onClick={() => setShow((state) => !state)}
        className={`${
          show ? "rounded-t-xl rounded-b-none" : "rounded-xl"
        } z-10 w-full p-4 flex items-center justify-between cursor-pointer`}
      >
        <div className="flex items-center gap-3">
          <img src={league.logo} alt={league.name} width={20} height={20} />
          <div className="md:text-[1rem] text-[0.85rem]">
            <h1 className="dark:text-white font-bold">
              {league.name}
              <b className="dark:text-slate-00 text-slate-500 font-bold">
                {` • ${league.country}`}
              </b>
            </h1>
          </div>
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
          className="w-full z-0 rounded-b-xl top-[3rem] px-4 pt-4 pb-4 text-base dark:bg-ausoft-slate-900 bg-white/50 text-slate-800 dark:text-slate-400"
        >
          {league.teams.map((team, i) => {
            return <TeamItem key={i} team={team} />;
          })}
        </motion.div>
      )}
    </div>
  );
}
