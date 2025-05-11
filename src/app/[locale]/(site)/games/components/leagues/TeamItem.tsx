import { IFixture } from "@/http/interfaces/models/IFixtures";
import { ReactIcons } from "@/utils/icons";

import TeamDetails from "./TeamDetails";

export default function TeamItem({ team }: { team: IFixture }) {
  return (
    <div className="flex items-center w-full gap-4 border-b justify-center border-slate-400/50 dark:border-slate-800">
      <div className="grid grid-cols-3 p-6 md:w-[50vw] w-[80vw] rounded-xl dark:text-white font-bold text-md gap-4">
        <TeamDetails
          logo={team.teams.home.logo}
          name={team.teams.home.name}
          score={team.score.fulltime.home}
        />
        <div className="flex items-center justify-center gap-4 ">
          <b>
            <ReactIcons.BiIcon.BiX size={20} />
          </b>
        </div>
        <TeamDetails
          logo={team.teams.away.logo}
          name={team.teams.away.name}
          score={team.score.fulltime.away}
        />
      </div>
    </div>
  );
}
