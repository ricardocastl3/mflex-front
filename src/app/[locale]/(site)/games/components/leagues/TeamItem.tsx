import { IFixture } from "@/http/interfaces/models/IFixtures";
import { ReactIcons } from "@/utils/icons";
import { format } from "date-fns";
import { langByCookies } from "@/http/axios/api";
import { enUS, ptBR } from "date-fns/locale";
import { statusColors, statusMap } from "./team";

import TeamDetails from "./TeamDetails";
import DateServices from "@/services/DateServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function TeamItem({ team }: { team: IFixture }) {
  const status = team.fixture.status.short;
  const translation = statusMap[status];
  const color = statusColors[status];

  return (
    <div className="flex cursor-pointer transition-all items-center w-full gap-4 border-b justify-center  rounded-xl border-slate-400/50 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800/80">
      <div className="grid grid-cols-3 p-6 md:w-[50vw] w-[80vw] rounded-xl dark:text-white font-bold text-md gap-4">
        <TeamDetails
          status={team.fixture.status.short}
          logo={team.teams.home.logo}
          name={team.teams.home.name}
          score={team.score.fulltime.home}
        />
        <div className="flex items-center  text-center gap-3.5 flex-col ">
          <b>
            <ReactIcons.BiIcon.BiX size={20} />
          </b>
          <h2 className="text-sm dark:text-white">
            {DateServices.dateWithBars(team.fixture.date)}{" "}
            {` ${langByCookies == "pt" ? "às" : "at"} ${format(
              team.fixture.date,
              "HH:mm",
              {
                locale: langByCookies == "pt" ? ptBR : enUS,
              }
            )}`}
          </h2>
          <h4 className={`text-sm ${color} text-center`}>
            <CTranslateTo eng={translation.en} pt={translation.pt} />
          </h4>
        </div>
        <TeamDetails
          status={team.fixture.status.short}
          logo={team.teams.away.logo}
          name={team.teams.away.name}
          score={team.score.fulltime.away}
        />
      </div>
    </div>
  );
}
