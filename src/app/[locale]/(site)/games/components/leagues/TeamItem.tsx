import { IFixture } from "@/http/interfaces/models/IFixtures";
import { ReactIcons } from "@/utils/icons";
import { format } from "date-fns";
import { langByCookies } from "@/http/axios/api";
import { enUS, ptBR } from "date-fns/locale";

import TeamDetails from "./TeamDetails";
import DateServices from "@/services/DateServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function TeamItem({ team }: { team: IFixture }) {
  const statusMap: any = {
    NS: { pt: "Não Iniciado", eng: "Not Started" },
    "1H": { pt: "Primeiro Tempo", eng: "First Half" },
    HT: { pt: "Intervalo", eng: "Half Time" },
    "2H": { pt: "Segundo Tempo", eng: "Second Half" },
    ET: { pt: "Prorrogação", eng: "Extra Time" },
    BT: { pt: "Intervalo da Prorrogação", eng: "Break Time" },
    P: { pt: "Disputa de Pênaltis", eng: "Penalty In Progress" },
    FT: { pt: "Finalizado", eng: "Full Time" },
    AET: { pt: "Finalizado após Prorrogação", eng: "After Extra Time" },
    PEN: { pt: "Finalizado nos Pênaltis", eng: "Full Time After Penalties" },
    SUSP: { pt: "Suspenso", eng: "Suspended" },
    INT: { pt: "Interrompido", eng: "Interrupted" },
    PST: { pt: "Adiado", eng: "Postponed" },
    CANC: { pt: "Cancelado", eng: "Cancelled" },
    ABD: { pt: "Abandonado", eng: "Abandoned" },
    TBD: { pt: "A Ser Determinado", eng: "To Be Determined" },
    TBA: { pt: "A Ser Anunciado", eng: "To Be Announced" },
    AWARDED: { pt: "Vitória por Decisão Administrativa", eng: "Awarded" },
    DELAYED: { pt: "Atrasado", eng: "Delayed" },
    WO: { pt: "Vitória por W.O.", eng: "Walk Over" },
    AU: { pt: "Aguardando Atualizações", eng: "Awaiting Updates" },
    DELETED: { pt: "Excluído", eng: "Deleted" },
  };

  const status = team.fixture.status.short;
  const translation = statusMap[status];

  const statusColors: any = {
    NS: "dark:text-gray-400 text-gray-500",
    "1H": "text-blue-500 animate-pulse",
    HT: "text-yellow-500",
    "2H": "text-blue-700 animate-pulse",
    ET: "text-purple-500",
    BT: "text-orange-500",
    P: "text-orange-700",
    FT: "text-green-500",
    AET: "text-green-600",
    PEN: "text-teal-500",
    SUSP: "text-red-500",
    INT: "text-orange-800",
    PST: "text-gray-400",
    CANC: "text-red-700",
    ABD: "text-gray-600",
    TBD: "text-gray-300",
    TBA: "text-gray-300",
    AWARDED: "text-green-600",
    DELAYED: "text-orange-500",
    WO: "text-teal-400",
    AU: "text-gray-600",
    DELETED: "text-black",
  };

  const color = statusColors[status];

  return (
    <div className="flex cursor-pointer transition-all items-center w-full gap-4 border-b justify-center  rounded-xl border-slate-400/50 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800/80">
      <div className="grid grid-cols-3 p-6 md:w-[50vw] w-[80vw] rounded-xl dark:text-white font-bold text-md gap-4">
        <TeamDetails
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
          logo={team.teams.away.logo}
          name={team.teams.away.name}
          score={team.score.fulltime.away}
        />
      </div>
    </div>
  );
}
